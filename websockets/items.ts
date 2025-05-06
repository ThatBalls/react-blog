import { ChatSession, GenerativeModel, GoogleGenerativeAI } from "@google/generative-ai";

const systemInstruction = `You are a dungeon master creating magical items for D&D 5th edition. 
You will receive prompts to create items with specific criteria.
Your response should be structured as a JSON object with the following format:
{
  "itemName": string,
  "itemType": string,
  "itemDescription": string,
  "itemFeatures": {
    "featureTitle": string,
    "featureDescription": string
  }[]
}
Ensure all features are specific with concrete numbers for DCs, damage, and other mechanical effects.
Include rich sensory details in the item description including visual, tactile, and magical characteristics.`;

export const registerItemEvents = (io, socket) => {
  const apiKey = process.env.GEMINI_API_KEY;
  const modelString = process.env.GEMINI_MODEL;
  let chat: ChatSession;

  socket.on('items-start', (message) => {
    const genAI = new GoogleGenerativeAI(apiKey);
    const model = genAI.getGenerativeModel({ model: modelString, systemInstruction });
    chat = model.startChat();
  });

  socket.on('items-message', async (message) => {
    console.log(`Received item request: ${message}`);
    try {
      const result = await chat.sendMessageStream(message);
      for await (const chunk of result.stream) {
        const chunkText = chunk.text();
        socket.emit('items-chunk', chunkText);
        console.log(`Sent chunk: ${chunkText}`);
      }
      socket.emit('items-complete');
    } catch (error) {
      console.error('Gemini API error:', error);
      socket.emit('error', 'Failed to generate magic item');
    }
  });
}
