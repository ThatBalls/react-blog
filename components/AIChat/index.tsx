import { Button } from "react-bootstrap";
import { useState, useEffect } from 'react';
import parse from 'html-react-parser';

import { EventTypes, socket } from '../../websockets/clientSocket';
import { ChatArea, ChatBody, ChatBubble, ChatContainer, ChatFooter, ChatHeader, ChatInput, ChatInputContainer, ChatTitle, NewChatButton } from "./Chat.css";
import { generateEventTypes } from "components/Brew/brewUtils";

interface AIChatProps {
  events: EventTypes;
}

const chatEvents = generateEventTypes('assistant');

const initialMessage = `<strong>Hail and well met!</strong> I am Brewster and I can assist you with any of your planning needs.
        Here are some examples of how I can help:
        <ul>
        <li>Writing details for a location (such as a tavern)</li>
        <li>Creating an NPC</li>
        <li>Writing dialogue</li>
        <li>Writing adventure hooks</li>
        <li>Helping flesh out adventure details</li>
        </ul>`

export const AIChat = () => {
  const [isConnected, setIsConnected] = useState(false);
  const [transport, setTransport] = useState("N/A");
  const [message, setMessage] = useState<string>("");
  const [history, setHistory] = useState<string[]>([initialMessage]);
  const [inProgressIndex, setInProgressIndex] = useState<number>(-1);
  const [isUserScrolling, setIsUserScrolling] = useState(false);

  const onConnect = () => {
      setIsConnected(true);
      setTransport(socket.io.engine.transport.name);

      socket.io.engine.on("upgrade", (transport) => {
          setTransport(transport.name);
      });
      socket.emit(chatEvents.start, 'Hello');
  };

  const onDisconnect = () => {
      setIsConnected(false);
      setTransport("N/A");
  };

  const scrollToBottom = () => {
    if (!isUserScrolling) {
      window.scrollTo(0, document.body.scrollHeight);
    }
  };

  useEffect(() => {
    scrollToBottom();
  }, [history]);


  const onChunk = (data: string) => {
    setHistory((prevHistory) => {
        const newHistory = [...prevHistory];
        // Now inProgressIndex will always be the current value
        if (inProgressIndex !== -1) {
            if (newHistory[inProgressIndex]) {
              newHistory[inProgressIndex] += data;
            } else {
              newHistory.push(data);
            }
        } else {
            console.error("inProgressIndex is out of range or history is empty", inProgressIndex, prevHistory);
        }
        return newHistory;
    });
};

  const onMessageComplete = () => {
      setInProgressIndex(-1);
      socket.off(chatEvents.chunk, onChunk);
  };

  useEffect(() => {
      if (socket.connected) {
          onConnect();
      }

      document.addEventListener("scroll", () => {
        setIsUserScrolling(true);
      });

      socket.on("connect", onConnect);
      socket.on("disconnect", onDisconnect);
      socket.on(chatEvents.complete, onMessageComplete);

      return () => {
          socket.off("connect", onConnect);
          socket.off("disconnect", onDisconnect);
          socket.off(chatEvents.chunk, onChunk);
          socket.off(chatEvents.complete, onMessageComplete);
      };
  }, []);

  useEffect(() => {
    if (inProgressIndex !== -1) {
      socket.off(chatEvents.chunk);
      socket.on(chatEvents.chunk, onChunk); // Attach listener when expecting chunks
    } else {
      socket.off(chatEvents.chunk); // Remove to prevent stale closures
    }
    // No cleanup function needed here - handled in the main useEffect
}, [inProgressIndex]); // Correct dependency array is very important

  const onSend = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    if (isConnected) {
        socket.emit(chatEvents.message, message);
        setHistory((prevHistory) => {
            const newHistory = [...prevHistory, message];
            setInProgressIndex(newHistory.length);
            return newHistory;
        });
        setMessage("");
        setIsUserScrolling(false);
    } else {
        console.error('WebSocket not connected or message is empty');
    }
  };

  const parseMsg = (msg: string, isUser) => {
    if (isUser) {
      return msg;
    } else if (msg.length > 6) {
      // remove starting ```html and ending ```
      msg = msg.replace(/^```html/, '');
      msg = msg.replace(/```\s*$/, '');
      return parse(msg);
    }
    return '';
  };

  const onMessageKeyDown = (event) => {
    if (
      event.key === "Enter" &&
      event.shiftKey === false &&
      inProgressIndex === -1 &&
      message.trim() !== ""
    ) {
      const sendButton = document.getElementById("sendButton");
      event.preventDefault();
      sendButton.click();
    }
  };

  return (
    <ChatContainer>
      <ChatHeader>
        <ChatTitle>DM Assistant</ChatTitle>
      </ChatHeader>
      <ChatBody onSubmit={onSend}>
        <ChatArea>
          {history.map((msg, index) => {
            const isUser = index % 2 === 1;
            return<ChatBubble key={index} isUser={isUser}>{parseMsg(msg, isUser)}</ChatBubble>
          })}
        </ChatArea>
        <ChatFooter>
          <ChatInputContainer>
            <ChatInput
                id="messageInput"
                type='text'
                value={message}
                onKeyDown={onMessageKeyDown}
                onChange={(e) => setMessage(e.target.value)}
            />
            <Button id="sendButton" type="submit">Send</Button>
          </ChatInputContainer>
          <NewChatButton onClick={() => {
            socket.disconnect();
            socket.connect();
            setHistory([initialMessage]);
            setInProgressIndex(-1);
          }
          }>
            New Chat
          </NewChatButton>
        </ChatFooter>
      </ChatBody>
    </ChatContainer>
  )
}