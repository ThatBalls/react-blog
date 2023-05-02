import React, { useState } from "react";
import Link from 'next/link';
import styled from "styled-components";
import { COLORS } from "styles/vars.css";

export const BuildSelectContainer = styled.div`
  display: grid;
  background-color: ${COLORS.PRIMARY};
  grid-template-columns: 75% 25%;
  padding: 1rem;
`;

export const GridContainer = styled.div`
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  grid-gap: 1rem;
`;

export const ImageContainer = styled.div`
  position: relative;
  cursor: pointer;
`;

export const Image = styled.img`
  width: 100%;
  border-radius: 0.5rem;
`;

export const Overlay = styled.div`
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  display: flex;
  justify-content: center;
  align-items: center;
  background-color: rgba(0, 0, 0, 0.5);
  color: white;
  font-size: 1.5rem;
  font-weight: bold;
  opacity: ${({ visible }) => (visible ? 1 : 0)};
  transition: opacity 0.3s ease;
  border: ${({ visible }) => (visible ? `0.5rem ${COLORS.ACCENT} solid` : "none")};
  border-radius: 0.5rem;
`;

export const InfoContainer = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  padding: 1rem;
  background-color: ${COLORS.PRIMARY};
  color: ${COLORS.BACKGROUND};
`;

export const InfoHeader = styled.h2`
  font-size: 1.5rem;
  font-weight: bold;
  margin-bottom: 1rem;
`;

export const InfoText = styled.p`
  font-size: 1.2rem;
`;

export const BuildLinkButton = styled(Link)`
  display: inline-block;
  padding: 1rem 2rem;
  font-size: 1.2rem;
  font-weight: 600;
  text-align: center;
  text-transform: uppercase;
  color: white;
  border-radius: 0.5rem;
  box-shadow: 0 0.5rem 1rem rgba(0, 0, 0, 0.25);
  transition: all 0.3s ease;
  cursor: pointer;
  background-color: ${COLORS.ACCENT};

  &:active {
    transform: translateY(0.1rem);
    box-shadow: 0 0.3rem 0.6rem rgba(0, 0, 0, 0.25);
  }
`;