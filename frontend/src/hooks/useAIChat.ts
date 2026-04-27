import { useChatStore } from '../store/chatStore';
import { aiService } from '../services/ai.service';
import { useCallback } from 'react';

export const useAIChat = () => {
  const { messages, conversationId, isTyping, addMessage, setTyping, setConversationId } = useChatStore();

  const sendMessage = useCallback(async (text: string) => {
    if (!text.trim()) return;

    // Add user message optimistically
    addMessage({ role: 'user', content: text, timestamp: new Date().toISOString() });
    setTyping(true);

    try {
      const { data } = await aiService.sendMessage(text, conversationId || undefined);
      if (!conversationId && data.data.conversationId) {
        setConversationId(data.data.conversationId);
      }
      addMessage({ role: 'assistant', content: data.data.content, timestamp: new Date().toISOString() });
    } catch (err) {
      addMessage({ role: 'assistant', content: 'Sorry, I encountered an error. Please try again.', timestamp: new Date().toISOString() });
    } finally {
      setTyping(false);
    }
  }, [conversationId, addMessage, setTyping, setConversationId]);

  return { messages, isTyping, sendMessage };
};
