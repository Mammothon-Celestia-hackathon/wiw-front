/* eslint-disable */
import { TypedDocumentNode as DocumentNode } from '@graphql-typed-document-node/core';
export type Maybe<T> = T | null;
export type InputMaybe<T> = Maybe<T>;
export type Exact<T extends { [key: string]: unknown }> = { [K in keyof T]: T[K] };
export type MakeOptional<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]?: Maybe<T[SubKey]> };
export type MakeMaybe<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]: Maybe<T[SubKey]> };
export type MakeEmpty<T extends { [key: string]: unknown }, K extends keyof T> = { [_ in K]?: never };
export type Incremental<T> = T | { [P in keyof T]?: P extends ' $fragmentName' | '__typename' ? T[P] : never };
/** All built-in and custom scalars, mapped to their actual values */
export type Scalars = {
  ID: { input: string; output: string; }
  String: { input: string; output: string; }
  Boolean: { input: boolean; output: boolean; }
  Int: { input: number; output: number; }
  Float: { input: number; output: number; }
  /** A date-time string at UTC, such as 2019-12-03T09:54:33Z, compliant with the date-time format. */
  DateTime: { input: any; output: any; }
};

/** Betting */
export type AiAgent = {
  __typename?: 'AiAgent';
  address: Scalars['String']['output'];
  context: Scalars['String']['output'];
  createdAt?: Maybe<Scalars['DateTime']['output']>;
  id: Scalars['ID']['output'];
  name: Scalars['String']['output'];
  updatedAt?: Maybe<Scalars['DateTime']['output']>;
};

/** Betting */
export type Betting = {
  __typename?: 'Betting';
  bettingAmount: Scalars['Float']['output'];
  bettingTokenDenom: Scalars['String']['output'];
  createdAt?: Maybe<Scalars['DateTime']['output']>;
  id: Scalars['ID']['output'];
  ownerAddress: Scalars['String']['output'];
  predictionWinnerAiAgent: AiAgent;
  predictionWinnerAiAgentId: Scalars['String']['output'];
  result: Scalars['String']['output'];
  updatedAt?: Maybe<Scalars['DateTime']['output']>;
};

export type CreateAiAgentInput = {
  address: Scalars['String']['input'];
  context: Scalars['String']['input'];
  name: Scalars['String']['input'];
};

export type CreateBettingInput = {
  bettingAmount: Scalars['Float']['input'];
  ownerAddress: Scalars['String']['input'];
  predictionWinnerAiAgentId: Scalars['String']['input'];
};

export type CreateGameInput = {
  defaultBettingAmount: Scalars['Float']['input'];
  firstAiAgentId: Scalars['String']['input'];
  limit: Scalars['Int']['input'];
  name: Scalars['String']['input'];
  ownerAddress: Scalars['String']['input'];
  secondAiAgentId: Scalars['String']['input'];
  topic: Scalars['String']['input'];
};

export type CreateUserInput = {
  address: Scalars['String']['input'];
};

/** Game */
export type Game = {
  __typename?: 'Game';
  aiAgentIds?: Maybe<Array<Scalars['String']['output']>>;
  aiAgents?: Maybe<Array<AiAgent>>;
  bettingIds?: Maybe<Array<Scalars['String']['output']>>;
  bettingTokenDenom: Scalars['String']['output'];
  bettings?: Maybe<Array<Betting>>;
  createdAt?: Maybe<Scalars['DateTime']['output']>;
  defaultBettingAmount: Scalars['Float']['output'];
  id: Scalars['ID']['output'];
  limit: Scalars['Int']['output'];
  messages: Array<Message>;
  name: Scalars['String']['output'];
  owner?: Maybe<User>;
  ownerAddress: Scalars['String']['output'];
  topic: Scalars['String']['output'];
  updatedAt?: Maybe<Scalars['DateTime']['output']>;
  userAddresses: Array<Scalars['String']['output']>;
  users?: Maybe<Array<User>>;
  winnerAiAgentId?: Maybe<Scalars['String']['output']>;
};

/** GameEvent */
export type GameEvent = {
  __typename?: 'GameEvent';
  event?: Maybe<Scalars['String']['output']>;
  game?: Maybe<Game>;
};

/** Message */
export type Message = {
  __typename?: 'Message';
  content: Scalars['String']['output'];
  createdAt?: Maybe<Scalars['DateTime']['output']>;
  gameId: Scalars['String']['output'];
  id: Scalars['ID']['output'];
  messageType: Scalars['String']['output'];
  sender?: Maybe<User>;
  senderAddress: Scalars['String']['output'];
  updatedAt?: Maybe<Scalars['DateTime']['output']>;
};

export type Mutation = {
  __typename?: 'Mutation';
  broadcastEvent: Scalars['Boolean']['output'];
  createAiAgent: AiAgent;
  createBetting: Betting;
  createGame: Game;
  createUser: User;
  deleteAllBettingsInGame: Scalars['Boolean']['output'];
  deleteAllMessagesInGame: Scalars['Boolean']['output'];
  joinGame: Game;
  sendMessage: Message;
  updateAiAgent: AiAgent;
  updateWinnerAiAgent: Scalars['Boolean']['output'];
};


export type MutationBroadcastEventArgs = {
  event: Scalars['String']['input'];
  gameId: Scalars['String']['input'];
};


export type MutationCreateAiAgentArgs = {
  createAiAgentInput: CreateAiAgentInput;
};


export type MutationCreateBettingArgs = {
  createBettingInput: CreateBettingInput;
  gameId: Scalars['String']['input'];
};


