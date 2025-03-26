import { Button } from "react-bootstrap"
import { useState } from "react";

import { BrewContainer, BrewHeader, BrewTitle, BrewBody } from "../Brew.css"
import { BrewResponse } from "../BrewResponse";
import { generateEventTypes } from "../brewUtils";

const describerEvents = generateEventTypes('describer');

export const DescriberForm = () => {
  const [message, setMessage] = useState<string>("");
  const [sentMessage, setSentMessage] = useState<string>("");

  const onSend = () => {
    setSentMessage(message);
    setMessage("");
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
      <BrewResponse sentMessage={sentMessage} events={describerEvents} />
    </BrewBody>
  </BrewContainer>
  );
}