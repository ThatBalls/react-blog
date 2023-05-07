import styled from "styled-components";
import Link from 'next/link';
import Image from "next/image";
import { COLORS } from "styles/vars.css";

export const FeaturedToolsContainer = styled.section`
  display: flex;
  width: 100%;
  height: 400px;
  overflow: hidden;
  position: relative;
  background-color: ${COLORS.TERTIARY};

  @media (max-width: 1024px) {
    flex-direction: column;
    align-items: center;
    max-width: 400px;
    min-width: 350px;

    & > * {
      flex: 1 1 0;
    }
  }
`;

export const FeaturedToolPreviewArea = styled.div`
  display: flex;
  width: 60%;

  @media (max-width: 1024px) {
    width: 100%;
  }
`;

export const FeaturedToolWrapper = styled.div`
  width: 100%;
  position: relative;
`;

export const FeaturedToolDescriptionWrapper = styled.div`
  display: flex;
  width: 40%;
  flex-direction: column;
  justify-content: space-between;
  color: ${COLORS.PRIMARY};
  padding: 1rem 5rem 1rem 5rem;
  max-width: 500px;
  
  h1 {
    font-size: 2rem;
  }

  @media (max-width: 1024px) {
    width: 100%;
  }
`;

export const FeaturedToolLinkButton = styled(Link)`
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

export const FeaturedToolImage = styled(Image)`
  object-fit: contain;
`;