declare global {
  interface Window {
    aptos?: {
      connect: () => Promise<{ address: string }>;
      disconnect: () => Promise<void>;
      signAndSubmitTransaction: (transaction: any) => Promise<any>;
      isConnected: () => Promise<boolean>;
      network: () => Promise<string>;
      account: () => Promise<{ address: string }>;
    }
  }
}

export {} 