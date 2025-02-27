import { Aptos, AptosConfig, Network } from '@aptos-labs/ts-sdk';

// Movement Bardock Testnet 클라이언트 설정
export const aptosClient = new Aptos(
  new AptosConfig({ 
    network: Network.CUSTOM,
    // Movement Bardock Testnet endpoints
    fullnode: 'https://aptos.testnet.bardock.movementlabs.xyz/v1',
    faucet: 'https://fund.testnet.bardock.movementlabs.xyz/',
  })
);

// Movement Bardock Testnet에 배포된 컨트랙트 주소
export const CONTRACT_ADDRESS = '0xd7ae4e1e8d4486450936d8fdbb93af0cba8e1ae00c00f82653f76c5d65d76a6f';

// Aptos 지갑 연결 상태 관리를 위한 타입
export type AptosWalletContextType = {
  account: string | null;
  connect: () => Promise<void>;
  disconnect: () => Promise<void>;
  isConnected: boolean;
}; 