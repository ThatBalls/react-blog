/*const prompt = `You are a tabletop RPG writer for the game dungeons and dragons. Describe a location: ${this.shortDescription}\nThe location should have the following details: ${this.additionalDetails}. The result should be purely descriptive, with at least three adventuring hooks in the form of named people or things an adventuring party can interact with. Adventuring hooks should be specific tasks or challenges associated with the named NPCs or location. There should also be at least three things or locations of note within or near the area.`;*/

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
  ItemContainer,
  ItemTitle,
  ItemDescription,
  LoadingContainer,
  LoadingText
} from "./styles";

// Location-specific styled components
const HooksSection = styled(Section)`
  display: grid;
  gap: 15px;
`;

interface LocationResponse {
  locationName: string;
  locationDescription: string;
  locationDetails: {
    architecture: string;
    inhabitants: string;
    history: string;
    secrets: string;
    notable_features: Array<{
      name: string;
      description: string;
    }>;
    hooks: Array<{
      hook: string;
      consequence: string;
    }>;
  };
}

const formatResponse = (response: string): React.ReactNode => {
  try {
    const jsonMatch = response.match(/\{[\s\S]*\}/);
    if (!jsonMatch) return response;

    const parsedResponse: LocationResponse = JSON.parse(jsonMatch[0]);

    return (
      <ContentDisplay>
        <ContentTitle>{parsedResponse.locationName}</ContentTitle>
        <ContentDescription>{parsedResponse.locationDescription}</ContentDescription>
        
        <Section>
          <SectionTitle>Architecture</SectionTitle>
          <ContentDescription>{parsedResponse.locationDetails.architecture}</ContentDescription>
        </Section>

        <Section>
          <SectionTitle>Inhabitants</SectionTitle>
          <ContentDescription>{parsedResponse.locationDetails.inhabitants}</ContentDescription>
        </Section>

        <Section>
          <SectionTitle>History</SectionTitle>
          <ContentDescription>{parsedResponse.locationDetails.history}</ContentDescription>
        </Section>

        <Section>
          <SectionTitle>Secrets</SectionTitle>
          <ContentDescription>{parsedResponse.locationDetails.secrets}</ContentDescription>
        </Section>

        <Section>
          <SectionTitle>Notable Features</SectionTitle>
          {parsedResponse.locationDetails.notable_features.map((feature, index) => (
            <ItemContainer key={index}>
              <ItemTitle>{feature.name}</ItemTitle>
              <ItemDescription>{feature.description}</ItemDescription>
            </ItemContainer>
          ))}
        </Section>

        <HooksSection>
          <SectionTitle>Adventure Hooks</SectionTitle>
          {parsedResponse.locationDetails.hooks.map((hook, index) => (
            <ItemContainer key={index}>
              <ItemTitle>Hook {index + 1}</ItemTitle>
              <ItemDescription>
                <strong>Situation:</strong> {hook.hook}<br />
                <strong>Potential Consequence:</strong> {hook.consequence}
              </ItemDescription>
            </ItemContainer>
          ))}
        </HooksSection>
      </ContentDisplay>
    );
  } catch (error) {
    console.error('Error parsing response:', error);
    return response;
  }
};

const locationTypes = [
  "Settlement",
  "Dungeon",
  "Natural Formation",
  "Religious Site",
  "Military Installation",
  "Magical Location",
  "Historical Landmark",
  "Commercial Hub",
  "Noble Estate",
  "Hidden Sanctuary",
  "Ruins",
  "Underground Complex"
];

const locationEvents = generateEventTypes('location');

export const LocationForm = () => {
  const [sentMessage, setSentMessage] = useState<string>("");
  const [locationType, setLocationType] = useState<string>("");
  const [locationDescription, setLocationDescription] = useState<string>("");
  const [isLoading, setIsLoading] = useState(false);
  const [isComplete, setIsComplete] = useState(false);
  
  const responseRef = useRef<HTMLDivElement>(null);

  const rawResponse = useBrewResponse(sentMessage, locationEvents);

  useEffect(() => {
    if (sentMessage) {
      setIsLoading(true);
      setIsComplete(false);
    }
  }, [sentMessage]);

  useEffect(() => {
    if (rawResponse) {
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
          <LoadingText>Creating your location...</LoadingText>
        </LoadingContainer>
      );
    }

    if (isComplete && rawResponse) {
      return formatResponse(rawResponse as string);
    }

    return null;
  };

  const clearInputs = () => {
    setLocationType("");
    setLocationDescription("");
  };

  const onSend = (e) => {
    e.preventDefault();
    const message = `Create a detailed fantasy location${locationType ? ` of type ${locationType}` : ""} with the following details: ${locationDescription}. Include rich details about its appearance, history, inhabitants, and potential plot hooks.`;
    setSentMessage(message);
    clearInputs();
  };

  return (
    <BrewContainer>
      <BrewHeader>
        <BrewTitle>Location Generator</BrewTitle>
      </BrewHeader>
      <BrewBody onSubmit={onSend}>
        <div>
          <label htmlFor="locationType">Location Type (Optional)</label>
          <select 
            id="locationType" 
            value={locationType} 
            onChange={(e) => setLocationType(e.target.value)}
          >
            <option value="">Select Location Type</option>
            {locationTypes.map((type) => (
              <option key={type} value={type}>{type}</option>
            ))}
          </select>
        </div>
        <div>
          <label htmlFor="locationDescription">Location Details</label>
          <textarea 
            id="locationDescription" 
            rows={4} 
            value={locationDescription} 
            onChange={(e) => setLocationDescription(e.target.value)}
            required
            placeholder="Describe the location you want to create, including any specific details about its purpose, inhabitants, or history"
          ></textarea>
        </div>
        <Button type="submit" disabled={isLoading}>Generate Location</Button>
        <ResponseArea ref={responseRef}>
          {renderResponse()}
        </ResponseArea>
      </BrewBody>
    </BrewContainer>
  );
}

