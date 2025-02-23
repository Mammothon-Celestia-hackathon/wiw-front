'use client';
import { useQuery } from '@apollo/client';
import { GET_GAME_DETAIL } from '@/src/data/query';
import type { GameDetail as IGameDetail, GameMessage } from '@/src/mock/types';
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle
} from '@/components/ui/card';
import { useParams } from 'next/navigation';
import { useEffect, useState } from 'react';

export const GameDetail = () => {
  const params = useParams();
  const { id } = params as { id: string };
  const [gamePhase, setGamePhase] = useState<'preview' | 'betting' | 'debate' | 'ended'>('preview');
  const [timeLeft, setTimeLeft] = useState<number>(60);

  const { loading, error, data } = useQuery(GET_GAME_DETAIL, {
    variables: { id },
  });

  useEffect(() => {
    if (data?.getGameDetail) {
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
  }, [data, gamePhase]);

  if (loading) return <div>Loading...</div>;
  if (error) return <div>Error: {error.message}</div>;
  if (!data?.getGameDetail) return <div>Game not found</div>;

  const game = data.getGameDetail as IGameDetail;

  return (
    <Card className="w-full bg-white text-black">
      <CardHeader>
        <CardTitle className="text-2xl">
          {game.topic}
        </CardTitle>
        <div className="text-sm text-gray-500">
          Game ID: {game.id}
        </div>
        <div className="text-sm text-gray-500">
          Owner: {game.ownerUserAddress}
        </div>
        {(gamePhase === 'preview' || gamePhase === 'betting') && (
          <div className="text-xl font-bold">
            남은 시간: {Math.floor(timeLeft / 60)}:{(timeLeft % 60).toString().padStart(2, '0')}
          </div>
        )}
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          <div className="flex justify-between items-center">
            <div className="text-lg">베팅 금액: {game.defaultBettingAmount} {game.bettingTokenDenom}</div>
            <div className="text-lg">참여자: {game.userAddresses.length}/{game.limit}</div>
          </div>
          {gamePhase === 'debate' && (
            <div className="border p-4 rounded-lg">
              <div className="space-y-2">
                {game.messages.map((message: GameMessage) => (
                  <p key={message.id} className={`text-${message.messageType === 'AGENT_A' ? 'left' : 'right'}`}>
                    {message.sender}: {message.content}
                  </p>
                ))}
              </div>
            </div>
          )}
        </div>
      </CardContent>
    </Card>
  );
};
