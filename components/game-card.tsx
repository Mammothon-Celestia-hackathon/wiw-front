'use client';
import { useRouter } from 'next/navigation';
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
  CardDescription,
} from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import { ArrowRight, Trophy, Users } from "lucide-react";

interface GameCardProps {
  id: number;
  name: string;
  topic: string;
  aiA: string;
  aiB: string;
  totalPool: number;
  isFinished: boolean;
  winner?: string;
}

export const GameCard = ({
  id,
  name,
  topic,
  aiA,
  aiB,
  totalPool,
  isFinished,
  winner
}: GameCardProps) => {
  const router = useRouter();

  return (
    <Card className="group hover:shadow-xl transition-all duration-300 border-2">
      <CardHeader className="space-y-1">
        <div className="flex justify-between items-center">
          <CardTitle className="text-xl font-bold">{name}</CardTitle>
          <Badge 
            variant={isFinished ? "secondary" : "default"} 
            className={`rounded-full ${
              !isFinished ? 'bg-green-500/10 text-green-500 border-green-500/50' : ''
            }`}
          >
            {isFinished ? (
              'Finished'
            ) : (
              <span className="flex items-center gap-1.5">
                <span className="relative flex h-2 w-2">
                  <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-green-400 opacity-75"></span>
                  <span className="relative inline-flex rounded-full h-2 w-2 bg-green-500"></span>
                </span>
                Live
              </span>
            )}
          </Badge>
        </div>
        <CardDescription className="text-sm font-medium text-muted-foreground">
          {topic}
        </CardDescription>
      </CardHeader>

      <CardContent className="space-y-4">
        <div className="rounded-lg bg-slate-50 p-4 space-y-3">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <Users className="h-4 w-4 text-blue-500" />
              <span className="font-medium">Participants</span>
            </div>
          </div>
          
          <div className="grid grid-cols-2 gap-4">
            <div className="p-3 rounded-md bg-white shadow-sm">
              <p className="text-sm font-semibold text-blue-600">AI A</p>
              <p className="text-sm text-gray-600">{aiA}</p>
            </div>
            <div className="p-3 rounded-md bg-white shadow-sm">
              <p className="text-sm font-semibold text-red-600">AI B</p>
              <p className="text-sm text-gray-600">{aiB}</p>
            </div>
          </div>
        </div>

        <Separator />

        <div className="flex justify-between items-center">
          <div>
            <p className="text-sm text-muted-foreground">Total Pool</p>
            <p className="text-lg font-bold">{Number(totalPool) / 100000000} MOVE</p>
          </div>
          {isFinished && winner && (
            <div className="flex items-center gap-2">
              <Trophy className="h-4 w-4 text-yellow-500" />
              <span className="text-sm font-medium">Winner: {winner}</span>
            </div>
          )}
        </div>

        <Button 
          className={`w-full group-hover:scale-105 transition-transform ${
            isFinished 
              ? 'bg-gray-500 hover:bg-gray-600' 
              : 'bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700'
          }`}
          onClick={() => router.push(`/games/${id}`)}
          disabled={isFinished}
        >
          <span className="mr-2">
            {isFinished ? 'Game Ended' : 'Join Debate'}
          </span>
          {!isFinished && <ArrowRight className="h-4 w-4" />}
        </Button>
      </CardContent>
    </Card>
  );
}; 