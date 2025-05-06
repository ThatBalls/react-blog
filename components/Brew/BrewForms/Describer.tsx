import { Button } from "react-bootstrap"
import { useState } from "react";

import { BrewContainer, BrewHeader, BrewTitle, BrewBody, ResponseArea } from "../Brew.css"
import { generateEventTypes } from "../brewUtils";
import { useBrewResponse } from "../useBrewResponse";

const describerEvents = generateEventTypes('describer');

/* `Write a detailed physical description of a fantasy character that meets the following criteria:
${this.species ? `Species: "${this.species}"` : ""}
${this.characterClass? `Class: "${this.characterClass}"` : ""}
${this.gender ?` Gender: "${this.gender}"` : ""}
${this.additionalDetails ? `Additional details: "${this.additionalDetails}"` : ""}` */

export const DescriberForm = () => {
  const [sentMessage, setSentMessage] = useState<string>("");
  const [species, setSpecies] = useState<string>("");
  const [characterClass, setCharacterClass] = useState<string>("");
  const [gender, setGender] = useState<string>("");
  const [additionalDetails, setAdditionalDetails] = useState<string>("");

  const brewResponse = useBrewResponse(sentMessage, describerEvents);

  const clearInputs = () => {
    setSpecies("");
    setCharacterClass("");
    setGender("");
    setAdditionalDetails("");
  };

  const onSend = (e) => {
    e.preventDefault();
    const message = `Write a detailed physical description of a fantasy character that meets the following criteria:
    ${species ? `Species: "${species}"` : ""}
    ${characterClass ? `Class: "${characterClass}"` : ""}
    ${gender ? `Gender: "${gender}"` : ""}
    ${additionalDetails ? `Additional details: "${additionalDetails}"` : ""}`;
    setSentMessage(message);
    clearInputs();
  };

  return (
  <BrewContainer>
    <BrewHeader>
      <BrewTitle>Character Describer</BrewTitle>
    </BrewHeader>
    <BrewBody onSubmit={onSend}>
      <div >
        <label htmlFor="species">Species</label>
        <input type="text" id="species" value={species} onChange={(e) => setSpecies(e.target.value)} required />
      </div>
      <div>
        <label htmlFor="class">Class</label>
        <input type="text" id="class" value={characterClass} onChange={(e) => setCharacterClass(e.target.value)} />
      </div>
      <div>
        <label htmlFor="gender">Gender</label>
        <input type="text" id="gender" value={gender} onChange={(e) => setGender(e.target.value)} />
      </div>
      <div>
        <label htmlFor="additionalDetails">Additional Details</label>
        <textarea id="additionalDetails" rows={4} value={additionalDetails} onChange={(e) => setAdditionalDetails(e.target.value)}></textarea>
      </div>
      <Button type="submit">Submit</Button>
      <ResponseArea>{brewResponse}</ResponseArea>
    </BrewBody>
  </BrewContainer>
  );
}