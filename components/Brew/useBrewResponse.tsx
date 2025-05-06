import { useState, useEffect } from "react";
import parse from 'html-react-parser';
import { EventTypes, socket } from "websockets/clientSocket";

// write a hook that uses the server API to generate a response to a message
export const useBrewResponse = (sentMessage: string, events: EventTypes) => {
  const [response, setResponse] = useState<string>("");
  const [isConnected, setIsConnected] = useState(false);
  const [transport, setTransport] = useState("N/A");
  const onConnect = () => {
    setIsConnected(true);
    setTransport(socket.io.engine.transport.name);

    socket.io.engine.on("upgrade", (transport) => {
      setTransport(transport.name);
    });
    socket.emit(events.start, 'Hello');
  }
  const onDisconnect = () => {
    setIsConnected(false);
    setTransport("N/A");
  }
  const onChunk = (data: string) => {
    setResponse((prevResponse) => {
      return prevResponse + data;
    });
  }
  const onMessageComplete = () => {
  }
  useEffect(() => {
    if (socket.connected) {
      onConnect();
    }
    socket.on("connect", onConnect);
    socket.on("disconnect", onDisconnect);
    socket.on(events.chunk, onChunk);
    socket.on(events.complete, onMessageComplete);
    return () => {
      socket.off("connect", onConnect);
      socket.off("disconnect", onDisconnect);
      socket.off(events.chunk, onChunk);
      socket.off(events.complete, onMessageComplete);
    }
  }, []);
  useEffect(() => {
    if (isConnected) {
      setResponse('');
      socket.emit(events.message, sentMessage);
    }
  }
  , [sentMessage]);

  const parseMsg = (msg: string) => {
    if (msg.length > 6) {
      // remove starting ```html and ending ```
      msg = msg.replace(/^```html/, '');
      msg = msg.replace(/```\s*$/, '');
      return parse(msg);
    }
    return '';
  };
  return parseMsg(response);
}
