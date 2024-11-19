import styled from "styled-components";
import { Button } from "react-bootstrap";

export const ChatContainer = styled.div`
  display: flex;
  flex-direction: column;
  height: 100%;
  width: 100%;
  color: white;
`;

export const ChatHeader = styled.div`
  display: flex;
  justify-content: center;
  padding: 1rem;
  border-bottom: 1px solid #ccc;
`;

export const ChatTitle = styled.h1`
  margin: 0;
`;

export const ChatBody = styled.form`
  flex-grow: 1;
  padding: 1rem;
  display: flex;
  flex-direction: column;
  gap: 1rem;
  width: 100%;
  overflow: hidden;

  button {
    max-width: 200px;
    width: 100%;
  }
`;

export const ChatArea = styled.div`
  flex-grow: 1;
  min-height: 0;
  display: flex;
  flex-direction: column;
  overflow-y: auto;
  padding: 1rem;
`;

export const ChatFooter = styled.div`
  padding: 1rem;
  display: flex;
  flex-direction: column;
  gap: 1rem;
`;

export const ChatInputContainer = styled.div`
  display: flex;
  min-width: 300px;
  flex-wrap: wrap;
  justify-content: center;
  width: 100%;
  gap: 1rem;
`;

export const ChatInput = styled.textarea`
  padding: 0.5rem;
  background-color: rgba(55,65,81,1);
  min-width: 300px;
  flex: 1;
  color: white;
`;

export const ChatBubble = styled.div<{ isUser: boolean }>`
  display: inline-block;
  align-self: ${({ isUser }) => (isUser ? "flex-end" : "flex-start")};
  background-color: ${({ isUser }) => (isUser ? "rgba(16,185,129,1)" : "rgba(59,130,246,1)")};
  color: white;
  border-radius: 0.5rem;
  padding: 0.5rem;
  margin-bottom: 0.5rem;
`;

export const NewChatButton = styled(Button)`
  align-self: flex-end;
  background-color: rgba(239,68,68,1);
`;