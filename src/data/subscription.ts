import { gql } from "@/src/__generated__/gql";

gql(/* GraphQL */ `
    subscription newMessage($gameId: String!) {
        newMessage(gameId: $gameId) {
            id
            sender {
                id
                address
                avatar
            }
            content
            messageType
            createdAt
            gameId
            senderAddress
        }
    }

    subscription newStatus($gameId: String!) {
        newStatus(gameId: $gameId) {
            event
            game {
                id
                name
                limit
                defaultBettingAmount
                bettingTokenDenom
                owner {
                    id
                    address
                    avatar
                }
                users {
                    id
                    address
                    avatar
                }
                bettings {
                    bettingAmount
                    bettingTokenDenom
                    ownerAddress
                    result
                    predictionWinnerAiAgentId
                    createdAt
                    updatedAt
                }
                aiAgents {
                    id
                    name
                    address
                    context
                    createdAt
                    updatedAt
                }
                winnerAiAgentId
                topic
                createdAt
                updatedAt
            }
        }
    }
`);
