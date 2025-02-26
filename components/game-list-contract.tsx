'use client';
import { useEffect, useState } from 'react';
import { AptosClient } from 'aptos';
import { GameCard } from './game-card';

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

export const GameListContract = () => {
  const [debates, setDebates] = useState<Debate[]>([]);
  const client = new AptosClient('https://testnet.aptoslabs.com');
  const CONTRACT_ADDRESS = '0x18693562f4ced0fd77d6b42416003a5945d15358431fbff2b9af0e4b0759d261';

  useEffect(() => {
    const fetchDebates = async () => {
      try {
        const resource = await client.getAccountResource(
          CONTRACT_ADDRESS,
          `${CONTRACT_ADDRESS}::ai_debate_v4::DebateStore`
        );
        
        const debateStore = (resource.data as any).debates;
        const transformedDebates = debateStore.map((debate: any) => ({
          id: Number(debate.id),
          name: debate.name,
          topic: debate.topic,
          creator: debate.creator,
          ai_a: debate.ai_a,
          ai_b: debate.ai_b,
          total_pool: Number(debate.total_pool),
          ai_a_pool: Number(debate.ai_a_pool),
          ai_b_pool: Number(debate.ai_b_pool),
          winner: Number(debate.winner),
          is_finished: debate.is_finished
        }));
        
        setDebates(transformedDebates);
      } catch (error) {
        console.error('Error fetching debates:', error);
      }
    };

    fetchDebates();
  }, []);

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
      {debates.map((debate) => (
        <GameCard
          key={debate.id}
          id={debate.id}
          name={debate.name}
          topic={debate.topic}
          aiA={debate.ai_a.name}
          aiB={debate.ai_b.name}
          totalPool={debate.total_pool}
          endTime={Date.now() + 86400000} // endTime은 컨트랙트에 없지만 UI를 위해 임시로 추가
          isFinished={debate.is_finished}
          winner={debate.is_finished ? (debate.winner === 1 ? debate.ai_a.name : debate.ai_b.name) : undefined}
        />
      ))}
    </div>
  );
};