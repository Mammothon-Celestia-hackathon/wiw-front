'use client';
import { useEffect, useState } from 'react';
import { AptosClient } from 'aptos';
import { GameCard } from './game-card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

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

const client = new AptosClient('https://aptos.testnet.bardock.movementlabs.xyz');
const CONTRACT_ADDRESS = '0xd7ae4e1e8d4486450936d8fdbb93af0cba8e1ae00c00f82653f76c5d65d76a6f';

export const GameListContract = () => {
  const [debates, setDebates] = useState<Debate[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchDebates = async () => {
      try {
        console.log('Fetching debates...');
        const allDebates: Debate[] = [];
        let debateId = 1;
        
        while (true) {
          try {
            const response = await client.view({
              function: `${CONTRACT_ADDRESS}::ai_debate_v4::get_debate`,
              type_arguments: [],
              arguments: [debateId.toString()]
            });
            
            console.log(`Debate ${debateId} response:`, response);
            
            if (!response || !response[0]) break;
            
            const debateData = response[0] as any;
            allDebates.push({
              id: Number(debateData.id),
              name: debateData.name,
              topic: debateData.topic,
              creator: debateData.creator,
              ai_a: debateData.ai_a,
              ai_b: debateData.ai_b,
              total_pool: Number(debateData.total_pool),
              ai_a_pool: Number(debateData.ai_a_pool),
              ai_b_pool: Number(debateData.ai_b_pool),
              winner: Number(debateData.winner),
              is_finished: debateData.is_finished
            });
            
            debateId++;
          } catch (error) {
            console.log(`No more debates found after ${debateId - 1}`, error);
            break;
          }
        }
        
        console.log('Found debates:', allDebates);
        setDebates(allDebates);
      } catch (error) {
        console.error('Error fetching debates:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchDebates();
  }, []);

  const ongoingDebates = debates.filter(debate => !debate.is_finished);
  const endedDebates = debates.filter(debate => debate.is_finished);

  if (loading) {
    return (
      <div className="text-center py-12">
        <p className="text-lg text-muted-foreground">Loading debates...</p>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <h1 className="text-3xl font-bold">AI Debate Arena</h1>
      <Tabs defaultValue="ongoing" className="w-full">
        <TabsList className="h-9 inline-flex items-center justify-start gap-2 rounded-lg p-1 bg-muted w-auto">
          <TabsTrigger 
            value="ongoing" 
            className="h-7 data-[state=active]:bg-white data-[state=active]:text-primary data-[state=active]:shadow-sm rounded-md transition-all duration-300 px-3"
          >
            <div className="flex items-center gap-2 text-sm">
              <div className="w-1.5 h-1.5 rounded-full bg-green-500 animate-pulse" />
              Live ({ongoingDebates.length})
            </div>
          </TabsTrigger>
          <TabsTrigger 
            value="ended" 
            className="h-7 data-[state=active]:bg-white data-[state=active]:text-primary data-[state=active]:shadow-sm rounded-md transition-all duration-300 px-3"
          >
            <div className="flex items-center gap-2 text-sm">
              <div className="w-1.5 h-1.5 rounded-full bg-gray-400" />
              Ended ({endedDebates.length})
            </div>
          </TabsTrigger>
        </TabsList>
        
        <TabsContent value="ongoing" className="mt-6">
          {ongoingDebates.length === 0 ? (
            <div className="text-center text-muted-foreground py-12 bg-muted/50 rounded-lg">
              <p className="text-lg font-medium">No active debates at the moment</p>
              <p className="text-sm text-muted-foreground mt-1">Check back later for new debates</p>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {ongoingDebates.map((debate) => (
                <GameCard
                  key={debate.id}
                  id={debate.id}
                  name={debate.name}
                  topic={debate.topic}
                  aiA={debate.ai_a.name}
                  aiB={debate.ai_b.name}
                  totalPool={debate.total_pool}
                  isFinished={debate.is_finished}
                  winner={debate.is_finished ? (debate.winner === 1 ? debate.ai_a.name : debate.ai_b.name) : undefined}
                />
              ))}
            </div>
          )}
        </TabsContent>
        
        <TabsContent value="ended" className="mt-6">
          {endedDebates.length === 0 ? (
            <div className="text-center text-muted-foreground py-12 bg-muted/50 rounded-lg">
              <p className="text-lg font-medium">No finished debates yet</p>
              <p className="text-sm text-muted-foreground mt-1">Completed debates will appear here</p>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {endedDebates.map((debate) => (
                <GameCard
                  key={debate.id}
                  id={debate.id}
                  name={debate.name}
                  topic={debate.topic}
                  aiA={debate.ai_a.name}
                  aiB={debate.ai_b.name}
                  totalPool={debate.total_pool}
                  isFinished={debate.is_finished}
                  winner={debate.is_finished ? (debate.winner === 1 ? debate.ai_a.name : debate.ai_b.name) : undefined}
                />
              ))}
            </div>
          )}
        </TabsContent>
      </Tabs>
    </div>
  );
};