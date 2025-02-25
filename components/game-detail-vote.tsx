'use client';

import { useContext, useEffect, useState } from 'react';
import { useParams } from 'next/navigation';
import { AptosClient, Types } from 'aptos';
import { AptosWalletContext } from './layout/providers';
import { CONTRACT_ADDRESS } from '@/lib/aptos';
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle
} from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import Chat from './chat';

const client = new AptosClient('https://testnet.aptoslabs.com');

const fetchTokenPrice = async (tokenAddress: string): Promise<number | null> => {
  try {
    const response = await fetch(
      `https://api.coingecko.com/api/v3/simple/token_price/binance-smart-chain?contract_addresses=${tokenAddress}&vs_currencies=usd`
    );
    if (!response.ok) {
      throw new Error('Failed to fetch token price');
    }

    const data = await response.json();
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
  const params = useParams();
  const { id } = params as { id: string };
  const [betAmount, setBetAmount] = useState('');
  const [selectedAgent, setSelectedAgent] = useState<'A' | 'B' | null>(null);
  const [gamePhase, setGamePhase] = useState<'preview' | 'betting' | 'debate' | 'ended'>('preview');
  const [startPrice, setStartPrice] = useState<number | null>(null);
  const [currentPrice, setCurrentPrice] = useState<number | null>(null);
  const [debate, setDebate] = useState<any>(null);
  const { account, connect, isConnected } = useContext(AptosWalletContext);

  useEffect(() => {
    const fetchDebate = async () => {
      try {
        const resource = await client.getAccountResource(
          CONTRACT_ADDRESS,
          "debate::ai_debate::DebateStore"
        );
        
        const debateStore = resource.data as any;
        const currentDebate = debateStore.debates[Number(id) - 1];
        setDebate(currentDebate);

        // 토큰 가격 조회
        const price = await fetchTokenPrice('0x55d398326f99059ff775485246999027b3197955');
        setStartPrice(price);
        setCurrentPrice(price);
      } catch (error) {
        console.error('Error fetching debate:', error);
      }
    };

    if (id) {
      fetchDebate();
    }
  }, [id]);

  const handleBet = async () => {
    if (!selectedAgent || !betAmount || !isConnected) {
      if (!isConnected) {
        await connect();
        return;
      }
      return;
    }

    try {
      const transaction = {
        type: "entry_function_payload",
        function: `${CONTRACT_ADDRESS}::ai_debate::place_bet`,
        type_arguments: [],
        arguments: [
          debate.id,
          (Number(betAmount) * 100000000).toString(), // Convert to Octas (10^8)
          selectedAgent === 'A' ? '1' : '2' // AI_A = 1, AI_B = 2
        ]
      };

      if (window.aptos) {
        const pendingTx = await window.aptos.signAndSubmitTransaction(transaction);
        console.log('Pending tx:', pendingTx);
        // 여기에 트랜잭션 성공 처리 로직 추가
      }
    } catch (error) {
      console.error('Error placing bet:', error);
    }
  };

  if (!debate) {
    return     <Chat/>
    ;
  }

  const upAmount = debate.ai_a_pool || 0;
  const downAmount = debate.ai_b_pool || 0;
  const totalPoolAmount = upAmount + downAmount;

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
              {debate.ai_a}
            </Button>
            <Button
              variant={selectedAgent === 'B' ? 'default' : 'outline'}
              onClick={() => setSelectedAgent('B')}
              className={`h-20 ${selectedAgent === 'B' ? 'bg-[#C73535]' : ''}`}
            >
              {debate.ai_b}
            </Button>
          </div>

          <div className="space-y-2">
            <label className="text-sm font-medium">베팅 금액 (APT)</label>
            <div className="flex items-center space-x-2">
              <Input
                type="number"
                value={betAmount}
                onChange={(e) => setBetAmount(e.target.value)}
                placeholder="0.0"
                className="text-right"
              />
              <span>APT</span>
            </div>
          </div>

          <div className="space-y-2 p-4 bg-gray-50 rounded-lg">
            <div className="flex justify-between">
              <span>{debate.ai_a} 총 베팅</span>
              <span>{Number(upAmount) / 100000000} APT</span>
            </div>
            <div className="flex justify-between">
              <span>{debate.ai_b} 총 베팅</span>
              <span>{Number(downAmount) / 100000000} APT</span>
            </div>
          </div>

          <Button
            onClick={handleBet}
            disabled={!selectedAgent || !betAmount || !isConnected || debate.is_finished}
            className="w-full"
          >
            {isConnected ? '베팅하기' : '지갑 연결'}
          </Button>
        </div>
      </CardContent>
    </Card>
  );
}
