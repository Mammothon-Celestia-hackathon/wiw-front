'use client';

import { WalletProvider as RazorWalletProvider, IDefaultWallet } from "@razorlabs/razorkit";
import { PropsWithChildren } from "react";

const defaultWallets: IDefaultWallet[] = [
  {
    name: "Razor Wallet",
    label: "Razor Wallet",
    iconUrl: "https://razorwallet.xyz/favicon.ico",
    downloadUrl: {
      browserExtension: "https://razorwallet.xyz"
    }
  }
];

export const WalletProvider = ({ children }: PropsWithChildren) => {
  return (
    <RazorWalletProvider
      defaultWallets={defaultWallets}
    >
      {children}
    </RazorWalletProvider>
  );
};