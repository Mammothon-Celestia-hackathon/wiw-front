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
import { ScrollArea } from "@/components/ui/scroll-area";
import { Badge } from "@/components/ui/badge";
import Chat from './chat';

interface AIAgent {
  name: string;
  character: string;
  address: string;
}

interface Debate {
  id: number;
  topic: string;
  creator: string;
  ai_a: AIAgent;
  ai_b: AIAgent;
  total_pool: number;
  ai_a_pool: number;
  ai_b_pool: number;
  end_time: number;
  winner: number;
  is_finished: boolean;
}

interface Message {
  id: number;
  sender: string;
  content: string;
  timestamp: string;
  isA: boolean;
  avatar: string;
}

const client = new AptosClient('https://testnet.aptoslabs.com');

const DUMMY_MESSAGES: Message[] = [
  {
    id: 1,
    sender: "Bull Agent (강세장 전문가)",
    content: "현재 BNB의 기술적 지표를 분석해보면, RSI가 상승 추세를 보이고 있으며 MACD도 긍정적인 신호를 보내고 있습니다. 또한 최근 바이낸스의 적극적인 BNB 토큰 소각 정책과 DeFi 생태계 확장은 가격 상승을 뒷받침할 것입니다.",
    timestamp: new Date(Date.now() - 3600000).toISOString(),
    isA: true,
    avatar: "🐂"
  },
  {
    id: 2,
    sender: "Bear Agent (약세장 전문가)",
    content: "하지만 현재 전반적인 시장 상황을 보면 위험 자산에 대한 선호도가 감소하고 있습니다. 특히 최근 규제 당국의 압박과 전반적인 암호화폐 시장의 불확실성을 고려할 때, 300달러 돌파는 시기상조라고 봅니다.",
    timestamp: new Date(Date.now() - 3000000).toISOString(),
    isA: false,
    avatar: "🐻"
  },
  {
    id: 3,
    sender: "Bull Agent (강세장 전문가)",
    content: "그렇지만 BNB는 다른 암호화폐와 달리 실질적인 사용 사례와 수요가 있습니다. 바이낸스 체인의 성장과 함께 BNB의 활용도는 계속 증가하고 있으며, 이는 가격 상승의 강력한 기반이 될 것입니다.",
    timestamp: new Date(Date.now() - 2400000).toISOString(),
    isA: true,
    avatar: "🐂"
  },
];

interface GameDetailProps {
  id: string;
}

export const GameDetail = ({ id }: GameDetailProps) => {
  const [debate, setDebate] = useState<Debate | null>(null);
  const [messages] = useState<Message[]>(DUMMY_MESSAGES);
  const { account, connected } = useWallet();
  const CONTRACT_ADDRESS = '0x18693562f4ced0fd77d6b42416003a5945d15358431fbff2b9af0e4b0759d261';

  useEffect(() => {
    const fetchDebate = async () => {
      try {
        console.log('Fetching debate with ID:', id);
        
        const response = await client.view({
          function: `${CONTRACT_ADDRESS}::ai_debate_v2::get_debate`,
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
          if (!debateData.id || !debateData.topic || !debateData.ai_a || !debateData.ai_b) {
            console.error('Missing required fields in debate data:', debateData);
            return;
          }

          const debate: Debate = {
            id: Number(debateData.id),
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
            end_time: Number(debateData.end_time),
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

  const getTimeLeft = (endTime: number) => {
    const now = Math.floor(Date.now() / 1000);
    const timeLeft = endTime - now;
    if (timeLeft <= 0) return '종료됨';
    
    const hours = Math.floor(timeLeft / 3600);
    const minutes = Math.floor((timeLeft % 3600) / 60);
    return `${hours}시간 ${minutes}분 남음`;
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
            {getTimeLeft(debate.end_time)}
          </Badge>
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
        </Card>
      </div>

      <Card className="bg-gradient-to-b from-white to-gray-50/50">
        <CardHeader className="border-b">
          <div className="flex items-center justify-between">
            <div>
              <CardTitle>Live Debate</CardTitle>
              <CardDescription>
                {debate.is_finished ? "Debate has ended" : "Debate in progress"}
              </CardDescription>
            </div>
            <Badge variant="outline" className="px-3 py-1">
              {messages.length} messages
            </Badge>
          </div>
        </CardHeader>
        <CardContent className="p-0">
          <ScrollArea className="h-full">
            <div className="space-y-6 p-6">
              {/* {messages.map((message, index) => (
                <div 
                  key={message.id}
                  className={`flex ${message.isA ? 'justify-start' : 'justify-end'} group`}
                >
                  <div className={`flex ${message.isA ? 'flex-row' : 'flex-row-reverse'} items-end max-w-[80%] space-x-2`}>
                    {message.isA ? (
                      <>
                        <div className="w-8 h-8 rounded-full bg-[#00A29A]/10 flex items-center justify-center shrink-0">
                          {message.avatar}
                        </div>
                        <div>
                          <div className="bg-[#00A29A]/10 rounded-2xl rounded-bl-none px-4 py-2">
                            <p className="text-sm">{message.content}</p>
                          </div>
                          <span className="text-xs text-muted-foreground mt-1 ml-2">
                            {new Date(message.timestamp).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                          </span>
                        </div>
                      </>
                    ) : (
                      <>
                        <div>
                          <div className="bg-[#C73535]/10 rounded-2xl rounded-br-none px-4 py-2">
                            <p className="text-sm">{message.content}</p>
                          </div>
                          <span className="text-xs text-muted-foreground mt-1 mr-2 text-right block">
                            {new Date(message.timestamp).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                          </span>
                        </div>
                        <div className="w-8 h-8 rounded-full bg-[#C73535]/10 flex items-center justify-center shrink-0">
                          {message.avatar}
                        </div>
                      </>
                    )}
                  </div>
                </div>
              ))} */}
              <Chat/>
            </div>
          </ScrollArea>
        </CardContent>
      </Card>
    </div>
  );
};
