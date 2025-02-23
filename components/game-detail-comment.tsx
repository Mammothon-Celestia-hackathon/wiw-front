'use client';

import { useQuery, useMutation } from '@apollo/client';
import { GET_GAME_COMMENTS, CREATE_COMMENT } from '@/src/data/query';
import { GameComment } from '@/src/mock/types';
import { Avatar, AvatarFallback, AvatarImage } from './ui/avatar';
import { Button } from './ui/button';
import { Input } from './ui/input';
import { useState } from 'react';
import { useParams } from 'next/navigation';

export const GameDetailComment = () => {
  const params = useParams();
  const { id: gameId } = params as { id: string };
  const [message, setMessage] = useState('');
  const [selectedSide, setSelectedSide] = useState<'A' | 'B' | null>(null);

  const { loading, error, data } = useQuery(GET_GAME_COMMENTS, {
    variables: { gameId },
  });

  const [createComment] = useMutation(CREATE_COMMENT, {
    refetchQueries: [{ query: GET_GAME_COMMENTS, variables: { gameId } }],
  });

  const handleSubmit = async () => {
    if (!message || !selectedSide) return;

    try {
      await createComment({
        variables: {
          input: {
            gameId,
            message,
            isAgentA: selectedSide === 'A'
          }
        }
      });
      setMessage('');
      setSelectedSide(null);
    } catch (error) {
      console.error('Error creating comment:', error);
    }
  };

  if (loading) return <div>Loading comments...</div>;
  if (error) return <div>Error loading comments: {error.message}</div>;

  const comments = data?.getGameComments ?? [] as GameComment[];

  return (
    <div className="space-y-6">
      <div className="flex space-x-2">
        <Input
          value={message}
          onChange={(e) => setMessage(e.target.value)}
          placeholder="의견을 남겨주세요"
          className="flex-1"
        />
        <Button
          onClick={() => setSelectedSide('A')}
          variant={selectedSide === 'A' ? 'default' : 'outline'}
          className="bg-[#00A29A]"
        >
          A 지지
        </Button>
        <Button
          onClick={() => setSelectedSide('B')}
          variant={selectedSide === 'B' ? 'default' : 'outline'}
          className="bg-[#C73535]"
        >
          B 지지
        </Button>
        <Button onClick={handleSubmit}>작성</Button>
      </div>

      <div className="grid grid-cols-2 gap-4">
        <div className="space-y-4">
          <h3 className="font-bold text-[#00A29A]">Agent A 지지자</h3>
          {comments
            .filter((comment: GameComment) => comment.isAgentA)
            .map((comment: GameComment) => (
              <div key={comment.id} className="flex items-start space-x-2 p-2 bg-gray-50 rounded">
                <Avatar>
                  <AvatarImage src={`https://avatars.dicebear.com/api/identicon/${comment.address}.svg`} />
                  <AvatarFallback>U</AvatarFallback>
                </Avatar>
                <div>
                  <p className="text-xs text-gray-500">{comment.address.slice(0, 6)}...{comment.address.slice(-4)}</p>
                  <p>{comment.message}</p>
                </div>
              </div>
            ))}
        </div>

        <div className="space-y-4">
          <h3 className="font-bold text-[#C73535]">Agent B 지지자</h3>
          {comments
            .filter((comment: GameComment) => !comment.isAgentA)
            .map((comment: GameComment) => (
              <div key={comment.id} className="flex items-start space-x-2 p-2 bg-gray-50 rounded">
                <Avatar>
                  <AvatarImage src={`https://avatars.dicebear.com/api/identicon/${comment.address}.svg`} />
                  <AvatarFallback>U</AvatarFallback>
                </Avatar>
                <div>
                  <p className="text-xs text-gray-500">{comment.address.slice(0, 6)}...{comment.address.slice(-4)}</p>
                  <p>{comment.message}</p>
                </div>
              </div>
            ))}
        </div>
      </div>
    </div>
  );
};
