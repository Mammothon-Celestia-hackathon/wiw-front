'use client';

import { Avatar, AvatarFallback, AvatarImage } from './ui/avatar';
import { Button } from './ui/button';
import { Input } from './ui/input';
import { useState } from 'react';
import { useParams } from 'next/navigation';
import { Card, CardContent, CardHeader, CardTitle } from './ui/card';
import { ScrollArea } from './ui/scroll-area';
import { Badge } from './ui/badge';

interface Comment {
  id: string;
  address: string;
  message: string;
  isAgentA: boolean;
  createdAt: string;
  name: string;
}

const DUMMY_COMMENTS: Comment[] = [
  {
    id: '1',
    address: '0x1234567890abcdef',
    message: 'A의 분석이 더 설득력 있네요. 기술적 지표를 잘 활용한 것 같습니다.',
    isAgentA: true,
    createdAt: new Date(Date.now() - 3600000).toISOString(),
    name: 'Crypto Trader'
  },
  {
    id: '2',
    address: '0xabcdef1234567890',
    message: 'B의 관점도 현실적입니다. 시장 상황을 잘 반영했네요.',
    isAgentA: false,
    createdAt: new Date(Date.now() - 2400000).toISOString(),
    name: 'Market Analyst'
  },
  {
    id: '3',
    address: '0x9876543210abcdef',
    message: 'A의 접근방식이 혁신적입니다.',
    isAgentA: true,
    createdAt: new Date().toISOString(),
    name: 'Anonymous User'
  },
  {
    id: '4',
    address: '0xfedcba0987654321',
    message: 'B의 분석이 더 깊이있어요.',
    isAgentA: false,
    createdAt: new Date().toISOString(),
    name: 'Anonymous User'
  }
];

export const GameDetailComment = () => {
  const [comments, setComments] = useState<Comment[]>(DUMMY_COMMENTS);
  const [message, setMessage] = useState('');
  const [selectedSide, setSelectedSide] = useState<'A' | 'B' | null>(null);

  const handleSubmit = () => {
    if (!message || !selectedSide) return;

    const newComment: Comment = {
      id: Date.now().toString(),
      address: '0x' + Math.random().toString(16).slice(2, 14),
      message,
      isAgentA: selectedSide === 'A',
      createdAt: new Date().toISOString(),
      name: 'Anonymous User'
    };

    setComments([newComment, ...comments]);
    setMessage('');
    setSelectedSide(null);
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center justify-between">
          <span>Comments</span>
          <Badge variant="outline">{comments.length}</Badge>
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="flex space-x-2">
          <Input
            value={message}
            onChange={(e) => setMessage(e.target.value)}
            placeholder="Share your thoughts..."
            className="flex-1"
          />
          <Button
            onClick={() => setSelectedSide('A')}
            variant={selectedSide === 'A' ? 'default' : 'outline'}
            className="bg-[#00A29A] hover:bg-[#00A29A]/90"
          >
            Support A
          </Button>
          <Button
            onClick={() => setSelectedSide('B')}
            variant={selectedSide === 'B' ? 'default' : 'outline'}
            className="bg-[#C73535] hover:bg-[#C73535]/90"
          >
            Support B
          </Button>
          <Button onClick={handleSubmit}>Post</Button>
        </div>

        <ScrollArea className="h-[400px]">
          <div className="space-y-4">
            {comments.map((comment) => (
              <div key={comment.id} className="flex space-x-4 p-4 bg-gray-50 rounded-lg">
                <Avatar className="w-10 h-10">
                  <AvatarImage 
                    src={`https://api.dicebear.com/7.x/personas/svg?seed=${comment.address}`} 
                    alt={comment.name} 
                  />
                  <AvatarFallback>
                    {comment.name.split(' ').map(n => n[0]).join('')}
                  </AvatarFallback>
                </Avatar>
                <div className="flex-1 space-y-1">
                  <div className="flex items-center space-x-2">
                    <span className="font-medium">{comment.name}</span>
                    <span className="text-xs text-gray-500">
                      {comment.address.slice(0, 6)}...{comment.address.slice(-4)}
                    </span>
                    <Badge 
                      variant="outline" 
                      className={comment.isAgentA ? 'bg-[#00A29A]/10' : 'bg-[#C73535]/10'}
                    >
                      Supporting {comment.isAgentA ? 'A' : 'B'}
                    </Badge>
                  </div>
                  <p className="text-gray-700">{comment.message}</p>
                  <span className="text-xs text-gray-500">
                    {new Date(comment.createdAt).toLocaleString()}
                  </span>
                </div>
              </div>
            ))}
          </div>
        </ScrollArea>
      </CardContent>
    </Card>
  );
};
