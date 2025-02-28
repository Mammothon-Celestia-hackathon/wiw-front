import type { Agents, TextResponse } from '@/api';
import { useSendMessageMutation } from '@/api';
import { useEffect, useRef, useState } from 'react';
import { ROUTES } from '@/api/routes';
import { Input } from './ui/input';
import { Button } from './ui/button';
import { ScrollArea } from './ui/scroll-area';

export default function Chat() {
  const [agents, setAgents] = useState<Agents | null>(null);
  const [input, setInput] = useState('');
  const [messages, setMessages] = useState<TextResponse[]>([]);
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const { mutate: sendMessage, isPending } = useSendMessageMutation({
    setMessages,
    setSelectedFile
  });
  const [isDebating, setIsDebating] = useState(true);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
    const lastMessage = messages[messages.length - 1];
    handleDebate(lastMessage);
    if (lastMessage && !isPending && isDebating) {
      // 처리 중이 아닐 때만 실행
      relayMessage(lastMessage);
    }
  }, [messages, isPending]);

  // 15초 후에 메시지를 전송하는 useEffect 추가
  useEffect(() => {
    if (agents) {
      const timeoutId = setTimeout(() => {
        sendMessage({
          text: 'blackrock dumps bitcoin $441M. it could be affect to market, bitcoin price will be go down under the 77k?',
          agentId: agents.B.id,
          selectedFile: null
        });
      }, 30000);
      return () => clearTimeout(timeoutId);
    }
  }, [agents, sendMessage]);

  const handleDebate = (lastMessage: TextResponse) => {
    if (!lastMessage) return;
    if (lastMessage.action === 'FINALIZE_DEBATE') {
      // action이 finalize debate이면 토론 종료
      setIsDebating(false);
      console.log('debate is over');
    }
  };

  useEffect(() => {
    getAgents().then((data) => setAgents(data));
  }, []);

  const handleSubmit = async (e: React.FormEvent) => {
    // 이 곳이 엘리자한테 텍스트 보내는 곳.
    e.preventDefault();
    if ((!input.trim() && !selectedFile) || !agents) return;

    // Add user message immediately to state
    const userMessage: TextResponse = {
      text: input,
      user: 'user',
      attachments: selectedFile
        ? [
            {
              url: URL.createObjectURL(selectedFile),
              contentType: selectedFile.type,
              title: selectedFile.name
            }
          ]
        : undefined
    };

    sendMessage({
      text: input,
      agentId: agents.A.id,
      selectedFile
    });
    setInput('');
  };

  const relayMessage = (message: TextResponse) => {
    if (!message.text.trim() && !message.attachments) {
      return;
    }
    if (!agents) {
      return;
    }

    if (message.user === agents.A.name) {
      sendMessage({
        text: message.text,
        agentId: agents.B.id,
        selectedFile: null
      });
      console.log('message has been sent to agentB');
    } else if (message.user === agents.B.name) {
      sendMessage({
        text: message.text,
        agentId: agents.A.id,
        selectedFile: null
      });
      console.log('message has been sent to agentA');
    }
  };

  const getAgents = async () => {
    const res = await fetch(ROUTES.getAgents());
    const data = await res.json();
    return { A: data.agents[0], B: data.agents[1] };
  };

  const handleTimeUp = () => {
    if (!agents) return;

    sendMessage({
      text: 'Will Bitcoin break through $100,000 within Q1 2025?',
      agentId: agents.A.id,
      selectedFile: null
    });
  };

  return (
    <ScrollArea className="h-auto">
      <div className="flex h-auto min-h-[500px] w-full flex-col">
        <div className="min-h-0 flex-1 overflow-y-auto p-4">
          <div className="space-y-6 p-6">
            {messages.length > 0 ? (
              messages.map((message, index) => (
                <div
                  key={index}
                  className={`flex ${
                    message.user === 'Eliza' ? 'justify-end' : 'justify-start'
                  } group`}
                >
                  <div
                    className={`flex ${
                      message.user === 'Eliza' ? 'flex-row' : 'flex-row-reverse'
                    } max-w-[80%] items-end space-x-2`}
                  >
                    {message.user === 'Eliza' ? (
                      <>
                        <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-[#00A29A]/10">
                          {message.user === 'Eliza' ? '🐂' : '🐻'}
                        </div>
                        <div>
                          <div className="rounded-2xl rounded-bl-none bg-[#00A29A]/10 px-4 py-2">
                            <p className="text-sm">{message.text}</p>
                          </div>
                        </div>
                      </>
                    ) : (
                      <>
                        <div>
                          <div className="rounded-2xl rounded-br-none bg-[#C73535]/10 px-4 py-2">
                            <p className="text-sm">{message.text}</p>
                          </div>
                        </div>
                        <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-[#C73535]/10">
                          {message.user === 'Eliza' ? '🐂' : '🐻'}
                        </div>
                      </>
                    )}
                  </div>
                </div>
              ))
            ) : (
              <div className="text-center text-muted-foreground">
                No messages yet.
              </div>
            )}
            <div ref={messagesEndRef} />
          </div>
        </div>
      </div>
    </ScrollArea>
  );
}
