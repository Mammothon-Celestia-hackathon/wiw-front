"use client";

import { AptosWalletAdapterProvider } from "@aptos-labs/wallet-adapter-react";
import { PropsWithChildren } from "react";
import { useToast } from "@/components/ui/use-toast";
import { useAutoConnect } from "@/components/AutoConnectProvider";
import { Network } from "@aptos-labs/ts-sdk";
import { OKXWallet } from "@okwallet/aptos-wallet-adapter";

export const WalletProvider = ({ children }: PropsWithChildren) => {
  const { autoConnect } = useAutoConnect();
  const { toast } = useToast();

  const wallets = [new OKXWallet()];

  return (
    <AptosWalletAdapterProvider
      plugins={wallets}
      autoConnect={autoConnect}
      optInWallets={["Petra"]}
      dappConfig={{
        network: Network.TESTNET,
        aptosApiKey: "AG-6C3WCSTMXCS1F4D9EBABULHCXKFDSXXWM",
      }}
      onError={(error) => {
        toast({
          variant: "destructive",
          title: "Error",
          description: error || "Unknown wallet error",
        });
      }}
    >
      {children}
    </AptosWalletAdapterProvider>
  );
};
