import { initialData } from './data';
import { Account, Wallet, User, AIAgent, Game, Betting, ChatRoom, Message, GameComment } from './types';

class MockDB {
  private accounts: Map<string, Account>;
  private wallets: Map<string, Wallet>;
  private users: Map<string, User>;
  private aiAgents: Map<string, AIAgent>;
  private games: Map<string, Game>;
  private bettings: Map<string, Betting>;
  private chatRooms: Map<string, ChatRoom>;
  private messages: Map<string, Message>;
  private comments: Map<string, GameComment[]>;

  constructor() {
    this.accounts = new Map();
    this.wallets = new Map();
    this.users = new Map();
    this.aiAgents = new Map();
    this.games = new Map();
    this.bettings = new Map();
    this.chatRooms = new Map();
    this.messages = new Map();
    this.comments = new Map();

    this.initializeData();
  }

  private initializeData() {
    initialData.accounts.forEach(account => {
      this.accounts.set(account.addresse, account);
    });

    initialData.users.forEach(user => {
      this.users.set(user._id, user);
    });

    initialData.aiAgents.forEach(agent => {
      this.aiAgents.set(agent.id, agent);
    });

    initialData.games.forEach(game => {
      this.games.set(game.id, {
        id: game.id,
        name: game.name,
        topic: game.topic,
        aiAgents: game.aiAgents,
        state: game.state,
        bettingTokenDenom: game.bettingTokenDenom,
        defaultBettingAmount: game.defaultBettingAmount,
        createdAt: game.createdAt,
        userAddresses: game.userAddresses,
        limit: game.limit
      });
      this.comments.set(game.id, []);
    });
  }

  // Getter 메서드들
  getGameById(id: string): Game | undefined {
    return this.games.get(id);
  }

  getAllGames(): Game[] {
    return Array.from(this.games.values());
  }

  getGameComments(gameId: string): GameComment[] {
    return this.comments.get(gameId) || [];
  }

  getUserByAddress(address: string): User | undefined {
    return Array.from(this.users.values()).find(
      user => user.wallets.some(wallet => wallet.account.addresse === address)
    );
  }

  // Setter 메서드들
  createGame(game: Omit<Game, '_id'>): Game {
    const _id = Date.now().toString();
    const newGame = { ...game, _id };
    this.games.set(_id, newGame);
    this.comments.set(_id, []);
    return newGame;
  }

  createUser(user: Omit<User, '_id'>): User {
    const _id = Date.now().toString();
    const newUser = { ...user, _id };
    this.users.set(_id, newUser);
    return newUser;
  }
}

// 싱글톤 인스턴스 export
export const mockDB = new MockDB(); 