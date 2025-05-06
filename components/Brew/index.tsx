import React, { useEffect, useState } from 'react';
import parse from 'html-react-parser';

import { BrewBody, BrewContainer, BrewHeader, BrewTitle, ResponseArea } from "./Brew.css";
import { EventTypes, socket } from '../../websockets/clientSocket';
import { Button } from 'react-bootstrap';
import { DescriberForm } from './BrewForms/Describer';

export enum BrewTypes {
  DESCRIBE = "describe",
  ITEM = "item",
  LOCATIONS = "location",
  SCENE = "scene",
  SUBCLASS = "subclass",
};

const BrewMap = {
  [BrewTypes.DESCRIBE]: <DescriberForm />,
  [BrewTypes.ITEM]: <div>Item</div>,
  [BrewTypes.LOCATIONS]: <div>Locations</div>,
  [BrewTypes.SCENE]: <div>Scene</div>,
  [BrewTypes.SUBCLASS]: <div>Subclass</div>,
};

interface BrewProps {
  brewType: BrewTypes;
}

export const Brew = ({ brewType = BrewTypes.DESCRIBE }: BrewProps) => {
  const BrewComponent: React.ReactNode = BrewMap[brewType];

    return (<>{BrewComponent}</>)
};