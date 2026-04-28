import api from "./api";
import { ApiResponse } from "@renthob/shared";

export const aiService = {
  sendMessage: (message: string, conversationId?: string) => 
    api.post<ApiResponse<{ content: string; conversationId: string }>>("/ai/chat", { message, conversationId }),
    
  getConversations: () => 
    api.get<ApiResponse<any[]>>("/ai/conversations"),
    
  deleteConversation: (id: string) => 
    api.delete(`/ai/conversations/${id}`),
};
