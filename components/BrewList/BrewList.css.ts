import styled from "styled-components";
import Link from "next/link";
import Image from "next/image";
import { COLORS } from "styles/vars.css";

export const BrewListContainer = styled.section`
  width: 100%;
  height: 400px;
  display: flex;
`;

export const Brew = styled.div`
  width: 100%;
  height: 100%;
  position: relative;
  display: flex;
  flex-direction: column;
  align-items: center;

  & > * {
    flex: 1 1 0;
  }
`;

export const BrewDescriptionWrapper = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  color: ${COLORS.PRIMARY};
  padding: 1rem 2rem 1rem 2rem;
  max-width: 500px;

  h1 {
    font-size: 2rem;
  }
`;

export const BrewImageWrapper = styled.div`
  width: 100%;
  position: relative;
`;

export const BrewImage = styled(Image)`
  object-fit: contain;
`;

export const BrewLinkButton = styled(Link)`
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