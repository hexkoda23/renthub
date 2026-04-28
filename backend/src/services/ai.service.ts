import Groq from "groq-sdk";
import { env } from "../config/env";
import { db } from "../config/firebase";

const groq = new Groq({ apiKey: env.GROQ_API_KEY });

const SYSTEM_PROMPT = `
You are RentHob's AI Neighbourhood Advisor. You help users find the best areas to live in Nigeria based on their budget, lifestyle, and property needs (Rent, Buy, or Shortlet). 
You help users decide whether to buy or rent based on their financial situation, how long they plan to stay, and market conditions in their target area in Nigeria. 
When a user asks about buying, recommend areas with good appreciation potential and mention typical property prices.

You know about safety scores, traffic, affordability, and vibes of Lagos, Abuja, Port Harcourt, Ibadan, Kano neighbourhoods. 

Your recommendations should include:
- Specific neighbourhood names.
- Why it fits the user's criteria.
- Estimated rent/sale range (if applicable).
- A quick score (1-10) for Safety, Affordability, and Traffic.

Always give specific, actionable neighbourhood recommendations.
`;

export class AIService {
  static async getChatResponse(userId: string, message: string, conversationId?: string) {
    const convoRef = conversationId 
      ? db.collection("conversations").doc(conversationId)
      : db.collection("conversations").doc();
    
    const convoDoc = await convoRef.get();
    let history: any[] = [];
    
    if (convoDoc.exists) {
      history = convoDoc.data()?.messages || [];
    }

    const messages = [
      { role: "system", content: SYSTEM_PROMPT },
      ...history,
      { role: "user", content: message }
    ];

    const response = await groq.chat.completions.create({
      model: env.AI_MODEL,
      messages: messages as any,
    });

    const assistantMessage = response.choices[0].message.content;

    // Save to conversation history
    const updatedMessages = [
      ...history,
      { role: "user", content: message, timestamp: new Date().toISOString() },
      { role: "assistant", content: assistantMessage, timestamp: new Date().toISOString() }
    ];

    await convoRef.set({
      userId,
      messages: updatedMessages,
      lastUpdated: new Date().toISOString(),
    }, { merge: true });

    return { 
      content: assistantMessage, 
      conversationId: convoRef.id 
    };
  }

  static async getUserConversations(userId: string) {
    const snapshot = await db.collection("conversations")
      .where("userId", "==", userId)
      .orderBy("lastUpdated", "desc")
      .get();

    return snapshot.docs.map((doc: any) => ({ id: doc.id, ...doc.data() }));
  }

  static async deleteConversation(id: string) {
    await db.collection("conversations").doc(id).delete();
  }
}
