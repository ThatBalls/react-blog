import { Button, Spinner } from "react-bootstrap"
import { useState, useEffect, useRef } from "react";
import styled from "styled-components";

import { BrewContainer, BrewHeader, BrewTitle, BrewBody, ResponseArea } from "../Brew.css"
import { generateEventTypes } from "../brewUtils";
import { useBrewResponse } from "../useBrewResponse";

const ItemDisplay = styled.div`
  padding: 20px;
  background: rgba(255, 255, 255, 0.05);
  border-radius: 8px;
  margin-top: 20px;
`;

const ItemTitle = styled.h2`
  color: #d4af37;
  margin-bottom: 15px;
  font-size: 1.8em;
`;

const ItemSubtitle = styled.h3`
  color: #c0c0c0;
  font-size: 1.2em;
  margin-bottom: 10px;
`;

const ItemDescription = styled.p`
  color: #ffffff;
  line-height: 1.6;
  margin-bottom: 20px;
`;

const FeaturesList = styled.div`
  margin-top: 20px;
`;

const FeatureItem = styled.div`
  margin-bottom: 15px;
  padding: 10px;
  background: rgba(0, 0, 0, 0.2);
  border-radius: 4px;
`;

const FeatureTitle = styled.h4`
  color: #d4af37;
  margin-bottom: 8px;
`;

const FeatureDescription = styled.p`
  color: #ffffff;
  margin: 0;
`;

const LoadingContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  padding: 40px;
  color: #d4af37;
  gap: 20px;
`;

const LoadingText = styled.div`
  font-size: 1.2em;
  color: #c0c0c0;
`;

interface ItemResponse {
  itemName: string;
  itemType: string;
  itemDescription: string;
  itemFeatures: Array<{
    featureTitle: string;
    featureDescription: string;
  }>;
}

const formatResponse = (response: string): React.ReactNode => {
  try {
    // Find the JSON object in the response
    const jsonMatch = response.match(/\{[\s\S]*\}/);
    if (!jsonMatch) return response;

    const parsedResponse: ItemResponse = JSON.parse(jsonMatch[0]);

    return (
      <ItemDisplay>
        <ItemTitle>{parsedResponse.itemName}</ItemTitle>
        <ItemSubtitle>{parsedResponse.itemType}</ItemSubtitle>
        <ItemDescription>{parsedResponse.itemDescription}</ItemDescription>
        <FeaturesList>
          {parsedResponse.itemFeatures.map((feature, index) => (
            <FeatureItem key={index}>
              <FeatureTitle>{feature.featureTitle}</FeatureTitle>
              <FeatureDescription>{feature.featureDescription}</FeatureDescription>
            </FeatureItem>
          ))}
        </FeaturesList>
      </ItemDisplay>
    );
  } catch (error) {
    console.error('Error parsing response:', error);
    return response; // Return original response if parsing fails
  }
};

/*
const prompt = `Create a magic item for dungeons and dragons 5th edition that meets the following criteria: 
                    ${this.itemName ? `Item Name: ${this.itemName}` : ""}
                    ${this.itemType ? `Item Type: ${this.itemType}` : "Item Type: any (be specific)"}
                    ${this.itemRarity ?  `Rarity: ${this.itemRarity}` : ""}
                    ${this.additionalDetails? `Additional Details: ${this.additionalDetails}` : ""}
                    ${this.foundLocation ? `Found Location: ${this.foundLocation}` : ""}
                    The item should have abilities fitting for its rarity. Item description should include visual and other sensory description of the item. ${featureDescriptions[this.itemRarity]} Features should be as specific as possible. Saving throws should have DCs, attacks should have damage, etc. Format response in JSON with structure: { "itemName": string, "itemType": string, "itemDescription": string, "itemFeatures": { "featureTitle": string, "featureDescription": string }[] }`;
*/

const featureDescriptions = {
  "Common": `The item should have one minor feature that either offers some convenience or novel ability but does not increase the user's combat effectiveness.`,
  "Uncommon": `The item should have one or two minor features that can effect the user's effectiveness in or out of combat. If it has a bonus to attacks or spell save DCs, it should be +1.`,
  "Rare": `The item should have two features that should noticeable increase the user's effectiveness in or out of combat. If it has a bonus to attacks or spell save DCs, it should be +2.`,
  "Very Rare": `The item should have two or three features that should significantly increase the user's effectiveness in or out of combat. If it has a bonus to attacks or spell save DCs, it should be +3.`,
  "Legendary": `The item should have three features that significantly increase the user's effectiveness in and out of combat. The item should noticeably alter the way the user approaches problems. If it has a bonus to attacks or spell save DCs, it should be +3.`,
  "Artifact": `The item should have four features that dramatically increases the user's effectiveness. It should signifiantly alter the way the game is played in some novel way. If it has a bonus to attacks or spell save DCs, it should be +3.`
};

