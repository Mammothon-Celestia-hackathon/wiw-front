'use client';
import React, { useEffect, createContext, useContext, useState } from 'react';
import { ThemeProvider } from 'next-themes';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { AptosWalletContextType } from '@/lib/aptos';

// Aptos 지갑 컨텍스트 생성
export const AptosWalletContext = createContext<AptosWalletContextType>({
  account: null,
  connect: async () => {},
  disconnect: async () => {},
  isConnected: false,
});

export default function Providers({ children }: { children: React.ReactNode }) {
  const [mounted, setMounted] = useState(false);
  const [account, setAccount] = useState<string | null>(null);
  const [isConnected, setIsConnected] = useState(false);

  const queryClient = new QueryClient({
    defaultOptions: {
      queries: {
        retry: false,
        staleTime: 0
      }
    }
  });

  useEffect(() => {
    setMounted(true);
  }, []);

  // Aptos 지갑 연결 함수
  const connect = async () => {
    try {
      if (window.aptos) {
        const { address } = await window.aptos.connect();
        setAccount(address);
        setIsConnected(true);
      } else {
        alert('Aptos 지갑을 설치해주세요!');
      }
    } catch (error) {
      console.error('지갑 연결 실패:', error);
    }
  };

  // Aptos 지갑 연결 해제 함수
  const disconnect = async () => {
    try {
      if (window.aptos) {
        await window.aptos.disconnect();
        setAccount(null);
        setIsConnected(false);
      }
    } catch (error) {
      console.error('지갑 연결 해제 실패:', error);
    }
  };

  if (!mounted) {
    return null;
  }

  return (
    <ThemeProvider
      attribute="class"
      defaultTheme="system"
      enableSystem
      disableTransitionOnChange
    >
      <AptosWalletContext.Provider value={{ account, connect, disconnect, isConnected }}>
        <QueryClientProvider client={queryClient}>
          {children}
        </QueryClientProvider>
      </AptosWalletContext.Provider>
    </ThemeProvider>
  );
}
