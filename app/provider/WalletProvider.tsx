'use client';

import { AptosWalletAdapterProvider } from "@aptos-labs/wallet-adapter-react";
import { PropsWithChildren } from "react";
import { AptosConfig, Network } from "@aptos-labs/ts-sdk";
import { OKXWallet } from "@okwallet/aptos-wallet-adapter";

export const WalletProvider = ({ children }: PropsWithChildren) => {
  const wallets = [
    new OKXWallet(),
  ];

  // Movement Bardock Testnet 설정
  const config = new AptosConfig({
    network: Network.CUSTOM,
    fullnode: 'https://aptos.testnet.bardock.movementlabs.xyz/v1',
    faucet: 'https://fund.testnet.bardock.movementlabs.xyz/',
});

  return (
    <AptosWalletAdapterProvider
      plugins={wallets}
      autoConnect={true}
      dappConfig={config}
      onError={(error) => {
        console.log("Wallet Error:", error);
      }}
    >
      {children}
    </AptosWalletAdapterProvider>
  );
};