export type MutationCreateGameArgs = {
  createGameInput: CreateGameInput;
};


export type MutationCreateUserArgs = {
  createUserInput: CreateUserInput;
};


export type MutationDeleteAllBettingsInGameArgs = {
  gameId: Scalars['String']['input'];
};


export type MutationDeleteAllMessagesInGameArgs = {
  gameId: Scalars['String']['input'];
};


export type MutationJoinGameArgs = {
  gameId: Scalars['String']['input'];
  userAddress: Scalars['String']['input'];
};


export type MutationSendMessageArgs = {
  content: Scalars['String']['input'];
  gameId: Scalars['String']['input'];
  messageType: Scalars['String']['input'];
  senderAddress: Scalars['String']['input'];
};


export type MutationUpdateAiAgentArgs = {
  aiAgentId: Scalars['String']['input'];
  updateAiAgentInput: UpdateAiAgentInput;
};


export type MutationUpdateWinnerAiAgentArgs = {
  aiAgentId: Scalars['String']['input'];
  gameId: Scalars['String']['input'];
};

export type Query = {
  __typename?: 'Query';
  findUserByAddress?: Maybe<User>;
  getAllAiAgent: Array<AiAgent>;
  getGameById: Game;
  getGamesByOwnerAddress: Array<Game>;
  getJoinedGames: Array<Game>;
  getMessagesByGame: Array<Message>;
  isJoinedGame: Scalars['Boolean']['output'];
};


export type QueryFindUserByAddressArgs = {
  address: Scalars['String']['input'];
};


export type QueryGetGameByIdArgs = {
  id: Scalars['String']['input'];
};


export type QueryGetGamesByOwnerAddressArgs = {
  ownerAddress: Scalars['String']['input'];
};


export type QueryGetJoinedGamesArgs = {
  userAddress: Scalars['String']['input'];
};


export type QueryGetMessagesByGameArgs = {
  gameId: Scalars['String']['input'];
  userAddress: Scalars['String']['input'];
};


export type QueryIsJoinedGameArgs = {
  gameId: Scalars['String']['input'];
  userAddress: Scalars['String']['input'];
};

export type Subscription = {
  __typename?: 'Subscription';
  newMessage: Message;
  newStatus: GameEvent;
};


export type SubscriptionNewMessageArgs = {
  gameId: Scalars['String']['input'];
};


export type SubscriptionNewStatusArgs = {
  gameId: Scalars['String']['input'];
};

export type UpdateAiAgentInput = {
  address?: InputMaybe<Scalars['String']['input']>;
  context?: InputMaybe<Scalars['String']['input']>;
  name?: InputMaybe<Scalars['String']['input']>;
};

/** User */
export type User = {
  __typename?: 'User';
  address: Scalars['String']['output'];
  avatar?: Maybe<Scalars['String']['output']>;
  createdAt?: Maybe<Scalars['DateTime']['output']>;
  id: Scalars['ID']['output'];
  name?: Maybe<Scalars['String']['output']>;
  signature?: Maybe<Scalars['String']['output']>;
  updatedAt?: Maybe<Scalars['DateTime']['output']>;
};

export type CreateUserMutationVariables = Exact<{
  address: Scalars['String']['input'];
}>;


export type CreateUserMutation = { __typename?: 'Mutation', createUser: { __typename?: 'User', id: string, name?: string | null, address: string, signature?: string | null, avatar?: string | null, createdAt?: any | null, updatedAt?: any | null } };

export type CreateGameMutationVariables = Exact<{
  limit: Scalars['Int']['input'];
  name: Scalars['String']['input'];
  defaultBettingAmount: Scalars['Float']['input'];
  topic: Scalars['String']['input'];
  ownerUserAddress: Scalars['String']['input'];
  firstAiAgentId: Scalars['String']['input'];
  secondAiAgentId: Scalars['String']['input'];
}>;


export type CreateGameMutation = { __typename?: 'Mutation', createGame: { __typename?: 'Game', id: string, name: string, limit: number, defaultBettingAmount: number, bettingTokenDenom: string, winnerAiAgentId?: string | null, topic: string, createdAt?: any | null, updatedAt?: any | null, owner?: { __typename?: 'User', id: string, address: string, avatar?: string | null } | null, users?: Array<{ __typename?: 'User', id: string, address: string, avatar?: string | null }> | null, bettings?: Array<{ __typename?: 'Betting', bettingAmount: number, bettingTokenDenom: string, ownerAddress: string, result: string, predictionWinnerAiAgentId: string, createdAt?: any | null, updatedAt?: any | null }> | null, aiAgents?: Array<{ __typename?: 'AiAgent', id: string, name: string, address: string, context: string, createdAt?: any | null, updatedAt?: any | null }> | null } };

export type SendMessageMutationVariables = Exact<{
  gameId: Scalars['String']['input'];
  senderAddress: Scalars['String']['input'];
  content: Scalars['String']['input'];
  messageType: Scalars['String']['input'];
}>;


export type SendMessageMutation = { __typename?: 'Mutation', sendMessage: { __typename?: 'Message', id: string, content: string, messageType: string, createdAt?: any | null, updatedAt?: any | null, sender?: { __typename?: 'User', id: string, address: string, avatar?: string | null } | null } };

export type JoinGameMutationVariables = Exact<{
  gameId: Scalars['String']['input'];
  userAddress: Scalars['String']['input'];
}>;


