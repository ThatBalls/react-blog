import styled from "styled-components";
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
  justify-content: center;
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

export const FeaturedToolImage = styled(Image)`
  object-fit: contain;
`;