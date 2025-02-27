import type { Agents, TextResponse } from '@/api';
import { useSendMessageMutation } from '@/api';
import { useEffect, useRef, useState } from 'react';
import { ROUTES } from '@/api/routes';
import { Input } from './ui/input';
import { Button } from './ui/button';

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
    // 이 곳이 엘리자한테 텍스트 보내는 곳. 여길 좀 집중공략해야 할 덧
    e.preventDefault();
    if ((!input.trim() && !selectedFile) || !agents) return;

    // Add user message immediately to state
    const userMessage: TextResponse = {
      // 유저 메시지를 에이전트 끼리 메시지로 바꿔야 함.
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
    //setMessages((prev) => [...prev, userMessage]);

    sendMessage({
      text: input,
      agentId: agents.A.id,
      selectedFile
    }); // 여기서 eliza한테 메시지 보냄. e.target.value를 agent의 응답으로 사용
    setInput(''); // input 초기화
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
    return data;
  };

  return (
    <div className="flex h-screen max-h-screen w-full flex-col">
      <div className="min-h-0 flex-1 overflow-y-auto p-4">
        <div className="mx-auto max-w-3xl space-y-4">
          {messages.length > 0 ? (
            messages.map((message, index) => (
              <div
                key={index}
                className={`flex text-left ${
                  message.user === 'Eliza' ? 'justify-end' : 'justify-start'
                }`}
              >
                <pre className="max-w-[80%] whitespace-pre-wrap rounded-lg bg-muted px-4 py-2">
                  {message.user === 'Eliza' ? 'bull' : 'bear'}
                  {message.text}
                </pre>
              </div>
            ))
          ) : (
            <div className="text-center text-muted-foreground">
              No messages yet. Start a conversation!
            </div>
          )}
          <div ref={messagesEndRef} />
        </div>
      </div>

      <div className="border-t bg-background p-4">
        <div className="mx-auto max-w-3xl">
          <form onSubmit={handleSubmit} className="flex gap-2">
            <Input
              value={input}
              onChange={(e) => setInput(e.target.value)}
              placeholder="Type a message..."
              className="flex-1"
              disabled={isPending}
            />
            <Button type="submit" disabled={isPending}>
              {isPending ? '...' : 'Send'}
            </Button>
          </form>
        </div>
      </div>
    </div>
  );
}
