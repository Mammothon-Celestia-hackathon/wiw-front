import { gql } from '@apollo/client';

export const GET_GAME_DETAIL = gql`
  query GetGameDetail($id: ID!) {
    getGameDetail(id: $id) {
      id
      name
      topic
      ownerUserAddress
      messages {
        id
        content
        messageType
        sender
        createdAt
      }
      userAddresses
      bettingTokenDenom
      defaultBettingAmount
      limit
      createdAt
      updatedAt
    }
  }
`;

export const GET_GAME_COMMENTS = gql`
  query GetGameComments($gameId: ID!) {
    getGameComments(gameId: $gameId) {
      id
      address
      message
      timestamp
      isAgentA
    }
  }
`;

export const CREATE_COMMENT = gql`
  mutation CreateComment($input: CreateCommentInput!) {
    createComment(input: $input) {
      id
      address
      message
      timestamp
      isAgentA
    }
  }
`;

export const GET_GAMES = gql`
  query GetGames {
    getGames {
      id
      name
      topic
      createdAt
      state
      aiAgents {
        id
        name
      }
      bettingTokenDenom
      defaultBettingAmount
    }
  }
`;
