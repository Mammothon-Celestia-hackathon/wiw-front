export const ROUTES = {
    sendMessage: (agentId: string): string =>
        `http://localhost:3000/${agentId}/message`,
    getAgents: (): string =>
        `http://localhost:3000/agents`,
};
