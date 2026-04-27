import React, { useState } from 'react';
import { Button } from '../ui';

export const ChatInput: React.FC<{ onSend: (msg: string) => void, disabled: boolean }> = ({ onSend, disabled }) => {
  const [text, setText] = useState('');

  const handleSend = () => {
    if (!text.trim()) return;
    onSend(text);
    setText('');
  };

  return (
    <div className="p-3 border-t bg-neutral-50 flex gap-2">
      <textarea
        value={text}
        onChange={(e) => setText(e.target.value)}
        placeholder="Type a message..."
        className="flex-1 max-h-32 min-h-[40px] resize-none rounded-md border p-2 text-sm focus:outline-none focus:ring-1 focus:ring-primary"
        onKeyDown={(e) => {
          if (e.key === 'Enter' && !e.shiftKey) {
            e.preventDefault();
            handleSend();
          }
        }}
      />
      <Button onClick={handleSend} disabled={disabled || !text.trim()} size="sm">Send</Button>
    </div>
  );
};
