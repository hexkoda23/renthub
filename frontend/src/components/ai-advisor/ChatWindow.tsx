import { useState, useEffect, useRef } from "react";
import { Bot, Send, User } from "lucide-react";
import { Button } from "../ui";
import { aiService } from "../../services/ai.service";
import { cn } from "../ui";

interface Message {
  role: "user" | "assistant";
  content: string;
}

export const ChatWindow = () => {
  const [messages, setMessages] = useState<Message[]>([]);
  const [input, setInput] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [conversationId, setConversationId] = useState<string | undefined>();
  const scrollRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
    }
  }, [messages, isLoading]);

  const handleSend = async () => {
    if (!input.trim() || isLoading) return;

    const userMessage = input.trim();
    setInput("");
    setMessages(prev => [...prev, { role: "user", content: userMessage }]);
    setIsLoading(true);

    try {
      const response = await aiService.sendMessage(userMessage, conversationId);
      const { content, conversationId: newId } = response.data.data;
      
      setMessages(prev => [...prev, { role: "assistant", content }]);
      setConversationId(newId);
    } catch (error) {
      setMessages(prev => [...prev, { role: "assistant", content: "Sorry, I encountered an error. Please try again." }]);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="flex h-[600px] flex-col rounded-rent border border-neutral-200 bg-white shadow-xl">
      <div className="flex items-center gap-3 border-b border-neutral-100 p-4">
        <div className="flex h-10 w-10 items-center justify-center rounded-full bg-primary-light">
          <Bot className="h-6 w-6 text-primary" />
        </div>
        <div>
          <h3 className="font-bold font-sora">AI Neighbourhood Advisor</h3>
          <p className="text-xs text-neutral-500 text-green-500 flex items-center gap-1">
            <span className="h-1.5 w-1.5 rounded-full bg-green-500 animate-pulse" /> Always active
          </p>
        </div>
      </div>

      <div ref={scrollRef} className="flex-1 overflow-y-auto p-4 space-y-4">
        {messages.length === 0 && (
          <div className="flex flex-col items-center justify-center h-full text-center p-8">
            <Bot className="h-12 w-12 text-neutral-200 mb-4" />
            <h4 className="font-bold text-neutral-700">How can I help you today?</h4>
            <p className="text-sm text-neutral-500 mt-1 max-w-[280px]">
              Ask me about safe areas in Lagos, quiet spots in Abuja, or budget-friendly places for young professionals.
            </p>
          </div>
        )}
        
        {messages.map((msg, idx) => (
          <div key={idx} className={cn("flex gap-3", msg.role === "user" ? "flex-row-reverse" : "flex-row")}>
            <div className={cn(
              "flex h-8 w-8 shrink-0 items-center justify-center rounded-full text-white",
              msg.role === "user" ? "bg-secondary" : "bg-primary"
            )}>
              {msg.role === "user" ? <User className="h-4 w-4" /> : <Bot className="h-4 w-4" />}
            </div>
            <div className={cn(
              "rounded-2xl px-4 py-2.5 text-sm shadow-sm max-w-[80%]",
              msg.role === "user" 
                ? "bg-secondary text-white rounded-tr-none" 
                : "bg-neutral-100 text-neutral-800 rounded-tl-none border border-neutral-200"
            )}>
              {msg.content}
            </div>
          </div>
        ))}
        {isLoading && (
          <div className="flex gap-3">
             <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-primary text-white">
               <Bot className="h-4 w-4" />
             </div>
             <div className="bg-neutral-100 rounded-2xl rounded-tl-none px-4 py-2.5 border border-neutral-200">
               <div className="flex gap-1">
                 <span className="h-1.5 w-1.5 bg-neutral-400 rounded-full animate-bounce [animation-delay:-0.3s]" />
                 <span className="h-1.5 w-1.5 bg-neutral-400 rounded-full animate-bounce [animation-delay:-0.15s]" />
                 <span className="h-1.5 w-1.5 bg-neutral-400 rounded-full animate-bounce" />
               </div>
             </div>
          </div>
        )}
      </div>

      <div className="border-t border-neutral-100 p-4">
        <div className="flex gap-2">
          <input
            type="text"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyDown={(e) => e.key === "Enter" && handleSend()}
            placeholder="Type your message..."
            className="flex-1 rounded-rent border border-neutral-200 bg-neutral-50 px-4 py-2 text-sm focus:bg-white focus:outline-none focus:ring-2 focus:ring-primary"
          />
          <Button size="sm" onClick={handleSend} disabled={!input.trim() || isLoading}>
            <Send className="h-4 w-4" />
          </Button>
        </div>
      </div>
    </div>
  );
};
