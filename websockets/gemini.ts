import { GoogleGenerativeAI } from "@google/generative-ai";

export const registerGeminiEvents = (io, socket) => {
    const apiKey = process.env.GEMINI_API_KEY;
    let chat;
    socket.on('gemini-start', (message) => {
      const genAI = new GoogleGenerativeAI(apiKey);
      const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" });
      chat = model.startChat({
        history: [
          {
            role: "user",
            parts: [{ text: "Hello" }],
          },
          {
            role: "model",
            parts: [{ text: "Great to meet you. What would you like to know?" }],
          },
        ],
      });
    });
    socket.on('gemini-message', async (message) => {
      console.log(`Received: ${message}`);
      try {
        const result = await chat.sendMessageStream(message);
        for await (const chunk of result.stream) {
          const chunkText = chunk.text();
          socket.emit('gemini-chunk', chunkText);
          console.log(`Sent: ${chunkText}`);
        }
        socket.emit('gemini-complete');
      } catch (error) {
        console.error('Gemini API error:', error);
        socket.emit('gemini-error', 'Gemini API request failed');
      }
    });
}