'use client';
import { AptosClient } from 'aptos';
import { useEffect, useState } from 'react';
import { useWallet } from "@aptos-labs/wallet-adapter-react";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import { Button } from "@/components/ui/button";
import { useToast } from "@/components/ui/use-toast";
import { Badge } from "@/components/ui/badge"
import { Input } from "@/components/ui/input";

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

const client = new AptosClient('https://testnet.aptoslabs.com');

interface GameDetailProps {
  id: string;
}

export const DebateVote = ({ id }: GameDetailProps) => {
  const [debate, setDebate] = useState<Debate | null>(null);
  const [betAmount, setBetAmount] = useState<string>("");
  const { account, connected } = useWallet();
  const { toast } = useToast();
  const CONTRACT_ADDRESS = '0x18693562f4ced0fd77d6b42416003a5945d15358431fbff2b9af0e4b0759d261';
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const fetchDebate = async () => {
      try {
        console.log('Fetching debate with ID:', id);
        
        const response = await client.view({
          function: `${CONTRACT_ADDRESS}::ai_debate_v4::get_debate`,
          type_arguments: [],
          arguments: [id]
        });
        
        console.log('Raw response:', response);
        
        if (!response || !response[0]) {
          console.error('Invalid response format:', response);
          return;
        }

        try {
          const debateData = response[0] as any;
          console.log('Debate data:', debateData);
          
          // 데이터 구조 검증
          if (!debateData.id || !debateData.name || !debateData.topic || !debateData.ai_a || !debateData.ai_b) {
            console.error('Missing required fields in debate data:', debateData);
            return;
          }

          const debate: Debate = {
            id: Number(debateData.id),
            name: debateData.name,
            topic: debateData.topic,
            creator: debateData.creator,
            ai_a: {
              name: debateData.ai_a.name,
              character: debateData.ai_a.character,
              address: debateData.ai_a.address
            },
            ai_b: {
              name: debateData.ai_b.name,
              character: debateData.ai_b.character,
              address: debateData.ai_b.address
            },
            total_pool: Number(debateData.total_pool),
            ai_a_pool: Number(debateData.ai_a_pool),
            ai_b_pool: Number(debateData.ai_b_pool),
            winner: Number(debateData.winner),
            is_finished: debateData.is_finished
          };
          
          console.log('Transformed debate:', debate);
          setDebate(debate);
        } catch (parseError) {
          console.error('Error parsing debate data:', parseError);
          console.error('Raw debate data:', response[0]);
        }
      } catch (error) {
        console.error('Error fetching debate:', error);
        if (error instanceof Error) {
          console.error('Error message:', error.message);
          console.error('Error stack:', error.stack);
        }
      }
    };

    if (id) {
      fetchDebate();
    }
  }, [id]);

  const handleVote = async (choice: number) => {
    if (!connected || !account) {
      toast({
        variant: "destructive",
        title: "지갑을 연결해주세요",
      });
      return;
    }

    if (!betAmount || isNaN(Number(betAmount)) || Number(betAmount) <= 0) {
      toast({
        variant: "destructive",
        title: "올바른 베팅 금액을 입력해주세요",
      });
      return;
    }

    try {
      setLoading(true);
      const amount = Number(betAmount) * 100000000; // Convert APT to Octas
      
      const payload = {
        type: "entry_function_payload",
        function: `${CONTRACT_ADDRESS}::ai_debate_v4::place_bet`,
        type_arguments: [],
        arguments: [debate?.id || 0, amount, choice]
      };

      await window.aptos?.signAndSubmitTransaction(payload);
      
      const response = await client.view({
        function: `${CONTRACT_ADDRESS}::ai_debate_v4::get_debate`,
        type_arguments: [],
        arguments: [parseInt(id)]
      });
      
      if (response && response[0]) {
        setDebate(response[0] as Debate);
        setBetAmount(""); // 베팅 성공 후 입력값 초기화
      }
      
      toast({ title: "투표 성공" });
    } catch (error) {
      console.error('Error voting:', error);
      toast({ variant: 'destructive', title: "투표 실패" });
    } finally {
      setLoading(false);
    }
  };

  if (!debate) return <div>Loading game details...</div>;

  return (
    <div className="space-y-6">
      <div className="space-y-6">
        <h1 className="mb-5 scroll-m-20 text-3xl font-extrabold tracking-tight lg:text-3xl">
          {debate?.topic}
        </h1>

        <div className="flex space-x-6">
          <Badge className="text-xs bg-white text-F7F8F8 rounded-3xl p-1.5 px-5">
            {debate.is_finished ? "Finished" : "Live"}
          </Badge>
        </div>
      </div>

      <div className="grid grid-cols-2 gap-6">
        <Card className="bg-gradient-to-br from-[#00A29A]/5 to-transparent border-[#00A29A]/20">
          <CardHeader>
            <div className="flex items-center space-x-3">
              <div className="w-12 h-12 rounded-full bg-[#00A29A]/10 flex items-center justify-center text-2xl">
                🐂
              </div>
              <div>
                <CardTitle className="text-[#00A29A]">
                  {debate.ai_a.address.slice(0, 6)}...{debate.ai_a.address.slice(-4)}
                </CardTitle>
                <CardDescription>
                  {Number(debate.ai_a_pool) / 100000000} APT Staked
                </CardDescription>
              </div>
            </div>
          </CardHeader>
          <CardContent className="space-y-4">
            <Input
              type="number"
              placeholder="베팅 금액 (APT)"
              value={betAmount}
              onChange={(e) => setBetAmount(e.target.value)}
              disabled={debate.is_finished}
            />
            <Button 
              className="w-full bg-[#00A29A] hover:bg-[#00A29A]/90"
              onClick={() => handleVote(1)}
              disabled={debate.is_finished || loading}
            >
              Vote A
            </Button>
          </CardContent>
        </Card>

        <Card className="bg-gradient-to-br from-[#C73535]/5 to-transparent border-[#C73535]/20">
          <CardHeader>
            <div className="flex items-center space-x-3">
              <div className="w-12 h-12 rounded-full bg-[#C73535]/10 flex items-center justify-center text-2xl">
                🐻
              </div>
              <div>
                <CardTitle className="text-[#C73535]">
                  {debate.ai_b.address.slice(0, 6)}...{debate.ai_b.address.slice(-4)}
                </CardTitle>
                <CardDescription>
                  {Number(debate.ai_b_pool) / 100000000} APT Staked
                </CardDescription>
              </div>
            </div>
          </CardHeader>
          <CardContent className="space-y-4">
            <Input
              type="number"
              placeholder="베팅 금액 (APT)"
              value={betAmount}
              onChange={(e) => setBetAmount(e.target.value)}
              disabled={debate.is_finished}
            />
            <Button 
              className="w-full bg-[#C73535] hover:bg-[#C73535]/90"
              onClick={() => handleVote(2)}
              disabled={debate.is_finished || loading}
            >
              Vote B
            </Button>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};
