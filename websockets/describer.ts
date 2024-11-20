import { GenerativeModel, GoogleGenerativeAI } from "@google/generative-ai";

const systemInstruction = `You are a dungeon master describing a fantasy character. Provide a detailed description of a given character including physical appearance, personality, distinguishing characteristics.
Provide response in parseable html elements.`

export const registerDescriberEvents = (io, socket) => {
    const apiKey = process.env.GEMINI_API_KEY;
    const modelString = process.env.GEMINI_MODEL;
    let chat;
    socket.on('describer-start', (message) => {
      const genAI = new GoogleGenerativeAI(apiKey);
      const model = genAI.getGenerativeModel({ model: modelString, systemInstruction });
      chat = model.startChat();
    });
    socket.on('describer-message', async (message) => {
      console.log(`Received: ${message}`);
      try {
        const result = await chat.sendMessageStream(`Write a detailed physical description of a fantasy character that meets the following criteria: ${message}`);
        for await (const chunk of result.stream) {
          const chunkText = chunk.text();
          socket.emit('describer-chunk', chunkText);
          console.log(`Sent: ${chunkText}`);
        }
        socket.emit('describer-complete');
      } catch (error) {
        console.error('Gemini API error:', error);
        socket.emit('error', 'Gemini API request failed');
      }
    });
}