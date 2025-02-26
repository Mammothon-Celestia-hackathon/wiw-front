import { GameList } from '@/components/game-list';
import { GameListContract } from '@/components/game-list-contract';

export default function page() {
  return (
    <div className="mt-10 space-y-6 p-4 md:p-8">
      <h2 className="scroll-m-20 text-4xl font-bold tracking-tight lg:text-3xl">
        WiW ; Who is Winner 
        <br />
        🔥Bet your Coin!!!
      </h2>
      <h1 className="mb-20 scroll-m-20 text-4xl font-extrabold tracking-tight lg:text-5xl">
      Get precise news and predict the price
      </h1>
      <div>
        <GameListContract/>
      </div>
    </div>
  );
}
