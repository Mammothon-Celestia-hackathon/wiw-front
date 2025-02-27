'use client';

import { AptosWalletAdapterProvider } from "@aptos-labs/wallet-adapter-react";
import { PetraWallet } from "petra-plugin-wallet-adapter";
import { PropsWithChildren, useEffect, useState } from "react";
import { toast } from "@/components/ui/use-toast";

const wallets = [new PetraWallet()];

export const WalletProvider = ({ children }: PropsWithChildren) => {
  const [loaded, setLoaded] = useState(false);

  useEffect(() => {
    // Check if Petra wallet is installed
    if (typeof window !== 'undefined') {
      if (!window.petra) {
        toast({
          variant: "destructive",
          title: "Petra 지갑이 필요합니다",
          description: (
            <div className="mt-2">
              <p>이 dApp을 사용하기 위해서는 Petra 지갑이 필요합니다.</p>
              <a 
                href="https://petra.app"
                target="_blank"
                rel="noopener noreferrer"
                className="text-blue-500 hover:text-blue-600 underline mt-2 inline-block"
              >
                Petra 지갑 설치하기 →
              </a>
            </div>
          ),
        });
      }
    }
    setLoaded(true);
  }, []);

  if (!loaded) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="flex flex-col items-center space-y-4">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-gray-900"></div>
          <p className="text-gray-600">지갑 연결 준비 중...</p>
        </div>
      </div>
    );
  }

  return (
    <AptosWalletAdapterProvider 
      plugins={wallets} 
      autoConnect={true}
      onError={(error) => {
        console.error('Wallet error:', error);
        toast({
          variant: "destructive",
          title: "지갑 오류",
          description: "지갑 연결 중 문제가 발생했습니다. 다시 시도해주세요.",
        });
      }}
    >
      {children}
    </AptosWalletAdapterProvider>
  );
};

// Add type declaration for Petra wallet
declare global {
  interface Window {
    petra?: any;
  }
}