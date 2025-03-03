'use client';

import { useEffect, useState } from 'react';
import { AptosClient } from 'aptos';
import { Button } from '@/components/ui/button';
import { useToast } from '@/components/ui/use-toast';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import { Wallet, Trophy, Timer, History, Vote, Coins } from 'lucide-react';
import { Heading } from "@/components/ui/heading";
import { cn } from "@/lib/utils";

interface AIAgent {
  name: string;
  character: string;
  address: string;
}

interface Debate {
  id: number;
  name: string;
  topic: string;
  creator: string;
  ai_a: AIAgent;
  ai_b: AIAgent;
  total_pool: number;
  ai_a_pool: number;
  ai_b_pool: number;
  winner: number;
  is_finished: boolean;
}

interface BetInfo {
  game_id: number;
  amount: number;
  choice: number;
  claimed: boolean;
}

const client = new AptosClient('https://aptos.testnet.bardock.movementlabs.xyz');
const CONTRACT_ADDRESS = '0xd7ae4e1e8d4486450936d8fdbb93af0cba8e1ae00c00f82653f76c5d65d76a6f';

export const MyBetCard = () => {
  const [betInfo, setBetInfo] = useState<BetInfo | null>(null);
  const [canClaim, setCanClaim] = useState(false);
  const { toast } = useToast();

  useEffect(() => {
    const fetchBetInfo = async () => {
      if (!window.aptos) return;

      try {
        const { address } = await window.aptos.connect();
        
        // Get bet info
        const betInfoResponse = await client.view({
          function: `${CONTRACT_ADDRESS}::ai_debate_v4::get_bet_info`,
          type_arguments: [],
          arguments: [address]
        });

        const betInfo = {
          game_id: Number(betInfoResponse[0].game_id),
          amount: Number(betInfoResponse[0].amount),
          choice: Number(betInfoResponse[0].choice),
          claimed: betInfoResponse[0].claimed
        };
        setBetInfo(betInfo);

        // Check if can claim
        const canClaimResponse = await client.view({
          function: `${CONTRACT_ADDRESS}::ai_debate_v4::can_claim_rewards`,
          type_arguments: [],
          arguments: [address, betInfo.game_id.toString()]
        });

        setCanClaim(canClaimResponse[0]);

      } catch (error) {
        console.error('Error fetching bet info:', error);
        toast({
          variant: 'destructive',
          title: "Failed to fetch bet information"
        });
      }
    };

    fetchBetInfo();
  }, []);

  const handleWithdraw = async () => {
    if (!window.aptos || !betInfo) return;

    try {
      const transaction = {
        payload: {
          type: "entry_function_payload",
          function: `${CONTRACT_ADDRESS}::ai_debate_v4::withdraw_winnings`,
          type_arguments: [],
          arguments: [betInfo.game_id.toString()]
        }
      };

      const response = await window.aptos.signAndSubmitTransaction(transaction);
      console.log('Withdraw response:', response);
      toast({ title: "Successfully withdrawn rewards" });
    } catch (error) {
      console.error('Error withdrawing:', error);
      toast({
        variant: 'destructive',
        title: "Failed to withdraw rewards"
      });
    }
  };

  return (
    <div className="flex-col">
      <div className="flex-1 space-y-4 p-8 pt-16">
        <div className="flex items-center justify-between">
          <Heading
            title="Betting History"
            description="View and manage your bets in AI debates"
            // icon={History}
          />
        </div>

        <div className="grid grid-cols-1 gap-6">
          {!betInfo ? (
            <Card className="mt-6 max-w-md">
              <CardHeader className="text-center">
                <CardTitle className="text-xl font-semibold">No Active Bets</CardTitle>
                <CardDescription>
                  {"You haven't placed any bets yet. Join a debate to get started!"}
                </CardDescription>
              </CardHeader>
            </Card>
          ) : (
            <Card className="mt-6 max-w-md">
              <CardHeader>
                <div className="flex items-center justify-between">
                  <div>
                    <CardTitle className="text-xl font-semibold">Active Bet Details</CardTitle>
                    <CardDescription>Your current betting position and status</CardDescription>
                  </div>
                  <Badge 
                    variant={betInfo.claimed ? "secondary" : "default"}
                    className={cn(
                      "text-sm py-1.5 px-3",
                      betInfo.claimed 
                        ? "bg-gray-100 text-gray-500" 
                        : "bg-gradient-to-r from-green-500/20 to-emerald-500/20 text-green-700 border-green-200"
                    )}
                  >
                    <div className="flex items-center gap-1.5">
                      {betInfo.claimed ? 'Claimed' : 'Unclaimed'}
                    </div>
                  </Badge>
                </div>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="grid gap-4">
                  <div className="flex items-center justify-between p-4 bg-muted/50 rounded-lg border border-border/50">
                    <div className="flex items-center gap-2">
                      <Trophy className="h-5 w-5 text-amber-500" />
                      <span className="text-muted-foreground">Game ID</span>
                    </div>
                    <span className="font-medium">#{betInfo.game_id}</span>
                  </div>

                  <div className="flex items-center justify-between p-4 bg-muted/50 rounded-lg border border-border/50">
                    <div className="flex items-center gap-2">
                      <Wallet className="h-5 w-5 text-emerald-500" />
                      <span className="text-muted-foreground">Bet Amount</span>
                    </div>
                    <span className="font-medium">{betInfo.amount / 100000000} MOVE</span>
                  </div>

                  <div className="flex items-center justify-between p-4 bg-muted/50 rounded-lg border border-border/50">
                    <div className="flex items-center gap-2">
                      <Vote className="h-5 w-5 text-blue-500" />
                      <span className="text-muted-foreground">Your Choice</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <Badge 
                        variant="outline" 
                        className={cn(
                          "font-medium px-4 py-2 transition-all",
                          betInfo.choice === 1 
                            ? "bg-gradient-to-r from-blue-500/10 via-indigo-500/10 to-purple-500/10 text-blue-700 border-blue-200 shadow-sm shadow-blue-100" 
                            : "bg-gradient-to-r from-red-500/10 via-orange-500/10 to-amber-500/10 text-red-700 border-red-200 shadow-sm shadow-red-100"
                        )}
                      >
                        <div className="flex items-center gap-1.5">
                          <span className="font-bold">AI</span>
                          <span className="font-bold">{betInfo.choice === 1 ? 'A' : 'B'}</span>
                        </div>
                      </Badge>
                    </div>
                  </div>
                </div>

                <Separator className="my-6" />

                <div className="space-y-3">
                  <Button 
                    className={cn(
                      "w-full transition-all duration-500",
                      canClaim && !betInfo.claimed 
                        ? "bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500 hover:from-indigo-600 hover:via-purple-600 hover:to-pink-600 shadow-lg hover:shadow-xl hover:scale-[1.02] animate-[customPulse_17s_ease-in-out_infinite]" 
                        : "bg-gray-100"
                    )}
                    size="lg"
                    variant={canClaim && !betInfo.claimed ? "default" : "secondary"}
                    disabled={!canClaim || betInfo.claimed}
                    onClick={handleWithdraw}
                  >
                    <div className="flex items-center justify-center gap-2 py-1">
                      {betInfo.claimed ? (
                        <>
                          <Coins className="h-5 w-5" />
                          <span>Already Claimed</span>
                        </>
                      ) : canClaim ? (
                        <>
                          <span className="font-bold text-lg">
                            Claim Your Rewards Now! 🎉
                          </span>
                        </>
                      ) : (
                        <>
                          <Coins className="h-5 w-5" />
                          <span>Cannot Claim Yet</span>
                        </>
                      )}
                    </div>
                  </Button>
                  {!betInfo.claimed && !canClaim && (
                    <p className="text-sm text-center text-muted-foreground">
                      You can claim your rewards once the debate is finished<br />
                      and if you bet on the winning side
                    </p>
                  )}
                  {canClaim && !betInfo.claimed && (
                    <div className="text-center space-y-1 bg-indigo-50 rounded-lg p-3 border border-indigo-100">
                      <p className="text-sm font-medium text-indigo-600">
                        Congratulations! You bet on the winning side! 🎊
                      </p>
                      <p className="text-xs text-indigo-500">
                        {"Don't miss out - claim your rewards now!"}
                      </p>
                    </div>
                  )}
                </div>
              </CardContent>
            </Card>
          )}
        </div>
      </div>
    </div>
  );
}; 