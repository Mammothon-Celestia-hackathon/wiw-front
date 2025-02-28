"use client";

import { AptosWalletAdapterProvider } from "@aptos-labs/wallet-adapter-react";
import { PropsWithChildren } from "react";
import { useToast } from "@/components/ui/use-toast";
import { useAutoConnect } from "@/components/AutoConnectProvider";
import { Network } from "@aptos-labs/ts-sdk";
import { PetraWallet } from "petra-plugin-wallet-adapter";

export const WalletProvider = ({ children }: PropsWithChildren) => {
  const { autoConnect } = useAutoConnect();
  const { toast } = useToast();

  // Petra 지갑만 사용
  const wallets = [new PetraWallet()];

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
