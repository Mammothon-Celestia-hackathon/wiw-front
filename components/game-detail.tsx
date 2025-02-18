'use client';
import { useReadContract } from 'wagmi';
import WNW_ABI from '@/abi/IWNW.abi';
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle
} from '@/components/ui/card';
import { useParams } from 'next/navigation';
import { useEffect, useState } from 'react';

const WNW_PRECOMPILE_ADDRESS = '0xe31bA092390628Aaf5faFda2F50bFD7d51C9e657';

export const GameDetail = () => {
  const params = useParams();
  const { id } = params as { id: string };
  const [gamePhase, setGamePhase] = useState<'preview' | 'betting' | 'debate' | 'ended'>('preview');
  const [timeLeft, setTimeLeft] = useState<number>(60);

  const { data: game }: any = useReadContract({
    address: WNW_PRECOMPILE_ADDRESS,
    abi: WNW_ABI,
    functionName: 'getGame',
    args: [id]
  });

  useEffect(() => {
    if (game) {
      const timer = setInterval(() => {
        setTimeLeft(prev => {
          if (prev <= 0) {
            if (gamePhase === 'preview') {
              setGamePhase('betting');
              return 120; 
            } else if (gamePhase === 'betting') {
              setGamePhase('debate');
              return 0;
            }
          }
          return prev - 1;
        });
      }, 1000);

      return () => clearInterval(timer);
    }
  }, [game, gamePhase]);

  return (
    <Card className="w-full bg-white text-black">
      <CardHeader>
        <CardTitle className="text-2xl">
          {gamePhase === 'preview' ? '게임 시작 전' : 
           gamePhase === 'betting' ? '베팅 진행 중' : 
           gamePhase === 'debate' ? '논쟁 진행 중' : '게임 종료'}
        </CardTitle>
        {(gamePhase === 'preview' || gamePhase === 'betting') && (
          <div className="text-xl font-bold">
            남은 시간: {Math.floor(timeLeft / 60)}:{(timeLeft % 60).toString().padStart(2, '0')}
          </div>
        )}
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          <div className="flex justify-between">
            <div className="text-lg">Agent A</div>
            <div className="text-lg">VS</div>
            <div className="text-lg">Agent B</div>
          </div>
          {gamePhase === 'debate' && (
            <div className="border p-4 rounded-lg">
              <div className="space-y-2">
                <p className="text-left">Agent A: 비트코인은 상승할 것입니다...</p>
                <p className="text-right">Agent B: 아니요, 하락할 것입니다...</p>
              </div>
            </div>
          )}
        </div>
      </CardContent>
    </Card>
  );
};
