import { Aptos, Network, AptosConfig } from '@aptos-labs/ts-sdk';

// Bardock testnet 설정
export const BARDOCK_CONFIG = {
  fullnode: "https://fullnode.bardock.movementlabs.xyz/v1",
  indexer: "https://indexer.bardock.movementlabs.xyz/v1",
  faucet: "https://faucet.bardock.movementlabs.xyz/v1"
};

export const CONTRACT_ADDRESS = '0xd7ae4e1e8d4486450936d8fdbb93af0cba8e1ae00c00f82653f76c5d65d76a6f';

const config = new AptosConfig({
  network: Network.CUSTOM,
  fullnode: BARDOCK_CONFIG.fullnode,
  indexer: BARDOCK_CONFIG.indexer,
  faucet: BARDOCK_CONFIG.faucet
});

export const aptosClient = new Aptos(config);

export type AptosWalletContextType = {
  account: string | null;
  connect: () => Promise<void>;
  disconnect: () => Promise<void>;
  isConnected: boolean;
}; 