import styled from "styled-components";
import Image from "next/image";
import { COLORS } from "styles/vars.css";

export const FeaturedContainer = styled.section`
  width: 100%;
  height: 400px;
  position: relative;
  background-color: ${COLORS.TERTIARY};

  @media (max-width: 1024px) {
    height: auto;
    max-width: 380px;
    min-width: 300px;
    background: ${COLORS.BACKGROUND};
    border-radius: 20px;
    box-shadow: 0 4px 24px rgba(0,0,0,0.25), 0 1.5px 6px rgba(0,0,0,0.22);
    overflow: hidden;
    margin: 1.5rem;
    padding: 0 0 2rem 0;
    cursor: pointer;
    transition: transform 0.2s cubic-bezier(.4,2,.6,1), box-shadow 0.2s;
    &:hover {
      transform: scale(1.03);
      box-shadow: 0 8px 32px rgba(0,0,0,0.30), 0 3px 12px rgba(0,0,0,0.28);
    }
  }
`;

export const DesktopContainer = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr;
  width: 100%;
  height: 100%;
  background: ${COLORS.BACKGROUND};
  position: relative;
  overflow: hidden;
  box-shadow: 0 4px 24px rgba(0,0,0,0.25);

  &::after {
    content: '';
    position: absolute;
    left: 50%;
    top: 10%;
    height: 80%;
    width: 1px;
    background: ${COLORS.SECONDARY};
    opacity: 0.3;
  }

  @media (max-width: 1024px) {
    display: none;
  }
`;

export const MobileContainer = styled.div`
  display: none;
  width: 100%;
  height: 100%;
  
  @media (max-width: 1024px) {
    display: flex;
    flex-direction: column;
    height: 500px;
    min-height: 500px;
    max-height: 500px;
  }
`;

export const PreviewArea = styled.div`
  position: relative;
  overflow: hidden;
  width: 100%;
  height: 100%;
  padding: 2rem;

  @media (max-width: 1024px) {
    aspect-ratio: 16/9;
    height: auto;
    padding: 0;
  }
`;

export const ContentWrapper = styled.div`
  width: 100%;
  height: 100%;
  position: relative;
  overflow: hidden;
  border-radius: 16px;
  transition: transform 0.3s ease;
  cursor: pointer;

  &:hover {
    transform: scale(1.03);
  }

  @media (max-width: 1024px) {
    border-radius: 0;
    &:hover {
      transform: none;
    }
  }
`;

export const DescriptionWrapper = styled.div`
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  justify-content: center;
  width: 100%;
  color: ${COLORS.PRIMARY};
  padding: 3rem;

  @media (max-width: 1024px) {
    padding: 1.5rem 2rem 0 2rem;
    flex: 1;
    justify-content: flex-start;

    p {
      margin-top: 1rem;
    }
    
    & > div:last-child {
      margin-top: auto;
      width: 100%;
      display: flex;
      justify-content: center;
    }
  }

  h1 {
    font-size: 2.5rem;
    font-weight: 700;
    margin-bottom: 1rem;
    color: ${COLORS.PRIMARY};
    position: relative;
    
    &::after {
      content: '';
      position: absolute;
      bottom: -0.5rem;
      left: 0;
      width: 60px;
      height: 3px;
      background: ${COLORS.ACCENT};
      border-radius: 2px;
    }

    @media (max-width: 1024px) {
      font-size: 1.7rem;
      margin-bottom: 0.5rem;
    }
  }

  p {
    font-size: 1.2rem;
    color: ${COLORS.SECONDARY};
    margin-bottom: 2rem;
    opacity: 0.9;

    @media (max-width: 1024px) {
      font-size: 1rem;
      margin-bottom: 1.5rem;
    }
  }
`;

export const FeaturedImage = styled(Image)`
  object-fit: cover;
  border-radius: 16px;
  transition: transform 0.3s ease;

  @media (max-width: 1024px) {
    border-radius: 0;
  }
`; 