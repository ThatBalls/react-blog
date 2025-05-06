import { ChatSession, GenerativeModel, GoogleGenerativeAI } from "@google/generative-ai";

const systemInstruction = `You are a dungeon master creating subclasses for D&D 5th edition.
You will receive prompts to create subclasses with specific criteria.
Your response should be structured as a JSON object with the following format:
{
  "subclassName": string,
  "subclassDescription": string,
  "subclassFeatures": {
    "featureTitle": string,
    "featureLevel": number,
    "featureDescription": string
  }[]
}
Ensure all features are specific with concrete numbers for DCs, damage, and other mechanical effects.
Include rich thematic descriptions and ensure features align with the base class mechanics.`;

export const registerSubclassEvents = (io, socket) => {
  const apiKey = process.env.GEMINI_API_KEY;
  const modelString = process.env.GEMINI_MODEL;
  let chat: ChatSession;

  socket.on('subclass-start', (message) => {
    const genAI = new GoogleGenerativeAI(apiKey);
    const model = genAI.getGenerativeModel({ model: modelString, systemInstruction });
    chat = model.startChat();
  });

  socket.on('subclass-message', async (message) => {
    console.log(`Received subclass request: ${message}`);
    try {
      const result = await chat.sendMessageStream(message);
      for await (const chunk of result.stream) {
        const chunkText = chunk.text();
        socket.emit('subclass-chunk', chunkText);
        console.log(`Sent chunk: ${chunkText}`);
      }
      socket.emit('subclass-complete');
    } catch (error) {
      console.error('Gemini API error:', error);
      socket.emit('error', 'Failed to generate subclass');
    }
  });
} 