import { GoogleGenerativeAI, HarmBlockThreshold, HarmCategory } from "@google/generative-ai";

const safetySettings = [
  {
    category: HarmCategory.HARM_CATEGORY_HATE_SPEECH,
    threshold: HarmBlockThreshold.BLOCK_NONE,
  },
  {
    category: HarmCategory.HARM_CATEGORY_SEXUALLY_EXPLICIT,
    threshold: HarmBlockThreshold.BLOCK_NONE,
  },
  {
    category: HarmCategory.HARM_CATEGORY_HARASSMENT,
    threshold: HarmBlockThreshold.BLOCK_NONE,
  },
  {
    category: HarmCategory.HARM_CATEGORY_DANGEROUS_CONTENT,
    threshold: HarmBlockThreshold.BLOCK_NONE,
  },
];

const systemInstruction = `You are Brewster, an assistant for a dungeon master, providing guidance and creative suggestions specifically for Dungeons and Dragons 5th Edition.
        Prefer to use the 2024 ruleset whenever possible but don't constantly mention that you're using the 2024 rules.
        Provide response in parseable html elements.`

export const registerAssistantEvents = (io, socket) => {
    const apiKey = process.env.GEMINI_API_KEY;
    const modelString = process.env.GEMINI_MODEL;
    let chat;
    const history = [];
    socket.on('assistant-start', (message) => {
      const genAI = new GoogleGenerativeAI(apiKey);
      const model = genAI.getGenerativeModel({
        model: modelString,
        systemInstruction,
        safetySettings,
      });
      chat = model.startChat();
    });
    socket.on('assistant-message', async (message) => {
      //console.log(`Received: ${message}`);
      try {
        history.push(message);
        let fullResponse = '';
        const result = await chat.sendMessageStream(history);
        for await (const chunk of result.stream) {
          const chunkText = chunk.text();
          socket.emit('assistant-chunk', chunkText);
          //console.log(`Sent: ${chunkText}`);
          fullResponse += chunkText;
        }
        history.push(fullResponse);
        socket.emit('assistant-complete');
      } catch (error) {
        console.error('Gemini API error:', error);
        socket.emit('error', 'Gemini API request failed');
      }
    });
};