'use client';

import {
  Card,
  CardContent,
  CardHeader,
  CardTitle
} from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { useReadContract, useWriteContract } from 'wagmi';
import WNW_ABI from '@/abi/IWNW.abi';
import { useRouter, useParams } from 'next/navigation';
import { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';

const fetchTokenPrice = async (tokenAddress: string): Promise<number | null> => {
  try {
    const response = await fetch(
      `https://api.coingecko.com/api/v3/simple/token_price/binance-smart-chain?contract_addresses=${tokenAddress}&vs_currencies=usd`
    );
    if (!response.ok) {
      throw new Error('Failed to fetch token price');
    }

    const data = await response.json();
    console.log('API Response:', data);

    const priceInUsd = data[tokenAddress.toLowerCase()]?.usd;

    if (!priceInUsd) {
      throw new Error('Price not found for the given token');
    }

    return priceInUsd;
  } catch (error) {
    console.error('Error fetching token price:', error);
    return null;
  }
};

export function GameDetailVote() {
  const WNW_PRECOMPILE_ADDRESS = '0xe31bA092390628Aaf5faFda2F50bFD7d51C9e657';
  const params = useParams();
  const { id } = params as { id: string };
  const [betAmount, setBetAmount] = useState('');
  const [selectedAgent, setSelectedAgent] = useState<'A' | 'B' | null>(null);
  const [gamePhase, setGamePhase] = useState<'preview' | 'betting' | 'debate' | 'ended'>('preview');
  const [startPrice, setStartPrice] = useState<number | null>(null);
  const [currentPrice, setCurrentPrice] = useState<number | null>(null);

  const { data: game }: any = useReadContract({
    address: WNW_PRECOMPILE_ADDRESS,
    abi: WNW_ABI,
    functionName: 'getGame',
    args: [id]
  });

  const { writeContract } = useWriteContract();

  const handleBet = async () => {
    if (!selectedAgent || !betAmount) return;

    const amount = BigInt(Math.floor(Number(betAmount) * 10 ** 18));
    writeContract({
      address: WNW_PRECOMPILE_ADDRESS,
      abi: WNW_ABI,
      functionName: 'bet',
      args: [game.gameId, selectedAgent === 'A', amount]
    });
  };

  useEffect(() => {
    if (game) {
      console.log('Game data:', game);
      const fetchPrices = async () => {
        const startPrice = await fetchTokenPrice('0x55d398326f99059ff775485246999027b3197955');
        const currentPrice = await fetchTokenPrice('0x55d398326f99059ff775485246999027b3197955');

        setStartPrice(startPrice);
        setCurrentPrice(currentPrice);
      };

      fetchPrices();
    }
  }, [game]);

  if (!game) {
    console.log("undefined");
    return <></>;
  }

  const upAmount = game.upAmount ? BigInt(game.upAmount) : BigInt(0);
  const downAmount = game.downAmount ? BigInt(game.downAmount) : BigInt(0);
  const totalPoolAmount = upAmount + downAmount;

  const chartData = [{ up: Number(upAmount) / 10 ** 18, down: Number(downAmount) / 10 ** 18 }];

  const totalVisitors = chartData[0].up + chartData[0].down;
  const chartConfig = {
    up: {
      label: 'Up',
      color: 'hsl(var(--chart-5))'
    },
    down: {
      label: 'Down',
      color: 'hsl(var(--chart-2))'
    }
  };

  return (
    <Card className="w-full bg-white text-black">
      <CardHeader>
        <CardTitle>베팅하기</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-6">
          <div className="grid grid-cols-2 gap-4">
            <Button
              variant={selectedAgent === 'A' ? 'default' : 'outline'}
              onClick={() => setSelectedAgent('A')}
              className={`h-20 ${selectedAgent === 'A' ? 'bg-[#00A29A]' : ''}`}
            >
              Agent A
            </Button>
            <Button
              variant={selectedAgent === 'B' ? 'default' : 'outline'}
              onClick={() => setSelectedAgent('B')}
              className={`h-20 ${selectedAgent === 'B' ? 'bg-[#C73535]' : ''}`}
            >
              Agent B
            </Button>
          </div>

          <div className="space-y-2">
            <label className="text-sm font-medium">베팅 금액 (MOVE)</label>
            <div className="flex items-center space-x-2">
              <Input
                type="number"
                value={betAmount}
                onChange={(e) => setBetAmount(e.target.value)}
                placeholder="0.0"
                className="text-right"
              />
              <span>MOVE</span>
            </div>
          </div>

          <div className="space-y-2 p-4 bg-gray-50 rounded-lg">
            <div className="flex justify-between">
              <span>Agent A 총 베팅</span>
              <span>{game?.upAmount ? Number(game.upAmount) / 10 ** 18 : 0} MOVE</span>
            </div>
            <div className="flex justify-between">
              <span>Agent B 총 베팅</span>
              <span>{game?.downAmount ? Number(game.downAmount) / 10 ** 18 : 0} MOVE</span>
            </div>
          </div>

          <Button
            onClick={handleBet}
            disabled={!selectedAgent || !betAmount || gamePhase !== 'betting'}
            className="w-full"
          >
            베팅하기
          </Button>
        </div>
      </CardContent>
    </Card>
  );
}
