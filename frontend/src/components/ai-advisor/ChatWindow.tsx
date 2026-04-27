import { useState, useEffect, useRef } from "react";
import { Bot, Send, User, Sparkles } from "lucide-react";
import { Button } from "../ui";
import { aiService } from "../../services/ai.service";
import { cn } from "../../utils/cn";
import { motion, AnimatePresence } from "framer-motion";

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
      setMessages(prev => [...prev, { role: "assistant", content: "I'm sorry, I'm having trouble connecting right now. Please try again in a moment." }]);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="flex flex-col h-[700px] rounded-2xl border border-neutral-200 bg-white shadow-2xl overflow-hidden relative">
      {/* Decorative background element */}
      <div className="absolute top-0 right-0 w-64 h-64 bg-primary/5 blur-3xl rounded-full -mr-32 -mt-32 pointer-events-none" />
      
      {/* Header */}
      <div className="flex items-center justify-between border-b border-neutral-100 p-6 bg-white/50 backdrop-blur-md relative z-10">
        <div className="flex items-center gap-4">
          <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-primary shadow-lg shadow-primary/20">
            <Bot className="h-6 w-6 text-white" />
          </div>
          <div>
            <h3 className="font-display font-bold text-lg text-ink">Neighbourhood AI</h3>
            <p className="text-xs text-success flex items-center gap-1.5 font-medium">
              <span className="h-2 w-2 rounded-full bg-success animate-pulse" /> 
              Online & Ready
            </p>
          </div>
        </div>
        <div className="flex items-center gap-2">
          <div className="px-3 py-1 rounded-full bg-sand text-neutral-600 text-[10px] font-bold uppercase tracking-wider border border-neutral-200">
            Llama 3.3
          </div>
        </div>
      </div>

      {/* Chat Messages Area */}
      <div 
        ref={scrollRef} 
        className="flex-1 overflow-y-auto p-6 space-y-6 scrollbar-thin scrollbar-thumb-primary scrollbar-track-sand relative z-10"
      >
        <AnimatePresence initial={false}>
          {messages.length === 0 && (
            <motion.div 
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              className="flex flex-col items-center justify-center h-full text-center p-8"
            >
              <div className="h-20 w-20 rounded-3xl bg-sand flex items-center justify-center mb-6">
                <Sparkles className="h-10 w-10 text-primary/40" />
              </div>
              <h4 className="font-display font-bold text-xl text-ink mb-2">Start a conversation</h4>
              <p className="text-sm text-neutral-500 max-w-[320px] leading-relaxed">
                Ask me anything about Lagos real estate, safety, or neighbourhood vibes. I'm here to help you find your perfect home.
              </p>
            </motion.div>
          )}
          
          {messages.map((msg, idx) => (
            <motion.div 
              key={idx}
              initial={{ opacity: 0, y: 10, scale: 0.95 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              transition={{ duration: 0.3 }}
              className={cn("flex gap-4", msg.role === "user" ? "flex-row-reverse" : "flex-row")}
            >
              <div className={cn(
                "flex h-10 w-10 shrink-0 items-center justify-center rounded-xl shadow-sm",
                msg.role === "user" ? "bg-ink text-white" : "bg-sand text-primary"
              )}>
                {msg.role === "user" ? <User className="h-5 w-5" /> : <Bot className="h-5 w-5" />}
              </div>
              <div className={cn(
                "rounded-2xl px-5 py-3.5 text-sm shadow-sm max-w-[85%] leading-relaxed",
                msg.role === "user" 
                  ? "bg-primary text-white rounded-tr-none font-medium" 
                  : "bg-neutral-50 text-neutral-800 rounded-tl-none border border-neutral-100"
              )}>
                {msg.content}
              </div>
            </motion.div>
          ))}
          
          {isLoading && (
            <motion.div 
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              className="flex gap-4"
            >
               <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-sand text-primary">
                 <Bot className="h-5 w-5" />
               </div>
               <div className="bg-neutral-50 rounded-2xl rounded-tl-none px-6 py-4 border border-neutral-100">
                 <div className="flex gap-1.5">
                   <span className="h-2 w-2 bg-primary/40 rounded-full animate-bounce [animation-delay:-0.3s]" />
                   <span className="h-2 w-2 bg-primary/40 rounded-full animate-bounce [animation-delay:-0.15s]" />
                   <span className="h-2 w-2 bg-primary/40 rounded-full animate-bounce" />
                 </div>
               </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      {/* Input Area */}
      <div className="p-6 bg-white border-t border-neutral-100 relative z-10">
        <div className="flex gap-3 bg-sand/50 p-1.5 rounded-2xl border border-neutral-200 focus-within:border-primary focus-within:ring-4 focus-within:ring-primary/5 transition-all duration-300">
          <input
            type="text"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyDown={(e) => e.key === "Enter" && handleSend()}
            placeholder="Ask about a neighborhood..."
            className="flex-1 bg-transparent px-4 py-3 text-sm focus:outline-none text-ink placeholder:text-neutral-400"
          />
          <Button 
            size="icon" 
            onClick={handleSend} 
            disabled={!input.trim() || isLoading}
            className="h-11 w-11 rounded-xl bg-primary hover:bg-primary-dark shadow-lg shadow-primary/20 transition-all active:scale-95"
          >
            <Send className="h-5 w-5 text-white" />
          </Button>
        </div>
        <p className="text-[10px] text-center text-neutral-400 mt-4 uppercase tracking-widest font-bold">
          AI may provide inaccurate info. Verify important details.
        </p>
      </div>
    </div>
  );
};
