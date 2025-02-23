'use client';
import { useQuery } from '@apollo/client';
import { GET_GAMES } from '@/src/data/query';
import { useRouter } from 'next/navigation';
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle
} from '@/components/ui/card';
import { Button } from '@/components/ui/button';

interface AIAgent {
  id: string;
  name: string;
}

interface Game {
  id: string;
  name: string;
  topic: string;
  createdAt: string;
  state: string;
  aiAgents: AIAgent[];
  bettingTokenDenom: string;
  defaultBettingAmount: number;
}

export const GameList = () => {
  const router = useRouter();
  const { loading, error, data } = useQuery(GET_GAMES);

  if (loading) return <div>Loading games...</div>;
  if (error) return <div>Error loading games: {error.message}</div>;

  const games = data?.getGames ?? [] as Game[];

  return (
    <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
      {games.map((game: Game) => (
        <Card key={game.id} className="cursor-pointer hover:shadow-lg transition-shadow">
          <CardHeader>
            <CardTitle>{game.topic}</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-2">
              <div className="flex justify-between">
                <span>상태</span>
                <span>{game.state}</span>
              </div>
              <div className="flex justify-between">
                <span>베팅 금액</span>
                <span>{game.defaultBettingAmount} {game.bettingTokenDenom}</span>
              </div>
              <div className="flex justify-between">
                <span>AI Agents</span>
                <span>{game.aiAgents.map((agent: AIAgent) => agent.name).join(' vs ')}</span>
              </div>
              <Button 
                className="w-full mt-4"
                onClick={() => router.push(`/games/${game.id}`)}
              >
                참여하기
              </Button>
            </div>
          </CardContent>
        </Card>
      ))}
    </div>
  );
};
