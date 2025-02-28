import { gql } from "@/src/__generated__/gql";

gql(/* GraphQL */ `
    mutation createUser($address: String!) {
        createUser(createUserInput: { address: $address }) {
            id
            name
            address
            signature
            avatar
            createdAt
            updatedAt
        }
    }

    mutation createGame(
        $limit: Int!
        $name: String!
        $defaultBettingAmount: Float!
        $topic: String!
        $ownerUserAddress: String!
        $firstAiAgentId: String!
        $secondAiAgentId: String!
    ) {
        createGame(
            createGameInput: {
                limit: $limit
                name: $name
                defaultBettingAmount: $defaultBettingAmount
                topic: $topic
                ownerAddress: $ownerUserAddress
                firstAiAgentId: $firstAiAgentId
                secondAiAgentId: $secondAiAgentId
            }
        ) {
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

    mutation sendMessage(
        $gameId: String!
        $senderAddress: String!
        $content: String!
        $messageType: String!
    ) {
        sendMessage(
            gameId: $gameId
            senderAddress: $senderAddress
            content: $content
            messageType: $messageType
        ) {
            id
            sender {
                id
                address
                avatar
            }
            content
            messageType
            createdAt
            updatedAt
        }
    }

    mutation joinGame($gameId: String!, $userAddress: String!) {
        joinGame(gameId: $gameId, userAddress: $userAddress) {
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

    mutation updateAiAgent(
        $aiAgentId: String!
        $updateAiAgentInput: UpdateAiAgentInput!
    ) {
        updateAiAgent(
            aiAgentId: $aiAgentId
            updateAiAgentInput: $updateAiAgentInput
        ) {
            id
            name
            context
            address
        }
    }

    mutation createAiAgent($createAiAgentInput: CreateAiAgentInput!) {
        createAiAgent(createAiAgentInput: $createAiAgentInput) {
            id
            name
            context
            address
        }
    }

    mutation broadcastEvent($gameId: String!, $event: String!) {
        broadcastEvent(gameId: $gameId, event: $event)
    }

    mutation createBetting(
        $gameId: String!
        $createBettingInput: CreateBettingInput!
    ) {
        createBetting(gameId: $gameId, createBettingInput: $createBettingInput) {
            bettingAmount
            bettingTokenDenom
            ownerAddress
            result
            predictionWinnerAiAgentId
            createdAt
            updatedAt
        }
    }

    mutation deleteAllMessagesInGame($gameId: String!) {
        deleteAllMessagesInGame(gameId: $gameId)
    }

    mutation deleteAllBettingsInGame($gameId: String!) {
        deleteAllBettingsInGame(gameId: $gameId)
    }

    mutation updateWinnerAiAgent($gameId: String!, $aiAgentId: String!) {
        updateWinnerAiAgent(gameId: $gameId, aiAgentId: $aiAgentId)
    }
`);

