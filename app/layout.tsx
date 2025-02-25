'use client'
import { WalletProvider } from "@/app/provider/WalletProvider";
import { Toaster } from '@/components/ui/toaster';
import '@uploadthing/react/styles.css';
import type { Metadata } from 'next';
import NextTopLoader from 'nextjs-toploader';
import { Inter } from 'next/font/google';
import { ApolloWrapper } from "@/lib/apollo-wrapper";
import './globals.css';
import { SidebarProvider } from "@/components/ui/sidebar";
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
        <WalletProvider>
          <NextTopLoader />
          <ApolloWrapper>
            <QueryClientProvider client={queryClient}>
               <Toaster />
            {children}
            </QueryClientProvider>
         
            
          </ApolloWrapper>
        </WalletProvider>
      </body>
    </html>
  );
}
