import { ChatSession, GenerativeModel, GoogleGenerativeAI } from "@google/generative-ai";

const systemInstruction = `You are a dungeon master describing fantasy scenes and locations.
You will receive prompts to create vivid scene descriptions with specific criteria.
Your response should be structured as a JSON object with the following format:
{
  "sceneName": string,
  "sceneDescription": string,
  "sceneDetails": {
    "sights": string[],
    "sounds": string[],
    "smells": string[],
    "atmosphere": string,
    "points_of_interest": {
      "name": string,
      "description": string
    }[]
  }
}
Include rich sensory details and create an immersive atmosphere that brings the scene to life.`;

export const registerSceneEvents = (io, socket) => {
  const apiKey = process.env.GEMINI_API_KEY;
  const modelString = process.env.GEMINI_MODEL;
  let chat: ChatSession;

  socket.on('scene-start', (message) => {
    const genAI = new GoogleGenerativeAI(apiKey);
    const model = genAI.getGenerativeModel({ model: modelString, systemInstruction });
    chat = model.startChat();
  });

  socket.on('scene-message', async (message) => {
    console.log(`Received scene request: ${message}`);
    try {
      const result = await chat.sendMessageStream(message);
      for await (const chunk of result.stream) {
        const chunkText = chunk.text();
        socket.emit('scene-chunk', chunkText);
        console.log(`Sent chunk: ${chunkText}`);
      }
      socket.emit('scene-complete');
    } catch (error) {
      console.error('Gemini API error:', error);
      socket.emit('error', 'Failed to generate scene');
    }
  });
} 