const itemEvents = generateEventTypes('items');

const rarityOptions = Object.keys(featureDescriptions);
const itemTypes = [
  "Armor",
  "Potion",
  "Ring",
  "Rod",
  "Scroll",
  "Staff",
  "Wand",
  "Weapon",
  "Wondrous Item"
];

export const ItemForm = () => {
  const [sentMessage, setSentMessage] = useState<string>("");
  const [itemName, setItemName] = useState<string>("");
  const [itemType, setItemType] = useState<string>("");
  const [itemRarity, setItemRarity] = useState<string>("");
  const [foundLocation, setFoundLocation] = useState<string>("");
  const [additionalDetails, setAdditionalDetails] = useState<string>("");
  const [isLoading, setIsLoading] = useState(false);
  const [isComplete, setIsComplete] = useState(false);
  
  const responseRef = useRef<HTMLDivElement>(null);

  const rawResponse = useBrewResponse(sentMessage, itemEvents);

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
          
          // Scroll to response after a short delay to ensure rendering is complete
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
          <LoadingText>Crafting your magical item...</LoadingText>
        </LoadingContainer>
      );
    }

    if (isComplete && rawResponse) {
      return formatResponse(rawResponse as string);
    }

    return null;
  };

  const clearInputs = () => {
    setItemName("");
    setItemType("");
    setItemRarity("");
    setFoundLocation("");
    setAdditionalDetails("");
  };

  const onSend = (e) => {
    e.preventDefault();
    const message = `Create a magic item for dungeons and dragons 5th edition that meets the following criteria:
    ${itemName ? `Item Name: "${itemName}"` : ""}
    ${itemType ? `Item Type: "${itemType}"` : "Item Type: any (be specific)"}
    ${itemRarity ? `Rarity: "${itemRarity}"` : ""}
    ${additionalDetails ? `Additional Details: "${additionalDetails}"` : ""}
    ${foundLocation ? `Found Location: "${foundLocation}"` : ""}
    The item should have abilities fitting for its rarity. Item description should include visual and other sensory description of the item. ${featureDescriptions[itemRarity]} Features should be as specific as possible. Saving throws should have DCs, attacks should have damage, etc. Format response in JSON with structure: { "itemName": string, "itemType": string, "itemDescription": string, "itemFeatures": { "featureTitle": string, "featureDescription": string }[] }`;
    setSentMessage(message);
    clearInputs();
  };

  return (
    <BrewContainer>
      <BrewHeader>
        <BrewTitle>Magic Item Generator</BrewTitle>
      </BrewHeader>
      <BrewBody onSubmit={onSend}>
        <div>
          <label htmlFor="itemName">Item Name</label>
          <input 
            type="text" 
            id="itemName" 
            value={itemName} 
            onChange={(e) => setItemName(e.target.value)} 
            placeholder="Leave blank for random name"
          />
        </div>
        <div>
          <label htmlFor="itemType">Item Type</label>
          <select 
            id="itemType" 
            value={itemType} 
            onChange={(e) => setItemType(e.target.value)}
          >
            <option value="">Select Item Type</option>
            {itemTypes.map((type) => (
              <option key={type} value={type}>{type}</option>
            ))}
          </select>
        </div>
        <div>
          <label htmlFor="itemRarity">Rarity</label>
          <select 
            id="itemRarity" 
            value={itemRarity} 
            onChange={(e) => setItemRarity(e.target.value)}
          >
            <option value="">Select Rarity</option>
            {rarityOptions.map((rarity) => (
              <option key={rarity} value={rarity}>{rarity}</option>
            ))}
          </select>
        </div>
        <div>
          <label htmlFor="foundLocation">Found Location</label>
          <input 
            type="text" 
            id="foundLocation" 
            value={foundLocation} 
            onChange={(e) => setFoundLocation(e.target.value)}
            placeholder="Where was this item found?"
          />
        </div>
        <div>
          <label htmlFor="additionalDetails">Additional Details</label>
          <textarea 
            id="additionalDetails" 
            rows={4} 
            value={additionalDetails} 
            onChange={(e) => setAdditionalDetails(e.target.value)}
            placeholder="Any specific requirements or themes for the item?"
          ></textarea>
        </div>
        <Button type="submit" disabled={isLoading}>Generate Item</Button>
        <ResponseArea ref={responseRef}>
          {renderResponse()}
        </ResponseArea>
      </BrewBody>
    </BrewContainer>
  );
}