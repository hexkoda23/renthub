import React from 'react';
import { cn } from '../ui';

interface ChatMessageProps {
  message: { role: 'user' | 'assistant', content: string };
}

export const ChatMessage: React.FC<ChatMessageProps> = ({ message }) => {
  const isUser = message.role === 'user';
  return (
    <div className={cn("flex w-full", isUser ? "justify-end" : "justify-start")}>
      <div className={cn(
        "max-w-[75%] p-3 rounded-2xl whitespace-pre-wrap text-sm shadow-sm",
        isUser ? "bg-primary text-white rounded-tr-none" : "bg-neutral-100 text-neutral-900 border rounded-tl-none"
      )}>
        {message.content}
      </div>
    </div>
  );
};
