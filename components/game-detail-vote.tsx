'use client';

import { useContext, useEffect, useState } from 'react';
import { useParams } from 'next/navigation';
import { aptosClient, CONTRACT_ADDRESS } from '@/lib/aptos';
import { AptosWalletContext } from './layout/providers';
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle
} from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import Chat from './chat';

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
  const [debate, setDebate] = useState<any>(null);
  const [poolInfo, setPoolInfo] = useState<{total: number, aPool: number, bPool: number} | null>(null);
  const { account, connect, isConnected } = useContext(AptosWalletContext);

  useEffect(() => {
    const fetchDebateAndPool = async () => {
      try {
        // Fetch debate info
        const debateResponse = await aptosClient.view({
          payload: {
            function: `${CONTRACT_ADDRESS}::ai_debate_v4::get_debate`,
            typeArguments: [],
            arguments: [Number(id)]
          }
        });

        if (!debateResponse || !debateResponse[0]) {
          console.error('Invalid debate response format:', debateResponse);
          return;
        }

        const debateData = debateResponse[0] as any;
        console.log('Debate data:', debateData);
        setDebate(debateData);

        // Fetch pool info
        const poolResponse = await aptosClient.view({
          payload: {
            function: `${CONTRACT_ADDRESS}::ai_debate_v4::get_debate_pool`,
            typeArguments: [],
            arguments: [Number(id)]
          }
        });

        if (poolResponse && poolResponse.length === 3) {
          setPoolInfo({
            total: Number(poolResponse[0]),
            aPool: Number(poolResponse[1]),
            bPool: Number(poolResponse[2])
          });
        }

      } catch (error) {
        console.error('Error fetching debate:', error);
      }
    };

    if (id) {
      fetchDebateAndPool();
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
        data: {
          function: `${CONTRACT_ADDRESS}::ai_debate_v4::place_bet`,
          typeArguments: [],
          arguments: [
            debate.id,
            (Number(betAmount) * 100000000).toString(),
            selectedAgent === 'A' ? '1' : '2'
          ]
        }
      };

      if (window.aptos) {
        const pendingTx = await window.aptos.signAndSubmitTransaction(transaction);
        console.log('Pending tx:', pendingTx);
        
        // Refresh pool info after successful bet
        const poolResponse = await aptosClient.view({
          payload: {
            function: `${CONTRACT_ADDRESS}::ai_debate_v4::get_debate_pool`,
            typeArguments: [],
            arguments: [Number(id)]
          }
        });

        if (poolResponse && poolResponse.length === 3) {
          setPoolInfo({
            total: Number(poolResponse[0]),
            aPool: Number(poolResponse[1]),
            bPool: Number(poolResponse[2])
          });
        }
      }
    } catch (error) {
      console.error('Error placing bet:', error);
    }
  };

  if (!debate) {
    return    <></>
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
