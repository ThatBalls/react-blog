const { createServer } = require('node:http');
const next = require('next');
const { Server } = require('socket.io');

const dev = process.env.NODE_ENV !== "production";
const hostname = "localhost";
const port = process.env.PORT || 3000;
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