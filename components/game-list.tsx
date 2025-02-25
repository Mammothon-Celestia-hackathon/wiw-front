'use client';

import { useRouter } from 'next/navigation';
import { useQuery } from '@apollo/client';
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle
} from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { GET_GAMES_BY_OWNER, GET_JOINED_GAMES } from '@/src/data/query';

export const GameList = () => {
  const router = useRouter();
  const userAddress = "0x18693562f4ced0fd77d6b42416003a5945d15358431fbff2b9af0e4b0759d261";

  const { loading: ownerLoading, error: ownerError, data: ownerGames } = 
    useQuery(GET_GAMES_BY_OWNER, {
      variables: { ownerAddress: userAddress }
    });

  const { loading: joinedLoading, error: joinedError, data: joinedGames } = 
    useQuery(GET_JOINED_GAMES, {
      variables: { userAddress: userAddress }
    });

  if (ownerLoading || joinedLoading) return <div>Loading games...</div>;
  if (ownerError) return <div>Error loading owned games: {ownerError.message}</div>;
  if (joinedError) return <div>Error loading joined games: {joinedError.message}</div>;

  const allGames = [
    ...(ownerGames?.getGamesByOwnerAddress || []),
    ...(joinedGames?.getJoinedGames || [])
  ];

  return (
    <div>
      <h2 className="text-2xl font-bold mb-4">게임 목록</h2>
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
        {allGames.map((game) => (
          <Card key={game.id} className="cursor-pointer hover:shadow-lg transition-shadow">
            <CardHeader>
              <CardTitle>{game.topic}</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-2">
                <div className="flex justify-between">
                  <span>이름</span>
                  <span>{game.name}</span>
                </div>
                <div className="flex justify-between">
                  <span>베팅 금액</span>
                  <span>{game.defaultBettingAmount} {game.bettingTokenDenom}</span>
                </div>
                <div className="flex justify-between">
                  <span>참여자 수</span>
                  <span>{game.userAddresses.length} / {game.limit}</span>
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
    </div>
  );
};
