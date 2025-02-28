export const ROUTES = {
    sendMessage: (agentId: string): string =>
        `http://34.22.96.81:3000/${agentId}/message`,
    getAgents: (): string =>
        `http://34.22.96.81:3000/agents`,
};
