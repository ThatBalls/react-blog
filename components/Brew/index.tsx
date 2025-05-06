import React, { useEffect, useState } from 'react';
import parse from 'html-react-parser';

import { BrewBody, BrewContainer, BrewHeader, BrewTitle, ResponseArea } from "./Brew.css";
import { EventTypes, socket } from '../../websockets/clientSocket';
import { Button } from 'react-bootstrap';
import { DescriberForm } from './BrewForms/Describer';
import { ItemForm } from './BrewForms/Items';
import { SceneForm } from './BrewForms/Scene';
import { SubclassForm } from './BrewForms/Subclass';
import { LocationForm } from './BrewForms/Location';
import { AIChat } from 'components/AIChat';

export enum BrewTypes {
  ASSISTANT = "dm-assistant",
  DESCRIBE = "character-describer",
  ITEM = "magicitem",
  LOCATIONS = "locations",
  SCENE = "scene-setter",
  SUBCLASS = "subclass",
};

const BrewMap = {
  [BrewTypes.ASSISTANT]: <AIChat />,
  [BrewTypes.DESCRIBE]: <DescriberForm />,
  [BrewTypes.ITEM]: <ItemForm />,
  [BrewTypes.LOCATIONS]: <LocationForm />,
  [BrewTypes.SCENE]: <SceneForm />,
  [BrewTypes.SUBCLASS]: <SubclassForm />,
};

interface BrewProps {
  brewType: BrewTypes;
}

export const Brew = ({ brewType = BrewTypes.DESCRIBE }: BrewProps) => {
  const BrewComponent: React.ReactNode = BrewMap[brewType];

    return (<>{BrewComponent}</>)
};