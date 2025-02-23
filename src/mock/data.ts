import { Account, User, AIAgent, Game } from './types';

export const initialData = {
  accounts: [
    {
      addresse: "0x123...abc",
      signature: "sig123"
    }
  ] as Account[],
  
  users: [
    {
      _id: "user1",
      friends: [],
      wallets: [],
      avarta: "https://example.com/avatar1.jpg",
      name: "User 1",
      createdAt: new Date()
    }
  ] as User[],

  aiAgents: [
    {
      id: "agent1",
      name: "AI Agent A",
      promptContext: "You are a positive AI that supports cryptocurrency"
    },
    {
      id: "agent2",
      name: "AI Agent B",
      promptContext: "You are a skeptical AI that questions cryptocurrency"
    }
  ] as AIAgent[],

  games: [
    {
      id: "1",
      name: "BNB Price Up and Down",
      topic: "BNB 가격이 오를 것인가 내릴 것인가?",
      aiAgents: [
        {
          id: "agent1",
          name: "Bull Agent",
          promptContext: "You are a positive AI that supports cryptocurrency"
        },
        {
          id: "agent2",
          name: "Bear Agent",
          promptContext: "You are a skeptical AI that questions cryptocurrency"
        }
      ],
      state: "PLAYING" as const,
      bettingTokenDenom: "APT",
      defaultBettingAmount: 100,
      createdAt: new Date().toISOString(),
      userAddresses: [],
      limit: 100
    },
    {
      id: "2",
      name: "Bitcoin Future",
      topic: "비트코인은 디지털 골드가 될 수 있는가?",
      aiAgents: [
        {
          id: "agent3",
          name: "Digital Gold Believer",
          promptContext: "You believe in Bitcoin as digital gold"
        },
        {
          id: "agent4",
          name: "Traditional Finance Defender",
          promptContext: "You defend traditional financial systems"
        }
      ],
      state: "PREVIEW",
      bettingTokenDenom: "APT",
      defaultBettingAmount: 50,
      createdAt: new Date().toISOString(),
      userAddresses: [],
      limit: 50
    }
  ] as Game[]
}; 