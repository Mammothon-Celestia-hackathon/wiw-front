'use client';
import { useRouter } from 'next/navigation';
import { AptosClient } from 'aptos';
import { useEffect, useState } from 'react';
import { CONTRACT_ADDRESS } from '@/lib/aptos';
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle
} from '@/components/ui/card';
import { Button } from '@/components/ui/button';

interface Debate {
  id: number;
  creator: string;
  topic: string;
  ai_a: string;
  ai_b: string;
  total_pool: number;
  ai_a_pool: number;
  ai_b_pool: number;
  end_time: number;
  winner: number;
  is_finished: boolean;
}

const client = new AptosClient('https://testnet.aptoslabs.com');

export const GameListContract = () => {
  const router = useRouter();
  const [debates, setDebates] = useState<Debate[]>([]);
  const CONTRACT_ADDRESS = '0x18693562f4ced0fd77d6b42416003a5945d15358431fbff2b9af0e4b0759d261'

  useEffect(() => {
    const fetchDebates = async () => {
      try {
        const resource = await client.getAccountResource(
          CONTRACT_ADDRESS,
          `${CONTRACT_ADDRESS}::ai_debate::DebateStore`
        );
        
        const debateStore = (resource.data as any).debates;
        setDebates(debateStore);
      } catch (error) {
        console.error('Error fetching debates:', error);
      }
    };

    fetchDebates();
  }, []);

  const getTimeLeft = (endTime: number) => {
    const now = Math.floor(Date.now() / 1000);
    const timeLeft = endTime - now;
    if (timeLeft <= 0) return '종료됨';
    
    const hours = Math.floor(timeLeft / 3600);
    const minutes = Math.floor((timeLeft % 3600) / 60);
    return `${hours}시간 ${minutes}분 남음`;
  };

  return (
    <div>
      <h2 className="text-2xl font-bold mb-4">컨트랙트 데이터</h2>
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
        {debates.map((debate: Debate) => (
          <Card key={debate.id} className="cursor-pointer hover:shadow-lg transition-shadow">
            <CardHeader>
              <CardTitle>{debate.topic}</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-2">
                <div className="flex justify-between">
                  <span>상태</span>
                  <span>{debate.is_finished ? '종료됨' : getTimeLeft(debate.end_time)}</span>
                </div>
                <div className="flex justify-between">
                  <span>AI A ({debate.ai_a})</span>
                  <span>{Number(debate.ai_a_pool) / 100000000} APT</span>
                </div>
                <div className="flex justify-between">
                  <span>AI B ({debate.ai_b})</span>
                  <span>{Number(debate.ai_b_pool) / 100000000} APT</span>
                </div>
                <div className="flex justify-between">
                  <span>총 베팅</span>
                  <span>{Number(debate.total_pool) / 100000000} APT</span>
                </div>
                {debate.is_finished && debate.winner !== 0 && (
                  <div className="flex justify-between text-green-600">
                    <span>승자</span>
                    <span>{debate.winner === 1 ? debate.ai_a : debate.ai_b}</span>
                  </div>
                )}
                <Button 
                  className="w-full mt-4"
                  onClick={() => router.push(`/games/${debate.id}`)}
                  disabled={debate.is_finished}
                >
                  {debate.is_finished ? '종료된 게임' : '참여하기'}
                </Button>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
}; 