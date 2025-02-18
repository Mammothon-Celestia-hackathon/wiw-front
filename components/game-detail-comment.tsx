'use client';

import { Avatar, AvatarFallback, AvatarImage } from './ui/avatar';
import { Button } from './ui/button';
import { Input } from './ui/input';
import { useState } from 'react';
import { useAccount } from 'wagmi';

interface Comment {
  id: string;
  address: string;
  message: string;
  timestamp: number;
  isAgentA: boolean;
}

export const GameDetailComment = () => {
  const { address } = useAccount();
  const [message, setMessage] = useState('');
  const [comments, setComments] = useState<Comment[]>([]);
  const [selectedSide, setSelectedSide] = useState<'A' | 'B' | null>(null);

  const handleSubmit = () => {
    if (!message || !selectedSide || !address) return;

    const newComment: Comment = {
      id: Math.random().toString(),
      address: address,
      message,
      timestamp: Date.now(),
      isAgentA: selectedSide === 'A'
    };

    setComments(prev => [...prev, newComment]);
    setMessage('');
  };

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
            .filter(c => c.isAgentA)
            .map(comment => (
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
            .filter(c => !c.isAgentA)
            .map(comment => (
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
