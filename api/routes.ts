export const ROUTES = {
    sendMessage: (agentId: string, agentPort: string): string =>
        `http://localhost:${agentPort}/${agentId}/message`,
    getAgents: (agentPort: string): string =>
        `http://localhost:${agentPort}/agents`,
};
