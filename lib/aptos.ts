import { AptosClient } from 'aptos';

// Aptos 테스트넷 클라이언트 설정
export const aptosClient = new AptosClient('https://testnet.aptoslabs.com');

// 컨트랙트 주소
export const CONTRACT_ADDRESS = '0x18693562f4ced0fd77d6b42416003a5945d15358431fbff2b9af0e4b0759d261';

// Aptos 지갑 연결 상태 관리를 위한 타입
export type AptosWalletContextType = {
  account: string | null;
  connect: () => Promise<void>;
  disconnect: () => Promise<void>;
  isConnected: boolean;
}; 