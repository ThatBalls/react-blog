/*let prompt = `Create a dungeons and dragons subclass for the ${class_name} class called ${subclass_name}, which is described as: ${subclass_description}. Features should be as specific as possible. Saving throws should have DCs, attacks should have damage, etc. Format response in JSON with structure: "subclassName": string, "subclassDescription": string, "subclassFeatures": { "featureTitle": string, "featureLevel": number, "featureDescription": string }[]"`;
*/

import { Button, Spinner } from "react-bootstrap"
import { useState, useEffect, useRef } from "react";

import { BrewContainer, BrewHeader, BrewTitle, BrewBody, ResponseArea } from "../Brew.css"
import { generateEventTypes } from "../brewUtils";
import { useBrewResponse } from "../useBrewResponse";
import {
  ContentDisplay,
  ContentTitle,
  ContentDescription,
  Section,
  ItemContainer,
  ItemTitle,
  ItemDescription,
  LoadingContainer,
  LoadingText
} from "./styles";

interface SubclassResponse {
  subclassName: string;
  subclassDescription: string;
  subclassFeatures: Array<{
    featureTitle: string;
    featureLevel: number;
    featureDescription: string;
  }>;
}

const formatResponse = (response: string): React.ReactNode => {
  try {
    const jsonMatch = response.match(/\{[\s\S]*\}/);
    if (!jsonMatch) return response;

    const parsedResponse: SubclassResponse = JSON.parse(jsonMatch[0]);

    return (
      <ContentDisplay>
        <ContentTitle>{parsedResponse.subclassName}</ContentTitle>
        <ContentDescription>{parsedResponse.subclassDescription}</ContentDescription>
        <Section>
          {parsedResponse.subclassFeatures
            .sort((a, b) => a.featureLevel - b.featureLevel)
            .map((feature, index) => (
              <ItemContainer key={index}>
                <ItemTitle>{feature.featureTitle} (Level {feature.featureLevel})</ItemTitle>
                <ItemDescription>{feature.featureDescription}</ItemDescription>
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

const dndClasses = [
  "Artificer",
  "Barbarian",
  "Bard",
  "Cleric",
  "Druid",
  "Fighter",
  "Monk",
  "Paladin",
  "Ranger",
  "Rogue",
  "Sorcerer",
  "Warlock",
  "Wizard"
];

const subclassEvents = generateEventTypes('subclass');

export const SubclassForm = () => {
  const [sentMessage, setSentMessage] = useState<string>("");
  const [className, setClassName] = useState<string>("");
  const [subclassName, setSubclassName] = useState<string>("");
  const [subclassDescription, setSubclassDescription] = useState<string>("");
  const [isLoading, setIsLoading] = useState(false);
  const [isComplete, setIsComplete] = useState(false);
  
  const responseRef = useRef<HTMLDivElement>(null);

  const rawResponse = useBrewResponse(sentMessage, subclassEvents);

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
          <LoadingText>Creating your subclass...</LoadingText>
        </LoadingContainer>
      );
    }

    if (isComplete && rawResponse) {
      return formatResponse(rawResponse as string);
    }

    return null;
  };

  const clearInputs = () => {
    setClassName("");
    setSubclassName("");
    setSubclassDescription("");
  };

  const onSend = (e) => {
    e.preventDefault();
    const message = `Create a dungeons and dragons subclass for the ${className} class called "${subclassName}"${subclassDescription ? `, which is described as: ${subclassDescription}` : ""}. Features should be as specific as possible. Saving throws should have DCs, attacks should have damage, etc.`;
    setSentMessage(message);
    clearInputs();
  };

  return (
    <BrewContainer>
      <BrewHeader>
        <BrewTitle>Subclass Generator</BrewTitle>
      </BrewHeader>
      <BrewBody onSubmit={onSend}>
        <div>
          <label htmlFor="className">Base Class</label>
          <select 
            id="className" 
            value={className} 
            onChange={(e) => setClassName(e.target.value)}
            required
          >
            <option value="">Select Base Class</option>
            {dndClasses.map((dndClass) => (
              <option key={dndClass} value={dndClass}>{dndClass}</option>
            ))}
          </select>
        </div>
        <div>
          <label htmlFor="subclassName">Subclass Name</label>
          <input 
            type="text" 
            id="subclassName" 
            value={subclassName} 
            onChange={(e) => setSubclassName(e.target.value)}
            required
            placeholder="Enter subclass name"
          />
        </div>
        <div>
          <label htmlFor="subclassDescription">Subclass Description (Optional)</label>
          <textarea 
            id="subclassDescription" 
            rows={4} 
            value={subclassDescription} 
            onChange={(e) => setSubclassDescription(e.target.value)}
            placeholder="Describe the theme and concept of your subclass (optional)"
          ></textarea>
        </div>
        <Button type="submit" disabled={isLoading}>Generate Subclass</Button>
        <ResponseArea ref={responseRef}>
          {renderResponse()}
        </ResponseArea>
      </BrewBody>
    </BrewContainer>
  );
}