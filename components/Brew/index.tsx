import { useEffect, useState } from 'react';
import parse from 'html-react-parser';

import { BrewBody, BrewContainer, BrewHeader, BrewTitle, ResponseArea } from "./Brew.css";
import { EventTypes, socket } from '../../websockets/clientSocket';
import { Button } from 'react-bootstrap';

interface BrewProps {
  events: EventTypes;
}

export const Brew = ({ events }: BrewProps) => {
  const [isConnected, setIsConnected] = useState(false);
  const [transport, setTransport] = useState("N/A");
  const [message, setMessage] = useState<string>("");
  const [response, setResponse] = useState<string>("");

  const onConnect = () => {
      setIsConnected(true);
      setTransport(socket.io.engine.transport.name);

      socket.io.engine.on("upgrade", (transport) => {
          setTransport(transport.name);
      });
      socket.emit(events.start, 'Hello');
  };

  const onDisconnect = () => {
      setIsConnected(false);
      setTransport("N/A");
  };


  const onChunk = (data: string) => {
    setResponse((prevResponse) => {
        return prevResponse + data;
    });
};

  const onMessageComplete = () => {
  };

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
      };
  }, []);

  const onSend = (event: React.FormEvent<HTMLButtonElement>) => {
    event.preventDefault();
    if (isConnected) {
        socket.emit(events.message, message);
        setMessage("");
    } else {
        console.error('WebSocket not connected or message is empty');
    }
  };

  const parseMsg = (msg: string) => {
    if (msg.length > 6) {
      // remove starting ```html and ending ```
      msg = msg.replace(/^```html/, '');
      msg = msg.replace(/```\s*$/, '');
      return parse(msg);
    }
    return '';
  };

    return (
        <BrewContainer>
          <BrewHeader>
            <BrewTitle>Character Describer</BrewTitle>
          </BrewHeader>
          <BrewBody>
            <p>Enter your character's short description below:</p>
            <textarea value={message} onChange={(e) => setMessage(e.target.value)}></textarea>
            <Button onClick={onSend}>Submit</Button>
            <ResponseArea>
              {parseMsg(response)}
            </ResponseArea>
          </BrewBody>
        </BrewContainer>
    );
};