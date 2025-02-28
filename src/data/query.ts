import { gql } from "@/src/__generated__/gql";

gql(/* GraphQL */ `
    query getGamesByOwnerAddress($address: String!) {
        getGamesByOwnerAddress(ownerAddress: $address) {
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

    query getMessagesByGame($gameId: String!, $userAddress: String!) {
        getMessagesByGame(gameId: $gameId, userAddress: $userAddress) {
            id
            sender {
                id
                address
                avatar
            }
            senderAddress
            content
            messageType
            createdAt
            updatedAt
            gameId
        }
    }

    query getJoinedGames($userAddress: String!) {
        getJoinedGames(userAddress: $userAddress) {
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

    query isJoinedGame($gameId: String!, $userAddress: String!) {
        isJoinedGame(gameId: $gameId, userAddress: $userAddress)
    }

    query getAllAiAgent {
        getAllAiAgent {
            id
            name
            context
            address
        }
    }

    query getGameById($id: String!) {
        getGameById(id: $id) {
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
`);
