import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import type { TextResponse } from "@/api";
import { useSendMessageMutation } from "@/api";
import { ImageIcon } from "lucide-react";
import { useEffect, useRef, useState } from "react";
//import { useParams } from "react-router-dom";
import { ROUTES } from "@/api/routes";

export default function Chat() {
    //const { agentId } = useParams();
    const [agentId, setAgentId] = useState<{A: string, B: string}>({A: "", B: ""});
    const [input, setInput] = useState("");
    const [messages, setMessages] = useState<TextResponse[]>([]);
    const [selectedFile, setSelectedFile] = useState<File | null>(null);
    const fileInputRef = useRef<HTMLInputElement>(null);
    const messagesEndRef = useRef<HTMLDivElement>(null);
    const { mutate: sendMessage, isPending } = useSendMessageMutation({ setMessages, setSelectedFile });
    const agentPort = {A: "3000", B: "3001"};
    const [isDebating, setIsDebating] = useState(true);
    const scrollToBottom = () => {
        messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
    };

    useEffect(() => {
        scrollToBottom();
        const lastMessage = messages[messages.length - 1];
        handleDebate(lastMessage);
        if (lastMessage && !isPending && isDebating) {  // 처리 중이 아닐 때만 실행
            relayMessage(lastMessage);
        }
    }, [messages, isPending]);

    const handleDebate = (lastMessage: TextResponse) => {
        if (!lastMessage) return;
        if (lastMessage.text.includes("lose")) {    // 여기서 특정 단어가 있으면 끝나는 것으로 판단
            setIsDebating(false);
            console.log("debate is over");
        }
    };

    useEffect(() => {
        getAgentId().then((data) => setAgentId(data));
    }, []);

    const handleSubmit = async (e: React.FormEvent) => { // 이 곳이 엘리자한테 텍스트 보내는 곳. 여길 좀 집중공략해야 할 덧
        e.preventDefault();
        if ((!input.trim() && !selectedFile) || !agentId) return;

        // Add user message immediately to state
        const userMessage: TextResponse = {     // 유저 메시지를 에이전트 끼리 메시지로 바꿔야 함. 내일 생각해보셈
            text: input,
            user: "user",
            attachments: selectedFile ? [{ url: URL.createObjectURL(selectedFile), contentType: selectedFile.type, title: selectedFile.name }] : undefined,
        };
        //setMessages((prev) => [...prev, userMessage]);

        sendMessage({ text: input, agentId: agentId.A, selectedFile, agentPort: agentPort.A}); // 여기서 eliza한테 메시지 보냄. e.target.value를 agent의 응답으로 사용
        setInput("");       // input 초기화
    };

    const relayMessage = (message: TextResponse) => {
        if ((!message.text.trim() && !message.attachments) || !agentId) {
            return;
        }

        if (message.user === "agentA") {
            sendMessage({
                text: message.text,
                agentId: agentId.B,
                selectedFile: null,
                agentPort: agentPort.B,
            });
            console.log("message has been sent to agentB");
        } else if (message.user === "agentB") {
            sendMessage({
                text: message.text,
                agentId: agentId.A,
                selectedFile: null,
                agentPort: agentPort.A,
            });
            console.log("message has been sent to agentA");
        }
    };

    const handleFileSelect = () => {
        fileInputRef.current?.click();
    };

    const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0];
        if (file && file.type.startsWith('image/')) {
            setSelectedFile(file);
        }
    };

    const getAgentId = async () => {
        const resA = await fetch(ROUTES.getAgents(agentPort.A));
        const resB = await fetch(ROUTES.getAgents(agentPort.B));
        const dataA = await resA.json();
        const dataB = await resB.json();
        return {A: dataA.agents[0].id, B: dataB.agents[0].id};
    };

    return (
        <div className="flex flex-col h-screen max-h-screen w-full">
            <div className="flex-1 min-h-0 overflow-y-auto p-4">
                <div className="max-w-3xl mx-auto space-y-4">
                    {messages.length > 0 ? (
                        messages.map((message, index) => (
                            <div
                                key={index}
                                className={`text-left flex ${
                                    message.user === "agentA"
                                        ? "justify-end"
                                        : "justify-start"
                                }`}
                            >
                                <pre
                                    className={`max-w-[80%] rounded-lg px-4 py-2 whitespace-pre-wrap ${
                                        message.user === "user"
                                            ? "bg-primary text-primary-foreground"
                                            : "bg-muted"
                                    }`}
                                >
                                    {message.text}
                                    {message.attachments?.map((attachment, i) => (
                                        attachment.contentType.startsWith('image/') && (
                                            <img
                                                key={i}
                                                src={message.user === "user"
                                                    ? attachment.url
                                                    : attachment.url.startsWith('http')
                                                        ? attachment.url
                                                        : `http://localhost:3000/media/generated/${attachment.url.split('/').pop()}`
                                                }
                                                alt={attachment.title || "Attached image"}
                                                className="mt-2 max-w-full rounded-lg"
                                            />
                                        )
                                    ))}
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

            <div className="border-t p-4 bg-background">
                <div className="max-w-3xl mx-auto">
                    <form onSubmit={handleSubmit} className="flex gap-2">
                        <input
                            type="file"
                            ref={fileInputRef}
                            onChange={handleFileChange}
                            accept="image/*"
                            className="hidden"
                        />
                        <Input
                            value={input}
                            onChange={(e) => setInput(e.target.value)}
                            placeholder="Type a message..."
                            className="flex-1"
                            disabled={isPending}
                        />
                        <Button
                            type="button"
                            variant="outline"
                            size="icon"
                            onClick={handleFileSelect}
                            disabled={isPending}
                        >
                            <ImageIcon className="h-4 w-4" />
                        </Button>
                        <Button type="submit" disabled={isPending}>
                            {isPending ? "..." : "Send"}
                        </Button>
                    </form>
                    {selectedFile && (
                        <div className="mt-2 text-sm text-muted-foreground">
                            Selected file: {selectedFile.name}
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
}
