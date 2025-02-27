'use client';

import { WalletName, useWallet } from "@aptos-labs/wallet-adapter-react";
import { Button } from './ui/button';

export const Account = () => {
  const { connect, disconnect, account, connected } = useWallet();

  const handleConnect = async () => {
    try {
      await connect("Razor" as WalletName<"Razor">);
      console.log('Connected to wallet:', account);
    } catch (error) {
      console.error('Failed to connect to wallet:', error);
    }
  };

  return (
    <div>
      {connected ? (
        <Button 
          onClick={disconnect}
          className="bg-gradient-to-r from-blue-500 to-blue-600 hover:from-blue-600 hover:to-blue-700 text-white rounded-full px-6 py-2"
        >
          {account?.address?.slice(0, 6)}...
        </Button>
      ) : (
        <Button 
          onClick={handleConnect}
          className="bg-gradient-to-r from-blue-500 to-blue-600 hover:from-blue-600 hover:to-blue-700 text-white rounded-full px-6 py-2"
        >
          Connect Wallet
        </Button>
      )}
    </div>
  );
};