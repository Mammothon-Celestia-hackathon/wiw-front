'use client';

import { Avatar, AvatarFallback, AvatarImage } from './ui/avatar';
import { Button } from './ui/button';
import { Input } from './ui/input';
import { useEffect, useState } from 'react';
import { useParams } from 'next/navigation';
import { Card, CardContent, CardHeader, CardTitle } from './ui/card';
import { ScrollArea } from './ui/scroll-area';
import { Badge } from './ui/badge';
import {
  GetMessagesByGameDocument,
  Message,
  NewMessageDocument,
  SendMessageDocument
} from '@/src/__generated__/graphql';
import { ApolloError, useLazyQuery, useMutation as useApolloMutation, useSubscription } from '@apollo/client';
import { useWallet } from '@aptos-labs/wallet-adapter-react';

interface Comment {
  id: string;
  address: string;
  message: string;
  isAgentA: boolean;
  createdAt: string;
  name: string;
}

// const DUMMY_COMMENTS: Comment[] = [
//   {
//     id: '1',
//     address: '0x1234567890abcdef',
//     message:
//       "Agent A's analysis is more convincing. They utilized technical indicators well.",
//     isAgentA: true,
//     createdAt: new Date(Date.now() - 3600000).toISOString(),
//     name: 'Crypto Trader'
//   },
//   {
//     id: '2',
//     address: '0xabcdef1234567890',
//     message:
//       "Agent B's perspective is realistic. They reflected market conditions well.",
//     isAgentA: false,
//     createdAt: new Date(Date.now() - 2400000).toISOString(),
//     name: 'Market Analyst'
//   },
//   {
//     id: '3',
//     address: '0x9876543210abcdef',
//     message: "Agent A's approach is innovative.",
//     isAgentA: true,
//     createdAt: new Date().toISOString(),
//     name: 'Anonymous User'
//   },
//   {
//     id: '4',
//     address: '0xfedcba0987654321',
//     message: "Agent B's analysis has more depth.",
//     isAgentA: false,
//     createdAt: new Date().toISOString(),
//     name: 'Anonymous User'
//   }
// ];

export const GameDetailComment = () => {
  // const [comments, setComments] = useState<Comment[]>(DUMMY_COMMENTS);
  const { account, connected, network, wallet, changeNetwork } = useWallet();
  const [message, setMessage] = useState('');
  const [selectedSide, setSelectedSide] = useState<'A' | 'B' | null>(null);
  const [messages, setMessages] = useState<Message[]>([]);

  const gameId = "67bd22a706937ce8a18d4cea";

  const [sendMessage, {loading: sendMessageLoading}] = useApolloMutation(SendMessageDocument);
  const [
    fetchMessagesByGame,
    { loading: messageLoading, data: messageData, error: messageDataError },
  ] = useLazyQuery(GetMessagesByGameDocument);

  useEffect(() => {
    if (account?.address) {
      fetchMessagesByGame({
        variables: { gameId, userAddress: account?.address },
      }).then((r) => {
        setMessages((prevMessages) => {
          const newMessages = r.data?.getMessagesByGame?.filter(
            (newMsg) => !prevMessages.some((prevMsg) => prevMsg.id === newMsg.id),
          ) ?? [];
          console.log(newMessages);
          return [...prevMessages, ...newMessages];
        });
      });
    }
  }, [connected, account?.address]);

  const handleSendMessage = async () => {
    if (message.trim() === "") {
      alert("message must have somthing!!!");
      return;
    }
    if (!account?.address) {
      alert("please connect wallet first!!!");
      return;
    }

    try {
      await sendMessage({
        variables: {
          content: message,
          messageType: "text",
          gameId: gameId,
          senderAddress: account?.address,
        },
      });
    } catch (err) {
      console.log(err);
    }

    setMessage("");
  };

  useSubscription(NewMessageDocument, {
    variables: { gameId },
    onData: ({ data }) => {
      const newMessage = data.data?.newMessage;
      if (newMessage) {
        setMessages((prevMessages) => {
          if (!prevMessages.some((msg) => msg.id === newMessage.id)) {
            return [...prevMessages, newMessage];
          }
          return prevMessages;
        });
      }
      console.log("New Message:", newMessage);
    },
    onError: (error) => {
      console.log("error", error);
    },
  });

  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center justify-between">
          <span>Comments</span>
          <Badge variant="outline">{messages.length}</Badge>
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
          <Button className={sendMessageLoading ? "bg-red-400" : ""} onClick={handleSendMessage} disabled={sendMessageLoading}>{sendMessageLoading ? "Loading" : "Post"}</Button>
        </div>

        <ScrollArea className="h-[400px]">
          <div className="space-y-4">
            {
              messages?.map((message) => (
                <div
                  key={message.id}
                  className="flex space-x-4 rounded-lg bg-gray-50 p-4"
                >
                  <Avatar className="h-10 w-10">
                    <AvatarImage
                      src={`https://api.dicebear.com/7.x/personas/svg?seed=${message.senderAddress}`}
                      alt={message.senderAddress}
                    />
                    <AvatarFallback>
                      {message.senderAddress
                        .split(' ')
                        .map((n) => n[0])
                        .join('')}
                    </AvatarFallback>
                  </Avatar>
                  <div className="flex-1 space-y-1">
                    <div className="flex items-center space-x-2">
                      <span className="font-medium">{"Anonymous User"}</span>
                      <span className="text-xs text-gray-500">
                      {message.senderAddress.slice(0, 6)}...
                        {message.senderAddress.slice(-4)}
                    </span>
                      {/*<Badge*/}
                      {/*  variant="outline"*/}
                      {/*  className={*/}
                      {/*    comment.isAgentA ? 'bg-[#00A29A]/10' : 'bg-[#C73535]/10'*/}
                      {/*  }*/}
                      {/*>*/}
                      {/*  Supporting {comment.isAgentA ? 'A' : 'B'}*/}
                      {/*</Badge>*/}
                    </div>
                    <p className="text-gray-700">{message.content}</p>
                    <span className="text-xs text-gray-500">
                    {new Date(message.createdAt).toLocaleString()}
                  </span>
                  </div>
                </div>
              ))
            }
          </div>
        </ScrollArea>
      </CardContent>
    </Card>
  );
};
