import React, { useEffect, useState } from 'react';
import parse from 'html-react-parser';

import { BrewBody, BrewContainer, BrewHeader, BrewTitle, ResponseArea } from "./Brew.css";
import { EventTypes, socket } from '../../websockets/clientSocket';
import { Button } from 'react-bootstrap';
import { DescriberForm } from './BrewForms/Describer';

export enum BrewTypes {
  DESCRIBE = "describe",
};

const BrewMap = {
  [BrewTypes.DESCRIBE]: <DescriberForm />,
};

interface BrewProps {
  brewType: BrewTypes;
}

export const Brew = ({ brewType = BrewTypes.DESCRIBE }: BrewProps) => {
  const BrewComponent: React.ReactNode = BrewMap[brewType];

    return (<>{BrewComponent}</>)
};