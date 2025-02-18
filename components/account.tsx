'use client';

import { useWallet } from "@aptos-labs/wallet-adapter-react";
import { Button } from './ui/button';
import { ellipsisAddress } from '@/utils/strings';

export const Account = () => {
  const { account, connected, connect, disconnect, wallets } = useWallet();

  return (
    <div className="flex items-center space-x-2">
      {connected && account ? (
        <Button 
          onClick={() => disconnect()} 
          className='bg-amber-400 rounded-3xl'
        >
          <h3 className="text-md mr-2">
            {ellipsisAddress(account.address)}
          </h3>
        </Button>
      ) : (
        wallets
          ?.filter(wallet => ['Petra', 'Google'].includes(wallet.name))
          .map((wallet) => (
            <Button 
              key={wallet.name}
              onClick={() => connect(wallet.name)} 
              className='bg-amber-400'
            >
              Connect {wallet.name}
            </Button>
          ))
      )}
    </div>
  );
};