export type JoinGameMutation = { __typename?: 'Mutation', joinGame: { __typename?: 'Game', id: string, name: string, limit: number, defaultBettingAmount: number, bettingTokenDenom: string, winnerAiAgentId?: string | null, topic: string, createdAt?: any | null, updatedAt?: any | null, owner?: { __typename?: 'User', id: string, address: string, avatar?: string | null } | null, users?: Array<{ __typename?: 'User', id: string, address: string, avatar?: string | null }> | null, bettings?: Array<{ __typename?: 'Betting', bettingAmount: number, bettingTokenDenom: string, ownerAddress: string, result: string, predictionWinnerAiAgentId: string, createdAt?: any | null, updatedAt?: any | null }> | null, aiAgents?: Array<{ __typename?: 'AiAgent', id: string, name: string, address: string, context: string, createdAt?: any | null, updatedAt?: any | null }> | null } };

export type UpdateAiAgentMutationVariables = Exact<{
  aiAgentId: Scalars['String']['input'];
  updateAiAgentInput: UpdateAiAgentInput;
}>;


export type UpdateAiAgentMutation = { __typename?: 'Mutation', updateAiAgent: { __typename?: 'AiAgent', id: string, name: string, context: string, address: string } };

export type CreateAiAgentMutationVariables = Exact<{
  createAiAgentInput: CreateAiAgentInput;
}>;


export type CreateAiAgentMutation = { __typename?: 'Mutation', createAiAgent: { __typename?: 'AiAgent', id: string, name: string, context: string, address: string } };

export type BroadcastEventMutationVariables = Exact<{
  gameId: Scalars['String']['input'];
  event: Scalars['String']['input'];
}>;


export type BroadcastEventMutation = { __typename?: 'Mutation', broadcastEvent: boolean };

export type CreateBettingMutationVariables = Exact<{
  gameId: Scalars['String']['input'];
  createBettingInput: CreateBettingInput;
}>;


export type CreateBettingMutation = { __typename?: 'Mutation', createBetting: { __typename?: 'Betting', bettingAmount: number, bettingTokenDenom: string, ownerAddress: string, result: string, predictionWinnerAiAgentId: string, createdAt?: any | null, updatedAt?: any | null } };

export type DeleteAllMessagesInGameMutationVariables = Exact<{
  gameId: Scalars['String']['input'];
}>;


export type DeleteAllMessagesInGameMutation = { __typename?: 'Mutation', deleteAllMessagesInGame: boolean };

export type DeleteAllBettingsInGameMutationVariables = Exact<{
  gameId: Scalars['String']['input'];
}>;


export type DeleteAllBettingsInGameMutation = { __typename?: 'Mutation', deleteAllBettingsInGame: boolean };

export type UpdateWinnerAiAgentMutationVariables = Exact<{
  gameId: Scalars['String']['input'];
  aiAgentId: Scalars['String']['input'];
}>;


export type UpdateWinnerAiAgentMutation = { __typename?: 'Mutation', updateWinnerAiAgent: boolean };

export type GetGamesByOwnerAddressQueryVariables = Exact<{
  address: Scalars['String']['input'];
}>;


export type GetGamesByOwnerAddressQuery = { __typename?: 'Query', getGamesByOwnerAddress: Array<{ __typename?: 'Game', id: string, name: string, limit: number, defaultBettingAmount: number, bettingTokenDenom: string, winnerAiAgentId?: string | null, topic: string, createdAt?: any | null, updatedAt?: any | null, owner?: { __typename?: 'User', id: string, address: string, avatar?: string | null } | null, users?: Array<{ __typename?: 'User', id: string, address: string, avatar?: string | null }> | null, bettings?: Array<{ __typename?: 'Betting', bettingAmount: number, bettingTokenDenom: string, ownerAddress: string, result: string, predictionWinnerAiAgentId: string, createdAt?: any | null, updatedAt?: any | null }> | null, aiAgents?: Array<{ __typename?: 'AiAgent', id: string, name: string, address: string, context: string, createdAt?: any | null, updatedAt?: any | null }> | null }> };

export type GetMessagesByGameQueryVariables = Exact<{
  gameId: Scalars['String']['input'];
  userAddress: Scalars['String']['input'];
}>;


export type GetMessagesByGameQuery = { __typename?: 'Query', getMessagesByGame: Array<{ __typename?: 'Message', id: string, senderAddress: string, content: string, messageType: string, createdAt?: any | null, updatedAt?: any | null, gameId: string, sender?: { __typename?: 'User', id: string, address: string, avatar?: string | null } | null }> };

export type GetJoinedGamesQueryVariables = Exact<{
  userAddress: Scalars['String']['input'];
}>;


export type GetJoinedGamesQuery = { __typename?: 'Query', getJoinedGames: Array<{ __typename?: 'Game', id: string, name: string, limit: number, defaultBettingAmount: number, bettingTokenDenom: string, winnerAiAgentId?: string | null, topic: string, createdAt?: any | null, updatedAt?: any | null, owner?: { __typename?: 'User', id: string, address: string, avatar?: string | null } | null, users?: Array<{ __typename?: 'User', id: string, address: string, avatar?: string | null }> | null, bettings?: Array<{ __typename?: 'Betting', bettingAmount: number, bettingTokenDenom: string, ownerAddress: string, result: string, predictionWinnerAiAgentId: string, createdAt?: any | null, updatedAt?: any | null }> | null, aiAgents?: Array<{ __typename?: 'AiAgent', id: string, name: string, address: string, context: string, createdAt?: any | null, updatedAt?: any | null }> | null }> };

