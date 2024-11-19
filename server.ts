import { createServer } from "http";
import next from "next";
import { Server } from "socket.io";

import { registerGeminiEvents } from "./websockets/gemini";
import { registerAssistantEvents } from "./websockets/assistant";
import { registerDescriberEvents } from "websockets/describer";

const dev = process.env.NODE_ENV !== "production";
const hostname = "localhost";
const port = Number(process.env.PORT) || 3000;
// when using middleware `hostname` and `port` must be provided below
const app = next({ dev, hostname, port });
const handler = app.getRequestHandler();

app.prepare().then(() => {
    const httpServer = createServer(handler);

    const io = new Server(httpServer, {
        // Add CORS configuration if needed
        cors: {
            origin: `http://${hostname}:${port}`, // Or your frontend origin
            methods: ["GET", "POST"], // Allowed methods
        },
    });

    console.log("Socket.IO server initialized");

    io.on("connection", (socket) => {
        console.log("Client connected:", socket.id); // Log the client's socket ID

        // ... your socket handling logic
        socket.on("disconnect", () => {
            console.log("Client disconnected:", socket.id);
        });

        registerGeminiEvents(io, socket);
        registerAssistantEvents(io, socket);
        registerDescriberEvents(io, socket);
    });

    httpServer
        .once("error", (err) => {
            console.error("HTTP Server Error:", err); // Enhanced error logging
            process.exit(1);
        })
        .listen(port, () => {
            console.log(`> Ready on http://${hostname}:${port}`);
        });
});