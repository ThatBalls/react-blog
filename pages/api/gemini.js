/* const { GoogleGenerativeAI } = require("@google/generative-ai");
const WebSocket = require('ws');
import httpProxy from 'http-proxy';
import { stubTrue } from 'lodash';
import { Server } from 'socket.io'

const proxy = httpProxy.createProxyServer();

const SocketHandler = (req, res) => {
  if (res.socket.server.io) {
    console.log('Socket is already running')
  } else {
    console.log('Socket is initializing')
    const io = new Server(res.socket.server)
    res.socket.server.io = io
  }
  res.end()
}

export default SocketHandler

const apiKey = process.env.GEMINI_API_KEY;

if (!apiKey) {
  console.error("GEMINI API KEY NOT FOUND")
}

const wss = new WebSocket.Server({ port: 8080 });

wss.on('connection', ws => {
  const genAI = new GoogleGenerativeAI(apiKey);
  const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" });
  const chat = model.startChat({
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

  ws.on('message', async message => {
    console.log(`Received: ${message}`);
    try {
      const result = await chat.sendMessageStream(message);
      for await (const chunk of result.stream) {
        const chunkText = chunk.text();
        ws.send(chunkText);
      }
    } catch (error) {
      console.error('Gemini API error:', error);
      ws.send('Gemini API request failed');
    }
  });

  ws.on('close', (code, reason) => {
    console.log('Client disconnected:', code, reason);
  });

  ws.send('Welcome to the Gemini chat!');
}); */