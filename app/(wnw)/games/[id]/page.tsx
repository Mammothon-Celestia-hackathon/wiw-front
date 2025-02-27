'use client';
import { GameDetail } from '@/components/game-detail';
import { GameDetailComment } from '@/components/game-detail-comment';
import { GameDetailVote } from '@/components/game-detail-vote';
import { DebateVote } from '@/components/debate-vote';
import { useParams } from 'next/navigation';

export default function Page() {
  const params = useParams();
  const { id } = params as { id: string };

  return (
    <div className="mt-10 space-y-6 p-4 md:p-8 overflow-y-auto">
      <div className="flex flex-col space-y-8 h-full">
        <div>
          <DebateVote id={id} />
        </div>
        <div className="flex space-x-8 h-full">
          <div className="flex-1 space-y-20 h-full overflow-y-auto pr-2">
            <GameDetail id={id} />
          </div>

          <div className="flex-1 space-y-4 h-full overflow-y-auto pl-2">
            <GameDetailComment />
          </div>
        </div>
      </div>
    </div>
  );
}
