'use client';

import { useWallet } from "@aptos-labs/wallet-adapter-react";
import { Button } from './ui/button';
import { ellipsisAddress } from '@/utils/strings';
import { Wallet, LogOut } from 'lucide-react';

export const Account = () => {
  const { account, connected, connect, disconnect, wallets } = useWallet();

  const handleConnect = () => {
    const okxWallet = wallets?.find(wallet => 
      wallet.name.toLowerCase().includes('okx')
    );
    
    if (okxWallet) {
      connect(okxWallet.name);
    }
  };

  return (
    <div className="flex items-center space-x-2">
      {connected && account ? (
        <Button 
          onClick={() => disconnect()} 
          variant="outline"
          className="rounded-full px-6 py-2 flex items-center space-x-2 border-blue-500 text-blue-500 hover:bg-blue-50 transition-all duration-200"
        >
          <LogOut className="w-4 h-4" />
          <span className="font-medium">
            {ellipsisAddress(account.address)}
          </span>
        </Button>
      ) : (
        <Button 
          onClick={handleConnect}
          className="bg-gradient-to-r from-blue-500 to-blue-600 hover:from-blue-600 hover:to-blue-700 text-white rounded-full px-6 py-2 flex items-center space-x-2 shadow-lg transition-all duration-200 hover:shadow-blue-200"
        >
          <Wallet className="w-4 h-4" />
          <span className="font-medium">
            Connect Wallet
          </span>
        </Button>
      )}
    </div>
  );
};