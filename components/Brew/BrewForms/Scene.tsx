/*const prompt = `Generate a concise, cohesive boxed text-style passage for a tabletop RPG scene set in the following location: "${this.sceneLocation}"
        ${this.additionalDetails ? `Include the following details: "${this.additionalDetails}"` : ""}
        Engage all five senses to create a vivid and immersive experience for the players. The description should be read aloud to the players. The passage should be purely descriptive, with no interrogative sentences and be no longer than three paragraphs. Do not list the senses; incorporate them throughout the description.`;
                    */

import { Button, Spinner } from "react-bootstrap"
import { useState, useEffect, useRef } from "react";
import styled from "styled-components";

import { BrewContainer, BrewHeader, BrewTitle, BrewBody, ResponseArea } from "../Brew.css"
import { generateEventTypes } from "../brewUtils";
import { useBrewResponse } from "../useBrewResponse";
import {  
  ContentDisplay,
  ContentTitle,
  ContentDescription,
  Section,
  SectionTitle,
  ContentList,
  ItemContainer,
  ItemTitle,
  ItemDescription,
  LoadingContainer,
  LoadingText
} from "./styles";

// Scene-specific styled components
const AtmosphereSection = styled(ItemContainer)`
  margin-bottom: 20px;
`;

interface SceneResponse {
  sceneName: string;
  sceneDescription: string;
  sceneDetails: {
    sights: string[];
    sounds: string[];
    smells: string[];
    atmosphere: string;
    points_of_interest: Array<{
      name: string;
      description: string;
    }>;
  };
}

const formatResponse = (response: string): React.ReactNode => {
  try {
    const jsonMatch = response.match(/\{[\s\S]*\}/);
    if (!jsonMatch) return response;

    const parsedResponse: SceneResponse = JSON.parse(jsonMatch[0]);

    return (
      <ContentDisplay>
        <ContentTitle>{parsedResponse.sceneName}</ContentTitle>
        <ContentDescription>{parsedResponse.sceneDescription}</ContentDescription>
        
        <Section>
          <SectionTitle>Sights</SectionTitle>
          <ContentList>
            {parsedResponse.sceneDetails.sights.map((sight, index) => (
              <li key={index}>{sight}</li>
            ))}
          </ContentList>
        </Section>

        <Section>
          <SectionTitle>Sounds</SectionTitle>
          <ContentList>
            {parsedResponse.sceneDetails.sounds.map((sound, index) => (
              <li key={index}>{sound}</li>
            ))}
          </ContentList>
        </Section>

        <Section>
          <SectionTitle>Smells</SectionTitle>
          <ContentList>
            {parsedResponse.sceneDetails.smells.map((smell, index) => (
              <li key={index}>{smell}</li>
            ))}
          </ContentList>
        </Section>

        <AtmosphereSection>
          <SectionTitle>Atmosphere</SectionTitle>
          <ContentDescription>{parsedResponse.sceneDetails.atmosphere}</ContentDescription>
        </AtmosphereSection>

        <Section>
          <SectionTitle>Points of Interest</SectionTitle>
          {parsedResponse.sceneDetails.points_of_interest.map((point, index) => (
            <ItemContainer key={index}>
              <ItemTitle>{point.name}</ItemTitle>
              <ItemDescription>{point.description}</ItemDescription>
            </ItemContainer>
          ))}
        </Section>
      </ContentDisplay>
    );
  } catch (error) {
    console.error('Error parsing response:', error);
    return response;
  }
};

const sceneTypes = [
  "Dungeon",
  "Wilderness",
  "Urban",
  "Castle",
  "Temple",
  "Tavern",
  "Shop",
  "Cave",
  "Forest",
  "Mountain",
  "Coastal",
  "Underground",
  "Planar"
];

const sceneEvents = generateEventTypes('scene');

export const SceneForm = () => {
  const [sentMessage, setSentMessage] = useState<string>("");
  const [sceneType, setSceneType] = useState<string>("");
  const [sceneDescription, setSceneDescription] = useState<string>("");
  const [isLoading, setIsLoading] = useState(false);
  const [isComplete, setIsComplete] = useState(false);
  
  const responseRef = useRef<HTMLDivElement>(null);

  const rawResponse = useBrewResponse(sentMessage, sceneEvents);

  useEffect(() => {
    if (sentMessage) {
      setIsLoading(true);
      setIsComplete(false);
    }
  }, [sentMessage]);

  useEffect(() => {
    if (rawResponse && typeof rawResponse === 'string') {
      const jsonMatch = rawResponse.match(/\{[\s\S]*\}/);
      if (jsonMatch) {
        try {
          JSON.parse(jsonMatch[0]);
          setIsLoading(false);
          setIsComplete(true);
          
          setTimeout(() => {
            responseRef.current?.scrollIntoView({ 
              behavior: 'smooth',
              block: 'start'
            });
          }, 100);
        } catch (e) {
          // JSON is not complete yet, keep loading
        }
      }
    }
  }, [rawResponse]);

  const renderResponse = () => {
    if (isLoading) {
      return (
        <LoadingContainer>
          <Spinner animation="border" role="status" style={{ color: '#d4af37' }} />
          <LoadingText>Creating your scene...</LoadingText>
        </LoadingContainer>
      );
    }

    if (isComplete && rawResponse) {
      return formatResponse(rawResponse as string);
    }

    return null;
  };

  const clearInputs = () => {
    setSceneType("");
    setSceneDescription("");
  };

  const onSend = (e) => {
    e.preventDefault();
    const message = `Create a detailed fantasy scene description${sceneType ? ` for a ${sceneType} location` : ""} with the following details: ${sceneDescription}. Include rich sensory details and points of interest.`;
    setSentMessage(message);
    clearInputs();
  };

  return (
    <BrewContainer>
      <BrewHeader>
        <BrewTitle>Scene Generator</BrewTitle>
      </BrewHeader>
      <BrewBody onSubmit={onSend}>
        <div>
          <label htmlFor="sceneType">Scene Type (Optional)</label>
          <select 
            id="sceneType" 
            value={sceneType} 
            onChange={(e) => setSceneType(e.target.value)}
          >
            <option value="">Select Scene Type</option>
            {sceneTypes.map((type) => (
              <option key={type} value={type}>{type}</option>
            ))}
          </select>
        </div>
        <div>
          <label htmlFor="sceneDescription">Scene Details</label>
          <textarea 
            id="sceneDescription" 
            rows={4} 
            value={sceneDescription} 
            onChange={(e) => setSceneDescription(e.target.value)}
            required
            placeholder="Describe the scene you want to create, including any specific details, themes, or elements"
          ></textarea>
        </div>
        <Button type="submit" disabled={isLoading}>Generate Scene</Button>
        <ResponseArea ref={responseRef}>
          {renderResponse()}
        </ResponseArea>
      </BrewBody>
    </BrewContainer>
  );
}