export type IsJoinedGameQueryVariables = Exact<{
  gameId: Scalars['String']['input'];
  userAddress: Scalars['String']['input'];
}>;


export type IsJoinedGameQuery = { __typename?: 'Query', isJoinedGame: boolean };

export type GetAllAiAgentQueryVariables = Exact<{ [key: string]: never; }>;


export type GetAllAiAgentQuery = { __typename?: 'Query', getAllAiAgent: Array<{ __typename?: 'AiAgent', id: string, name: string, context: string, address: string }> };

export type GetGameByIdQueryVariables = Exact<{
  id: Scalars['String']['input'];
}>;


export type GetGameByIdQuery = { __typename?: 'Query', getGameById: { __typename?: 'Game', id: string, name: string, limit: number, defaultBettingAmount: number, bettingTokenDenom: string, winnerAiAgentId?: string | null, topic: string, createdAt?: any | null, updatedAt?: any | null, owner?: { __typename?: 'User', id: string, address: string, avatar?: string | null } | null, users?: Array<{ __typename?: 'User', id: string, address: string, avatar?: string | null }> | null, bettings?: Array<{ __typename?: 'Betting', bettingAmount: number, bettingTokenDenom: string, ownerAddress: string, result: string, predictionWinnerAiAgentId: string, createdAt?: any | null, updatedAt?: any | null }> | null, aiAgents?: Array<{ __typename?: 'AiAgent', id: string, name: string, address: string, context: string, createdAt?: any | null, updatedAt?: any | null }> | null } };

export type NewMessageSubscriptionVariables = Exact<{
  gameId: Scalars['String']['input'];
}>;


export type NewMessageSubscription = { __typename?: 'Subscription', newMessage: { __typename?: 'Message', id: string, content: string, messageType: string, createdAt?: any | null, gameId: string, senderAddress: string, sender?: { __typename?: 'User', id: string, address: string, avatar?: string | null } | null } };

export type NewStatusSubscriptionVariables = Exact<{
  gameId: Scalars['String']['input'];
}>;


export type NewStatusSubscription = { __typename?: 'Subscription', newStatus: { __typename?: 'GameEvent', event?: string | null, game?: { __typename?: 'Game', id: string, name: string, limit: number, defaultBettingAmount: number, bettingTokenDenom: string, winnerAiAgentId?: string | null, topic: string, createdAt?: any | null, updatedAt?: any | null, owner?: { __typename?: 'User', id: string, address: string, avatar?: string | null } | null, users?: Array<{ __typename?: 'User', id: string, address: string, avatar?: string | null }> | null, bettings?: Array<{ __typename?: 'Betting', bettingAmount: number, bettingTokenDenom: string, ownerAddress: string, result: string, predictionWinnerAiAgentId: string, createdAt?: any | null, updatedAt?: any | null }> | null, aiAgents?: Array<{ __typename?: 'AiAgent', id: string, name: string, address: string, context: string, createdAt?: any | null, updatedAt?: any | null }> | null } | null } };


