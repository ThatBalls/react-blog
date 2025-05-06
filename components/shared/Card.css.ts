import styled from "styled-components";
import Image from "next/image";
import { COLORS } from "styles/vars.css";

export const CardContainer = styled.div`
  width: 320px;
  height: 400px;
  background: ${COLORS.BACKGROUND};
  border-radius: 20px;
  box-shadow: 0 4px 24px rgba(0,0,0,0.25), 0 1.5px 6px rgba(0,0,0,0.22);
  overflow: hidden;
  margin: 1.5rem;
  display: flex;
  flex-direction: column;
  cursor: pointer;
  transition: transform 0.2s cubic-bezier(.4,2,.6,1), box-shadow 0.2s;
  
  &:hover {
    transform: scale(1.03);
    box-shadow: 0 8px 32px rgba(0,0,0,0.30), 0 3px 12px rgba(0,0,0,0.28);
  }
`;

export const CardImageWrapper = styled.div`
  position: relative;
  height: 220px;
  width: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 1rem;
  flex-shrink: 0;
`;

export const CardImage = styled(Image)`
  object-fit: contain;
  padding: 0.5rem;
`;

export const CardContent = styled.div`
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  padding: 1rem 2rem;
  flex: 1;

  h1 {
    font-size: 1.7rem;
    font-weight: 700;
    margin-bottom: 0.5rem;
    color: ${COLORS.PRIMARY};
    position: relative;
    width: 100%;
    word-wrap: break-word;
    hyphens: auto;
    
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
  }

  p {
    font-size: 1rem;
    color: ${COLORS.SECONDARY};
    margin-top: 1rem;
    margin-bottom: 0;
    opacity: 0.9;
    display: -webkit-box;
    -webkit-line-clamp: 3;
    -webkit-box-orient: vertical;
    overflow: hidden;
    text-overflow: ellipsis;
  }
`; 