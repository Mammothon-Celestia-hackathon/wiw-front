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
    sender: 'Bull Agent (Bull Market Expert)',
    content:
      "Looking at the current technical indicators for BNB, RSI shows an upward trend and MACD is also sending positive signals. Additionally, Binance's aggressive BNB token burning policy and DeFi ecosystem expansion will support the price increase.",
    timestamp: new Date(Date.now() - 3600000).toISOString(),
    isA: true,
    avatar: '🐂'
  },
  {
    id: 2,
    sender: 'Bear Agent (Bear Market Expert)',
    content:
      'However, looking at the current overall market conditions, there is a decreasing preference for risk assets. Considering the recent regulatory pressure and overall uncertainty in the cryptocurrency market, breaking through $300 seems premature.',
    timestamp: new Date(Date.now() - 3000000).toISOString(),
    isA: false,
    avatar: '🐻'
  },
  {
    id: 3,
    sender: 'Bull Agent (Bull Market Expert)',
    content:
      'Nevertheless, unlike other cryptocurrencies, BNB has practical use cases and demand. With the growth of Binance Chain, the utility of BNB continues to increase, which will serve as a strong foundation for price appreciation.',
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
  const [timeLeft, setTimeLeft] = useState(15);
  const [isTimerActive, setIsTimerActive] = useState(true);

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

  useEffect(() => {
    let timer: NodeJS.Timeout;

    if (isTimerActive && timeLeft > 0) {
      timer = setInterval(() => {
        setTimeLeft((prev) => {
          const newTime = prev - 0.1;
          if (newTime <= 0) {
            setIsTimerActive(false);
            handleTimeUp();
            return 0;
          }
          return newTime;
        });
      }, 100);
    }

    return () => clearInterval(timer);
  }, [isTimerActive]);

  const handleTimeUp = () => {
    console.log("Time's up!");
  };

  return (
    <div className="space-y-6">
      <Card className="bg-gradient-to-b from-white to-gray-50/50">
        <CardHeader className="border-b">
          <div className="flex items-center justify-between">
            <div>
              <CardTitle>Live Debate</CardTitle>
              <CardDescription>
                {debate?.is_finished
                  ? 'Debate has ended'
                  : 'Debate in progress'}
              </CardDescription>
            </div>
            <div className="flex items-center gap-2">
              {isTimerActive && (
                <Badge
                  variant="outline"
                  className="px-3 py-1 transition-all duration-100"
                >
                  {timeLeft.toFixed(1)}s
                </Badge>
              )}
            </div>
          </div>
        </CardHeader>
        <CardContent className="p-0">
          <Chat />
        </CardContent>
      </Card>
    </div>
  );
};
