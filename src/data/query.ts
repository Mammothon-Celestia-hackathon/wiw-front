import { gql } from '@apollo/client';

export const GET_GAMES_BY_OWNER = gql`
  query GetGamesByOwnerAddress($ownerAddress: String!) {
    getGamesByOwnerAddress(ownerAddress: $ownerAddress) {
      id
      name
      topic
      bettingTokenDenom
      defaultBettingAmount
      limit
      createdAt
      ownerAddress
      userAddresses
    }
  }
`;

export const GET_JOINED_GAMES = gql`
  query GetJoinedGames($userAddress: String!) {
    getJoinedGames(userAddress: $userAddress) {
      id
      name
      topic
      bettingTokenDenom
      defaultBettingAmount
      limit
      createdAt
      ownerAddress
      userAddresses
    }
  }
`;

export const GET_GAME_DETAIL = gql`
  query GetGameDetail($id: ID!, $userAddress: String!) {
    getGameDetail(id: $id) {
      id
      name
      topic
      ownerAddress
      bettingTokenDenom
      defaultBettingAmount
      limit
      createdAt
      updatedAt
      userAddresses
      owner {
        id
        address
        name
        avatar
      }
    }
    getMessagesByGame(gameId: $id, userAddress: $userAddress) {
      id
      content
      messageType
      senderAddress
      createdAt
    }
    isJoinedGame(gameId: $id, userAddress: $userAddress)
  }
`;

export const SEND_MESSAGE = gql`
  mutation SendMessage($content: String!, $gameId: String!, $messageType: String!, $senderAddress: String!) {
    sendMessage(
      content: $content
      gameId: $gameId
      messageType: $messageType
      senderAddress: $senderAddress
    ) {
      id
      content
      messageType
      senderAddress
      createdAt
    }
  }
`;

export const GET_MESSAGES_BY_GAME = gql`
  query GetMessagesByGame($gameId: String!, $userAddress: String!) {
    getMessagesByGame(gameId: $gameId, userAddress: $userAddress) {
      id
      content
      messageType
      senderAddress
      createdAt
    }
    isJoinedGame(gameId: $gameId, userAddress: $userAddress)
  }
`;
