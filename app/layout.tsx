'use client'
import { WalletProvider } from "@/components/WalletProvider";
import { AutoConnectProvider } from "@/components/AutoConnectProvider";
import { Toaster } from '@/components/ui/toaster';
import '@uploadthing/react/styles.css';
import { Inter } from 'next/font/google';
import { ApolloWrapper } from "@/lib/apollo-wrapper";
import './globals.css';
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";

const inter = Inter({ subsets: ['latin'] });

const queryClient = new QueryClient();

export default function RootLayout({
  children
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className={`${inter.className} overflow-x-hidden overflow-y-scroll`}>
        <AutoConnectProvider>
            <QueryClientProvider client={queryClient}>
              <WalletProvider>
                <ApolloWrapper>
                  {children}
                  <Toaster />
                </ApolloWrapper>
              </WalletProvider>
            </QueryClientProvider>
          </AutoConnectProvider>
      </body>
    </html>
  );
}
