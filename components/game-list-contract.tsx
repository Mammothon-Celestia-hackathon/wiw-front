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
  end_time: number;
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
          `${CONTRACT_ADDRESS}::ai_debate_v2::DebateStore`
        );
        
        const debateStore = (resource.data as any).debates;
        setDebates(debateStore);
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
          endTime={debate.end_time}
          isFinished={debate.is_finished}
        />
      ))}
    </div>
  );
};