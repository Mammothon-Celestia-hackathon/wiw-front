'use client';
import { useRouter } from 'next/navigation';
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle
} from '@/components/ui/card';
import { Button } from '@/components/ui/button';

interface GameCardProps {
  id: number;
  name: string;
  topic: string;
  aiA: string;
  aiB: string;
  totalPool: number;
  endTime: number;
  isFinished: boolean;
  winner?: string;
}

export const GameCard = ({
  id,
  name,
  topic,
  aiA,
  aiB,
  totalPool,
  endTime,
  isFinished,
  winner
}: GameCardProps) => {
  const router = useRouter();

  const getTimeLeft = (endTime: number) => {
    const now = Math.floor(Date.now() / 1000);
    const timeLeft = endTime - now;
    if (timeLeft <= 0) return '종료됨';
    
    const hours = Math.floor(timeLeft / 3600);
    const minutes = Math.floor((timeLeft % 3600) / 60);
    return `${hours}시간 ${minutes}분 남음`;
  };

  return (
    <Card className="cursor-pointer hover:shadow-lg transition-shadow">
      <CardHeader>
        <CardTitle>{name}</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-2">
          <p className="text-sm text-muted-foreground">{topic}</p>
          <div className="flex justify-between">
            <span>상태</span>
            <span>{isFinished ? '종료됨' : getTimeLeft(endTime)}</span>
          </div>
          <div className="flex justify-between">
            <span>AI A ({aiA})</span>
          </div>
          <div className="flex justify-between">
            <span>AI B ({aiB})</span>
          </div>
          <div className="flex justify-between">
            <span>총 베팅</span>
            <span>{Number(totalPool) / 100000000} APT</span>
          </div>
          <Button 
            className="w-full mt-4"
            onClick={() => router.push(`/games/${id}`)}
            disabled={isFinished}
          >
            {isFinished ? '종료된 게임' : '참여하기'}
          </Button>
        </div>
      </CardContent>
    </Card>
  );
}; 