export const CreateUserDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"mutation","name":{"kind":"Name","value":"createUser"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"address"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"String"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"createUser"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"createUserInput"},"value":{"kind":"ObjectValue","fields":[{"kind":"ObjectField","name":{"kind":"Name","value":"address"},"value":{"kind":"Variable","name":{"kind":"Name","value":"address"}}}]}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"name"}},{"kind":"Field","name":{"kind":"Name","value":"address"}},{"kind":"Field","name":{"kind":"Name","value":"signature"}},{"kind":"Field","name":{"kind":"Name","value":"avatar"}},{"kind":"Field","name":{"kind":"Name","value":"createdAt"}},{"kind":"Field","name":{"kind":"Name","value":"updatedAt"}}]}}]}}]} as unknown as DocumentNode<CreateUserMutation, CreateUserMutationVariables>;
export const CreateGameDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"mutation","name":{"kind":"Name","value":"createGame"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"limit"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"Int"}}}},{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"name"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"String"}}}},{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"defaultBettingAmount"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"Float"}}}},{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"topic"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"String"}}}},{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"ownerUserAddress"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"String"}}}},{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"firstAiAgentId"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"String"}}}},{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"secondAiAgentId"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"String"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"createGame"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"createGameInput"},"value":{"kind":"ObjectValue","fields":[{"kind":"ObjectField","name":{"kind":"Name","value":"limit"},"value":{"kind":"Variable","name":{"kind":"Name","value":"limit"}}},{"kind":"ObjectField","name":{"kind":"Name","value":"name"},"value":{"kind":"Variable","name":{"kind":"Name","value":"name"}}},{"kind":"ObjectField","name":{"kind":"Name","value":"defaultBettingAmount"},"value":{"kind":"Variable","name":{"kind":"Name","value":"defaultBettingAmount"}}},{"kind":"ObjectField","name":{"kind":"Name","value":"topic"},"value":{"kind":"Variable","name":{"kind":"Name","value":"topic"}}},{"kind":"ObjectField","name":{"kind":"Name","value":"ownerAddress"},"value":{"kind":"Variable","name":{"kind":"Name","value":"ownerUserAddress"}}},{"kind":"ObjectField","name":{"kind":"Name","value":"firstAiAgentId"},"value":{"kind":"Variable","name":{"kind":"Name","value":"firstAiAgentId"}}},{"kind":"ObjectField","name":{"kind":"Name","value":"secondAiAgentId"},"value":{"kind":"Variable","name":{"kind":"Name","value":"secondAiAgentId"}}}]}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"name"}},{"kind":"Field","name":{"kind":"Name","value":"limit"}},{"kind":"Field","name":{"kind":"Name","value":"defaultBettingAmount"}},{"kind":"Field","name":{"kind":"Name","value":"bettingTokenDenom"}},{"kind":"Field","name":{"kind":"Name","value":"owner"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"address"}},{"kind":"Field","name":{"kind":"Name","value":"avatar"}}]}},{"kind":"Field","name":{"kind":"Name","value":"users"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"address"}},{"kind":"Field","name":{"kind":"Name","value":"avatar"}}]}},{"kind":"Field","name":{"kind":"Name","value":"bettings"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"bettingAmount"}},{"kind":"Field","name":{"kind":"Name","value":"bettingTokenDenom"}},{"kind":"Field","name":{"kind":"Name","value":"ownerAddress"}},{"kind":"Field","name":{"kind":"Name","value":"result"}},{"kind":"Field","name":{"kind":"Name","value":"predictionWinnerAiAgentId"}},{"kind":"Field","name":{"kind":"Name","value":"createdAt"}},{"kind":"Field","name":{"kind":"Name","value":"updatedAt"}}]}},{"kind":"Field","name":{"kind":"Name","value":"aiAgents"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"name"}},{"kind":"Field","name":{"kind":"Name","value":"address"}},{"kind":"Field","name":{"kind":"Name","value":"context"}},{"kind":"Field","name":{"kind":"Name","value":"createdAt"}},{"kind":"Field","name":{"kind":"Name","value":"updatedAt"}}]}},{"kind":"Field","name":{"kind":"Name","value":"winnerAiAgentId"}},{"kind":"Field","name":{"kind":"Name","value":"topic"}},{"kind":"Field","name":{"kind":"Name","value":"createdAt"}},{"kind":"Field","name":{"kind":"Name","value":"updatedAt"}}]}}]}}]} as unknown as DocumentNode<CreateGameMutation, CreateGameMutationVariables>;
export const SendMessageDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"mutation","name":{"kind":"Name","value":"sendMessage"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"gameId"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"String"}}}},{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"senderAddress"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"String"}}}},{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"content"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"String"}}}},{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"messageType"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"String"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"sendMessage"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"gameId"},"value":{"kind":"Variable","name":{"kind":"Name","value":"gameId"}}},{"kind":"Argument","name":{"kind":"Name","value":"senderAddress"},"value":{"kind":"Variable","name":{"kind":"Name","value":"senderAddress"}}},{"kind":"Argument","name":{"kind":"Name","value":"content"},"value":{"kind":"Variable","name":{"kind":"Name","value":"content"}}},{"kind":"Argument","name":{"kind":"Name","value":"messageType"},"value":{"kind":"Variable","name":{"kind":"Name","value":"messageType"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"sender"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"address"}},{"kind":"Field","name":{"kind":"Name","value":"avatar"}}]}},{"kind":"Field","name":{"kind":"Name","value":"content"}},{"kind":"Field","name":{"kind":"Name","value":"messageType"}},{"kind":"Field","name":{"kind":"Name","value":"createdAt"}},{"kind":"Field","name":{"kind":"Name","value":"updatedAt"}}]}}]}}]} as unknown as DocumentNode<SendMessageMutation, SendMessageMutationVariables>;
export const JoinGameDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"mutation","name":{"kind":"Name","value":"joinGame"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"gameId"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"String"}}}},{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"userAddress"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"String"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"joinGame"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"gameId"},"value":{"kind":"Variable","name":{"kind":"Name","value":"gameId"}}},{"kind":"Argument","name":{"kind":"Name","value":"userAddress"},"value":{"kind":"Variable","name":{"kind":"Name","value":"userAddress"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"name"}},{"kind":"Field","name":{"kind":"Name","value":"limit"}},{"kind":"Field","name":{"kind":"Name","value":"defaultBettingAmount"}},{"kind":"Field","name":{"kind":"Name","value":"bettingTokenDenom"}},{"kind":"Field","name":{"kind":"Name","value":"owner"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"address"}},{"kind":"Field","name":{"kind":"Name","value":"avatar"}}]}},{"kind":"Field","name":{"kind":"Name","value":"users"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"address"}},{"kind":"Field","name":{"kind":"Name","value":"avatar"}}]}},{"kind":"Field","name":{"kind":"Name","value":"bettings"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"bettingAmount"}},{"kind":"Field","name":{"kind":"Name","value":"bettingTokenDenom"}},{"kind":"Field","name":{"kind":"Name","value":"ownerAddress"}},{"kind":"Field","name":{"kind":"Name","value":"result"}},{"kind":"Field","name":{"kind":"Name","value":"predictionWinnerAiAgentId"}},{"kind":"Field","name":{"kind":"Name","value":"createdAt"}},{"kind":"Field","name":{"kind":"Name","value":"updatedAt"}}]}},{"kind":"Field","name":{"kind":"Name","value":"aiAgents"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"name"}},{"kind":"Field","name":{"kind":"Name","value":"address"}},{"kind":"Field","name":{"kind":"Name","value":"context"}},{"kind":"Field","name":{"kind":"Name","value":"createdAt"}},{"kind":"Field","name":{"kind":"Name","value":"updatedAt"}}]}},{"kind":"Field","name":{"kind":"Name","value":"winnerAiAgentId"}},{"kind":"Field","name":{"kind":"Name","value":"topic"}},{"kind":"Field","name":{"kind":"Name","value":"createdAt"}},{"kind":"Field","name":{"kind":"Name","value":"updatedAt"}}]}}]}}]} as unknown as DocumentNode<JoinGameMutation, JoinGameMutationVariables>;
export const UpdateAiAgentDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"mutation","name":{"kind":"Name","value":"updateAiAgent"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"aiAgentId"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"String"}}}},{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"updateAiAgentInput"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"UpdateAiAgentInput"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"updateAiAgent"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"aiAgentId"},"value":{"kind":"Variable","name":{"kind":"Name","value":"aiAgentId"}}},{"kind":"Argument","name":{"kind":"Name","value":"updateAiAgentInput"},"value":{"kind":"Variable","name":{"kind":"Name","value":"updateAiAgentInput"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"name"}},{"kind":"Field","name":{"kind":"Name","value":"context"}},{"kind":"Field","name":{"kind":"Name","value":"address"}}]}}]}}]} as unknown as DocumentNode<UpdateAiAgentMutation, UpdateAiAgentMutationVariables>;
export const CreateAiAgentDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"mutation","name":{"kind":"Name","value":"createAiAgent"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"createAiAgentInput"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"CreateAiAgentInput"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"createAiAgent"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"createAiAgentInput"},"value":{"kind":"Variable","name":{"kind":"Name","value":"createAiAgentInput"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"name"}},{"kind":"Field","name":{"kind":"Name","value":"context"}},{"kind":"Field","name":{"kind":"Name","value":"address"}}]}}]}}]} as unknown as DocumentNode<CreateAiAgentMutation, CreateAiAgentMutationVariables>;
export const BroadcastEventDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"mutation","name":{"kind":"Name","value":"broadcastEvent"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"gameId"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"String"}}}},{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"event"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"String"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"broadcastEvent"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"gameId"},"value":{"kind":"Variable","name":{"kind":"Name","value":"gameId"}}},{"kind":"Argument","name":{"kind":"Name","value":"event"},"value":{"kind":"Variable","name":{"kind":"Name","value":"event"}}}]}]}}]} as unknown as DocumentNode<BroadcastEventMutation, BroadcastEventMutationVariables>;
export const CreateBettingDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"mutation","name":{"kind":"Name","value":"createBetting"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"gameId"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"String"}}}},{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"createBettingInput"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"CreateBettingInput"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"createBetting"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"gameId"},"value":{"kind":"Variable","name":{"kind":"Name","value":"gameId"}}},{"kind":"Argument","name":{"kind":"Name","value":"createBettingInput"},"value":{"kind":"Variable","name":{"kind":"Name","value":"createBettingInput"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"bettingAmount"}},{"kind":"Field","name":{"kind":"Name","value":"bettingTokenDenom"}},{"kind":"Field","name":{"kind":"Name","value":"ownerAddress"}},{"kind":"Field","name":{"kind":"Name","value":"result"}},{"kind":"Field","name":{"kind":"Name","value":"predictionWinnerAiAgentId"}},{"kind":"Field","name":{"kind":"Name","value":"createdAt"}},{"kind":"Field","name":{"kind":"Name","value":"updatedAt"}}]}}]}}]} as unknown as DocumentNode<CreateBettingMutation, CreateBettingMutationVariables>;
export const DeleteAllMessagesInGameDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"mutation","name":{"kind":"Name","value":"deleteAllMessagesInGame"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"gameId"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"String"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"deleteAllMessagesInGame"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"gameId"},"value":{"kind":"Variable","name":{"kind":"Name","value":"gameId"}}}]}]}}]} as unknown as DocumentNode<DeleteAllMessagesInGameMutation, DeleteAllMessagesInGameMutationVariables>;
export const DeleteAllBettingsInGameDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"mutation","name":{"kind":"Name","value":"deleteAllBettingsInGame"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"gameId"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"String"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"deleteAllBettingsInGame"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"gameId"},"value":{"kind":"Variable","name":{"kind":"Name","value":"gameId"}}}]}]}}]} as unknown as DocumentNode<DeleteAllBettingsInGameMutation, DeleteAllBettingsInGameMutationVariables>;
export const UpdateWinnerAiAgentDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"mutation","name":{"kind":"Name","value":"updateWinnerAiAgent"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"gameId"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"String"}}}},{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"aiAgentId"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"String"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"updateWinnerAiAgent"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"gameId"},"value":{"kind":"Variable","name":{"kind":"Name","value":"gameId"}}},{"kind":"Argument","name":{"kind":"Name","value":"aiAgentId"},"value":{"kind":"Variable","name":{"kind":"Name","value":"aiAgentId"}}}]}]}}]} as unknown as DocumentNode<UpdateWinnerAiAgentMutation, UpdateWinnerAiAgentMutationVariables>;
export const GetGamesByOwnerAddressDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"query","name":{"kind":"Name","value":"getGamesByOwnerAddress"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"address"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"String"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"getGamesByOwnerAddress"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"ownerAddress"},"value":{"kind":"Variable","name":{"kind":"Name","value":"address"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"name"}},{"kind":"Field","name":{"kind":"Name","value":"limit"}},{"kind":"Field","name":{"kind":"Name","value":"defaultBettingAmount"}},{"kind":"Field","name":{"kind":"Name","value":"bettingTokenDenom"}},{"kind":"Field","name":{"kind":"Name","value":"owner"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"address"}},{"kind":"Field","name":{"kind":"Name","value":"avatar"}}]}},{"kind":"Field","name":{"kind":"Name","value":"users"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"address"}},{"kind":"Field","name":{"kind":"Name","value":"avatar"}}]}},{"kind":"Field","name":{"kind":"Name","value":"bettings"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"bettingAmount"}},{"kind":"Field","name":{"kind":"Name","value":"bettingTokenDenom"}},{"kind":"Field","name":{"kind":"Name","value":"ownerAddress"}},{"kind":"Field","name":{"kind":"Name","value":"result"}},{"kind":"Field","name":{"kind":"Name","value":"predictionWinnerAiAgentId"}},{"kind":"Field","name":{"kind":"Name","value":"createdAt"}},{"kind":"Field","name":{"kind":"Name","value":"updatedAt"}}]}},{"kind":"Field","name":{"kind":"Name","value":"aiAgents"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"name"}},{"kind":"Field","name":{"kind":"Name","value":"address"}},{"kind":"Field","name":{"kind":"Name","value":"context"}},{"kind":"Field","name":{"kind":"Name","value":"createdAt"}},{"kind":"Field","name":{"kind":"Name","value":"updatedAt"}}]}},{"kind":"Field","name":{"kind":"Name","value":"winnerAiAgentId"}},{"kind":"Field","name":{"kind":"Name","value":"topic"}},{"kind":"Field","name":{"kind":"Name","value":"createdAt"}},{"kind":"Field","name":{"kind":"Name","value":"updatedAt"}}]}}]}}]} as unknown as DocumentNode<GetGamesByOwnerAddressQuery, GetGamesByOwnerAddressQueryVariables>;
export const GetMessagesByGameDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"query","name":{"kind":"Name","value":"getMessagesByGame"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"gameId"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"String"}}}},{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"userAddress"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"String"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"getMessagesByGame"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"gameId"},"value":{"kind":"Variable","name":{"kind":"Name","value":"gameId"}}},{"kind":"Argument","name":{"kind":"Name","value":"userAddress"},"value":{"kind":"Variable","name":{"kind":"Name","value":"userAddress"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"sender"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"address"}},{"kind":"Field","name":{"kind":"Name","value":"avatar"}}]}},{"kind":"Field","name":{"kind":"Name","value":"senderAddress"}},{"kind":"Field","name":{"kind":"Name","value":"content"}},{"kind":"Field","name":{"kind":"Name","value":"messageType"}},{"kind":"Field","name":{"kind":"Name","value":"createdAt"}},{"kind":"Field","name":{"kind":"Name","value":"updatedAt"}},{"kind":"Field","name":{"kind":"Name","value":"gameId"}}]}}]}}]} as unknown as DocumentNode<GetMessagesByGameQuery, GetMessagesByGameQueryVariables>;
export const GetJoinedGamesDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"query","name":{"kind":"Name","value":"getJoinedGames"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"userAddress"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"String"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"getJoinedGames"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"userAddress"},"value":{"kind":"Variable","name":{"kind":"Name","value":"userAddress"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"name"}},{"kind":"Field","name":{"kind":"Name","value":"limit"}},{"kind":"Field","name":{"kind":"Name","value":"defaultBettingAmount"}},{"kind":"Field","name":{"kind":"Name","value":"bettingTokenDenom"}},{"kind":"Field","name":{"kind":"Name","value":"owner"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"address"}},{"kind":"Field","name":{"kind":"Name","value":"avatar"}}]}},{"kind":"Field","name":{"kind":"Name","value":"users"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"address"}},{"kind":"Field","name":{"kind":"Name","value":"avatar"}}]}},{"kind":"Field","name":{"kind":"Name","value":"bettings"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"bettingAmount"}},{"kind":"Field","name":{"kind":"Name","value":"bettingTokenDenom"}},{"kind":"Field","name":{"kind":"Name","value":"ownerAddress"}},{"kind":"Field","name":{"kind":"Name","value":"result"}},{"kind":"Field","name":{"kind":"Name","value":"predictionWinnerAiAgentId"}},{"kind":"Field","name":{"kind":"Name","value":"createdAt"}},{"kind":"Field","name":{"kind":"Name","value":"updatedAt"}}]}},{"kind":"Field","name":{"kind":"Name","value":"aiAgents"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"name"}},{"kind":"Field","name":{"kind":"Name","value":"address"}},{"kind":"Field","name":{"kind":"Name","value":"context"}},{"kind":"Field","name":{"kind":"Name","value":"createdAt"}},{"kind":"Field","name":{"kind":"Name","value":"updatedAt"}}]}},{"kind":"Field","name":{"kind":"Name","value":"winnerAiAgentId"}},{"kind":"Field","name":{"kind":"Name","value":"topic"}},{"kind":"Field","name":{"kind":"Name","value":"createdAt"}},{"kind":"Field","name":{"kind":"Name","value":"updatedAt"}}]}}]}}]} as unknown as DocumentNode<GetJoinedGamesQuery, GetJoinedGamesQueryVariables>;
export const IsJoinedGameDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"query","name":{"kind":"Name","value":"isJoinedGame"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"gameId"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"String"}}}},{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"userAddress"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"String"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"isJoinedGame"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"gameId"},"value":{"kind":"Variable","name":{"kind":"Name","value":"gameId"}}},{"kind":"Argument","name":{"kind":"Name","value":"userAddress"},"value":{"kind":"Variable","name":{"kind":"Name","value":"userAddress"}}}]}]}}]} as unknown as DocumentNode<IsJoinedGameQuery, IsJoinedGameQueryVariables>;
export const GetAllAiAgentDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"query","name":{"kind":"Name","value":"getAllAiAgent"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"getAllAiAgent"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"name"}},{"kind":"Field","name":{"kind":"Name","value":"context"}},{"kind":"Field","name":{"kind":"Name","value":"address"}}]}}]}}]} as unknown as DocumentNode<GetAllAiAgentQuery, GetAllAiAgentQueryVariables>;
export const GetGameByIdDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"query","name":{"kind":"Name","value":"getGameById"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"id"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"String"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"getGameById"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"id"},"value":{"kind":"Variable","name":{"kind":"Name","value":"id"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"name"}},{"kind":"Field","name":{"kind":"Name","value":"limit"}},{"kind":"Field","name":{"kind":"Name","value":"defaultBettingAmount"}},{"kind":"Field","name":{"kind":"Name","value":"bettingTokenDenom"}},{"kind":"Field","name":{"kind":"Name","value":"owner"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"address"}},{"kind":"Field","name":{"kind":"Name","value":"avatar"}}]}},{"kind":"Field","name":{"kind":"Name","value":"users"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"address"}},{"kind":"Field","name":{"kind":"Name","value":"avatar"}}]}},{"kind":"Field","name":{"kind":"Name","value":"bettings"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"bettingAmount"}},{"kind":"Field","name":{"kind":"Name","value":"bettingTokenDenom"}},{"kind":"Field","name":{"kind":"Name","value":"ownerAddress"}},{"kind":"Field","name":{"kind":"Name","value":"result"}},{"kind":"Field","name":{"kind":"Name","value":"predictionWinnerAiAgentId"}},{"kind":"Field","name":{"kind":"Name","value":"createdAt"}},{"kind":"Field","name":{"kind":"Name","value":"updatedAt"}}]}},{"kind":"Field","name":{"kind":"Name","value":"aiAgents"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"name"}},{"kind":"Field","name":{"kind":"Name","value":"address"}},{"kind":"Field","name":{"kind":"Name","value":"context"}},{"kind":"Field","name":{"kind":"Name","value":"createdAt"}},{"kind":"Field","name":{"kind":"Name","value":"updatedAt"}}]}},{"kind":"Field","name":{"kind":"Name","value":"winnerAiAgentId"}},{"kind":"Field","name":{"kind":"Name","value":"topic"}},{"kind":"Field","name":{"kind":"Name","value":"createdAt"}},{"kind":"Field","name":{"kind":"Name","value":"updatedAt"}}]}}]}}]} as unknown as DocumentNode<GetGameByIdQuery, GetGameByIdQueryVariables>;
export const NewMessageDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"subscription","name":{"kind":"Name","value":"newMessage"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"gameId"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"String"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"newMessage"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"gameId"},"value":{"kind":"Variable","name":{"kind":"Name","value":"gameId"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"sender"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"address"}},{"kind":"Field","name":{"kind":"Name","value":"avatar"}}]}},{"kind":"Field","name":{"kind":"Name","value":"content"}},{"kind":"Field","name":{"kind":"Name","value":"messageType"}},{"kind":"Field","name":{"kind":"Name","value":"createdAt"}},{"kind":"Field","name":{"kind":"Name","value":"gameId"}},{"kind":"Field","name":{"kind":"Name","value":"senderAddress"}}]}}]}}]} as unknown as DocumentNode<NewMessageSubscription, NewMessageSubscriptionVariables>;
export const NewStatusDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"subscription","name":{"kind":"Name","value":"newStatus"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"gameId"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"String"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"newStatus"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"gameId"},"value":{"kind":"Variable","name":{"kind":"Name","value":"gameId"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"event"}},{"kind":"Field","name":{"kind":"Name","value":"game"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"name"}},{"kind":"Field","name":{"kind":"Name","value":"limit"}},{"kind":"Field","name":{"kind":"Name","value":"defaultBettingAmount"}},{"kind":"Field","name":{"kind":"Name","value":"bettingTokenDenom"}},{"kind":"Field","name":{"kind":"Name","value":"owner"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"address"}},{"kind":"Field","name":{"kind":"Name","value":"avatar"}}]}},{"kind":"Field","name":{"kind":"Name","value":"users"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"address"}},{"kind":"Field","name":{"kind":"Name","value":"avatar"}}]}},{"kind":"Field","name":{"kind":"Name","value":"bettings"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"bettingAmount"}},{"kind":"Field","name":{"kind":"Name","value":"bettingTokenDenom"}},{"kind":"Field","name":{"kind":"Name","value":"ownerAddress"}},{"kind":"Field","name":{"kind":"Name","value":"result"}},{"kind":"Field","name":{"kind":"Name","value":"predictionWinnerAiAgentId"}},{"kind":"Field","name":{"kind":"Name","value":"createdAt"}},{"kind":"Field","name":{"kind":"Name","value":"updatedAt"}}]}},{"kind":"Field","name":{"kind":"Name","value":"aiAgents"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"name"}},{"kind":"Field","name":{"kind":"Name","value":"address"}},{"kind":"Field","name":{"kind":"Name","value":"context"}},{"kind":"Field","name":{"kind":"Name","value":"createdAt"}},{"kind":"Field","name":{"kind":"Name","value":"updatedAt"}}]}},{"kind":"Field","name":{"kind":"Name","value":"winnerAiAgentId"}},{"kind":"Field","name":{"kind":"Name","value":"topic"}},{"kind":"Field","name":{"kind":"Name","value":"createdAt"}},{"kind":"Field","name":{"kind":"Name","value":"updatedAt"}}]}}]}}]}}]} as unknown as DocumentNode<NewStatusSubscription, NewStatusSubscriptionVariables>;