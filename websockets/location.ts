import { ChatSession, GenerativeModel, GoogleGenerativeAI } from "@google/generative-ai";

const systemInstruction = `You are a dungeon master creating detailed fantasy locations for D&D 5th edition.
You will receive prompts to create locations with specific criteria.
Your response should be structured as a JSON object with the following format:
{
  "locationName": string,
  "locationDescription": string,
  "locationDetails": {
    "architecture": string,
    "inhabitants": string,
    "history": string,
    "secrets": string,
    "notable_features": {
      "name": string,
      "description": string
    }[],
    "hooks": {
      "hook": string,
      "consequence": string
    }[]
  }
}
Include rich descriptive details about the location's appearance, history, and current state.
Add interesting plot hooks and secrets that DMs can use in their games.`;

export const registerLocationEvents = (io, socket) => {
  const apiKey = process.env.GEMINI_API_KEY;
  const modelString = process.env.GEMINI_MODEL;
  let chat: ChatSession;

  socket.on('location-start', (message) => {
    const genAI = new GoogleGenerativeAI(apiKey);
    const model = genAI.getGenerativeModel({ model: modelString, systemInstruction });
    chat = model.startChat();
  });

  socket.on('location-message', async (message) => {
    console.log(`Received location request: ${message}`);
    try {
      const result = await chat.sendMessageStream(message);
      for await (const chunk of result.stream) {
        const chunkText = chunk.text();
        socket.emit('location-chunk', chunkText);
        console.log(`Sent chunk: ${chunkText}`);
      }
      socket.emit('location-complete');
    } catch (error) {
      console.error('Gemini API error:', error);
      socket.emit('error', 'Failed to generate location');
    }
  });
} 