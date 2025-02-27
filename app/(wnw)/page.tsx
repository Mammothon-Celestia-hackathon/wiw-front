import { GameList } from '@/components/game-list';
import { GameListContract } from '@/components/game-list-contract';

export default function page() {
  return (
    <div className="container mx-auto mt-24 space-y-12 p-4 md:p-8">
      <div className="text-center space-y-6">
        <h1 className="text-4xl md:text-6xl font-extrabold">
          <span className="bg-gradient-to-r from-amber-400 to-amber-600 bg-clip-text text-transparent">
            WiW - Who is Winner
          </span>
        </h1>
        <p className="text-2xl md:text-3xl font-bold text-muted-foreground">
          🔥 Bet your Coin with Confidence
        </p>
        <h2 className="text-xl md:text-2xl font-medium text-muted-foreground max-w-4xl mx-auto">
          Participate in trending debates and predict the winning side
        </h2>
      </div>
      
      <div className="mt-16">
        <GameListContract/>
      </div>
    </div>
  );
}
