import { create } from 'zustand';

interface ChatMessage {
  role: 'user' | 'assistant';
  content: string;
  timestamp: string;
}

interface ChatState {
  messages: ChatMessage[];
  conversationId: string | null;
  isTyping: boolean;
  addMessage: (msg: ChatMessage) => void;
  setTyping: (isTyping: boolean) => void;
  setConversationId: (id: string) => void;
}

export const useChatStore = create<ChatState>((set) => ({
  messages: [],
  conversationId: null,
  isTyping: false,
  addMessage: (msg) => set((state) => ({ messages: [...state.messages, msg] })),
  setTyping: (isTyping) => set({ isTyping }),
  setConversationId: (id) => set({ conversationId: id }),
}));
