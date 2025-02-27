import { Aptos, AptosConfig, Network } from '@aptos-labs/ts-sdk';

export const aptosClient = new Aptos(
  new AptosConfig({
    network: Network.TESTNET,
    fullnode: 'https://testnet-rpc.movementlabs.xyz/v1',
    faucet: 'https://testnet-faucet.movementlabs.xyz/v1',
  })
);

export const CONTRACT_ADDRESS = '0xd7ae4e1e8d4486450936d8fdbb93af0cba8e1ae00c00f82653f76c5d65d76a6f';

export type AptosWalletContextType = {
  account: string | null;
  connect: () => Promise<void>;
  disconnect: () => Promise<void>;
  isConnected: boolean;
}; 