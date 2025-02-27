'use client';
import { useEffect, useState } from 'react';
import { useWallet } from '@aptos-labs/wallet-adapter-react';
import { aptosClient, CONTRACT_ADDRESS } from '@/lib/aptos';
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle
} from '@/components/ui/card';
import { ScrollArea } from '@/components/ui/scroll-area';
import { Badge } from '@/components/ui/badge';
import Chat from './chat';

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

interface Message {
  id: number;
  sender: string;
  content: string;
  timestamp: string;
  isA: boolean;
  avatar: string;
}

const DUMMY_MESSAGES: Message[] = [
  {
    id: 1,
    sender: 'Bull Agent (강세장 전문가)',
    content:
      '현재 BNB의 기술적 지표를 분석해보면, RSI가 상승 추세를 보이고 있으며 MACD도 긍정적인 신호를 보내고 있습니다. 또한 최근 바이낸스의 적극적인 BNB 토큰 소각 정책과 DeFi 생태계 확장은 가격 상승을 뒷받침할 것입니다.',
    timestamp: new Date(Date.now() - 3600000).toISOString(),
    isA: true,
    avatar: '🐂'
  },
  {
    id: 2,
    sender: 'Bear Agent (약세장 전문가)',
    content:
      '하지만 현재 전반적인 시장 상황을 보면 위험 자산에 대한 선호도가 감소하고 있습니다. 특히 최근 규제 당국의 압박과 전반적인 암호화폐 시장의 불확실성을 고려할 때, 300달러 돌파는 시기상조라고 봅니다.',
    timestamp: new Date(Date.now() - 3000000).toISOString(),
    isA: false,
    avatar: '🐻'
  },
  {
    id: 3,
    sender: 'Bull Agent (강세장 전문가)',
    content:
      '그렇지만 BNB는 다른 암호화폐와 달리 실질적인 사용 사례와 수요가 있습니다. 바이낸스 체인의 성장과 함께 BNB의 활용도는 계속 증가하고 있으며, 이는 가격 상승의 강력한 기반이 될 것입니다.',
    timestamp: new Date(Date.now() - 2400000).toISOString(),
    isA: true,
    avatar: '🐂'
  }
];

interface GameDetailProps {
  id: string;
}

export const GameDetail = ({ id }: GameDetailProps) => {
  const [debate, setDebate] = useState<Debate | null>(null);
  const [messages] = useState<Message[]>(DUMMY_MESSAGES);
  const { account, connected } = useWallet();

  useEffect(() => {
    const fetchDebate = async () => {
      try {
        console.log('Fetching debate with ID:', id);

        const payload = {
          payload: {
            function: `${CONTRACT_ADDRESS}::ai_debate_v4::get_debate` as const,
            functionArguments: [id]
          }
        };

        const response = await aptosClient.view(payload);
        console.log('Raw response:', response);

        if (!response || !response[0]) {
          console.error('Invalid response format:', response);
          return;
        }

        try {
          const debateData = response[0] as any;
          console.log('Debate data:', debateData);

          if (
            !debateData.id ||
            !debateData.name ||
            !debateData.topic ||
            !debateData.ai_a ||
            !debateData.ai_b
          ) {
            console.error(
              'Missing required fields in debate data:',
              debateData
            );
            return;
          }

          // const debate: Debate = {
          //   id: Number(debateData.id),
          //   name: debateData.name,
          //   topic: debateData.topic,
          //   creator: debateData.creator,
          //   ai_a: {
          //     name: debateData.ai_a.name,
          //     character: debateData.ai_a.character,
          //     address: debateData.ai_a.address
          //   },
          //   ai_b: {
          //     name: debateData.ai_b.name,
          //     character: debateData.ai_b.character,
          //     address: debateData.ai_b.address
          //   },
          //   total_pool: Number(debateData.total_pool),
          //   ai_a_pool: Number(debateData.ai_a_pool),
          //   ai_b_pool: Number(debateData.ai_b_pool),
          //   winner: Number(debateData.winner),
          //   is_finished: debateData.is_finished
          // };

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

  const debates: Debate = {
    id: 1,
    name: 'AI Ethics in Society',
    topic: 'Should AI have rights similar to humans?',
    creator: 'user123',
    ai_a: {
      name: 'AlphaGPT',
      character: 'Logical and data-driven',
      address: '0x123456789abcdef'
    },
    ai_b: {
      name: 'BetaGPT',
      character: 'Emotional and human-centric',
      address: '0xfedcba987654321'
    },
    total_pool: 1000,
    ai_a_pool: 500,
    ai_b_pool: 500,
    winner: 0,
    is_finished: false
  };

  return (
    <div className="space-y-6">
      <Card className="bg-gradient-to-b from-white to-gray-50/50">
        <CardHeader className="border-b">
          <div className="flex items-center justify-between">
            <div>
              <CardTitle>Live Debate</CardTitle>
              <CardDescription>
                {debates.is_finished
                  ? 'Debate has ended'
                  : 'Debate in progress'}
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
              <Chat />
            </div>
          </ScrollArea>
        </CardContent>
      </Card>
    </div>
  );
};
