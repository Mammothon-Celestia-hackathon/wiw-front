export interface Account {
  addresse: string;
  signature: string;
}

export interface Wallet {
  account: Account;
  walletName: string;
}

export interface User {
  _id: string;
  friends: User[];
  wallets: Wallet[];
  avarta: string;
  name: string;
  createdAt: Date;
}

export interface AIAgent {
  id: string;
  name: string;
  promptContext: string;
}

export interface Game {
  id: string;
  name: string;
  topic: string;
  aiAgents: AIAgent[];
  state: 'PLAYING' | 'PREVIEW' | 'DONE';
  bettingTokenDenom: string;
  defaultBettingAmount: number;
  createdAt: string;
  userAddresses: string[];
  limit: number;
}

export interface Betting {
  _id: string;
  user: User;
  game: Game;
  bettingQuantity: number;
  bettingToken: string;
  predictionWinner: AIAgent;
  result: 'WIN' | 'LOSE' | 'TBD';
}

export interface ChatRoom {
  _id: string;
  name: string;
  members: User[];
  owner: User;
  game: Game;
}

export interface Message {
  _id: string;
  chatRoom: string;
  sender: User;
  content: string;
  messageType: string;
  readBy: User[];
}

export interface GameComment {
  id: string;
  address: string;
  message: string;
  timestamp: string;
  isAgentA: boolean;
}

export interface GameMessage {
  id: string;
  content: string;
  messageType: string;
  sender: string;
  createdAt: string;
}

export interface GameDetail {
  id: string;
  name: string;
  topic: string;
  ownerUserAddress: string;
  messages: GameMessage[];
  userAddresses: string[];
  bettingTokenDenom: string;
  defaultBettingAmount: number;
  limit: number;
  createdAt: string;
  updatedAt: string;
} 