'use client';
import { useEffect, useState } from 'react';
import { aptosClient, CONTRACT_ADDRESS } from '@/lib/aptos';
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

  useEffect(() => {
    const fetchDebates = async () => {
      try {
        console.log('Fetching debates...');
        const allDebates: Debate[] = [];
        let debateId = 1;
        
        while (true) {
          try {
            const payload = {
              payload: {
                function: `${CONTRACT_ADDRESS}::ai_debate_v4::get_debate` as const,
                functionArguments: [debateId.toString()]
              }
            };
            
            console.log(`Fetching debate ${debateId}...`);
            const response = await aptosClient.view(payload);
            
            if (!response || !response[0]) break;
            
            const debateData = response[0] as any;
            allDebates.push({
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
            });
            
            debateId++;
          } catch (error) {
            // If we get an error, assume we've reached the end of the debates
            console.log(`No more debates found after ${debateId - 1}`);
            break;
          }
        }
        
        console.log('Found debates:', allDebates);
        setDebates(allDebates);
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
          endTime={Date.now() + 86400000}
          isFinished={debate.is_finished}
          winner={debate.is_finished ? (debate.winner === 1 ? debate.ai_a.name : debate.ai_b.name) : undefined}
        />
      ))}
    </div>
  );
};