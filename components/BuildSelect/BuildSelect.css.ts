import styled from "styled-components";
import { COLORS } from "styles/vars.css";

export const BuildSelectContainer = styled.div`
  display: flex;
  background-color: #1a1a2e;
  background-image: linear-gradient(30deg, rgba(100, 149, 237, 0.05) 12%, transparent 12.5%, transparent 87%, rgba(100, 149, 237, 0.05) 87.5%, rgba(100, 149, 237, 0.05)),
    linear-gradient(150deg, rgba(100, 149, 237, 0.05) 12%, transparent 12.5%, transparent 87%, rgba(100, 149, 237, 0.05) 87.5%, rgba(100, 149, 237, 0.05)),
    linear-gradient(30deg, rgba(100, 149, 237, 0.05) 12%, transparent 12.5%, transparent 87%, rgba(100, 149, 237, 0.05) 87.5%, rgba(100, 149, 237, 0.05)),
    linear-gradient(150deg, rgba(100, 149, 237, 0.05) 12%, transparent 12.5%, transparent 87%, rgba(100, 149, 237, 0.05) 87.5%, rgba(100, 149, 237, 0.05)),
    linear-gradient(60deg, rgba(100, 149, 237, 0.05) 25%, transparent 25.5%, transparent 75%, rgba(100, 149, 237, 0.05) 75%, rgba(100, 149, 237, 0.05)),
    linear-gradient(60deg, rgba(100, 149, 237, 0.05) 25%, transparent 25.5%, transparent 75%, rgba(100, 149, 237, 0.05) 75%, rgba(100, 149, 237, 0.05));
  background-size: 40px 70px;
  background-position: 0 0, 0 0, 20px 35px, 20px 35px, 0 0, 20px 35px;
  padding: 5rem 2rem 2rem 2rem;
  flex-direction: row;
  align-items: flex-start;
  min-height: 100vh;
  gap: 2rem;
  box-sizing: border-box;
  overflow-x: hidden;

  @media (max-width: 1024px) {
    flex-direction: column;
    padding-top: 4rem;
    padding-bottom: 0;
  }
`;

export const GridContainer = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(180px, 1fr));
  gap: 1.5rem;
  padding: 1rem;
  width: 100%;
  
  @media (max-width: 1024px) {
    grid-template-columns: repeat(auto-fill, minmax(150px, 1fr));
  }
`;

export const ImageContainer = styled.div`
  position: relative;
  cursor: pointer;
  aspect-ratio: 1;
  transition: transform 0.2s ease;
  
  &::before {
    content: '';
    position: absolute;
    top: -4px;
    left: -4px;
    right: -4px;
    bottom: -4px;
    background: linear-gradient(45deg, #ffd700, #ffa500);
    border-radius: 8px;
    z-index: 0;
    opacity: 0;
    transition: opacity 0.3s ease;
  }
  
  &:hover {
    transform: scale(1.05);
    
    &::before {
      opacity: 1;
    }
  }
`;

export const Image = styled.img`
  width: 100%;
  height: 100%;
  object-fit: cover;
  border-radius: 4px;
  position: relative;
  z-index: 1;
  background-color: #2a2a40;
  border: 2px solid #4a4a6a;
`;

export const Overlay = styled.div<{ visible: boolean }>`
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  display: flex;
  justify-content: center;
  align-items: center;
  background: ${({ visible }) =>
    visible
      ? 'linear-gradient(135deg, rgba(255,215,0,0.3), rgba(255,165,0,0.3))'
      : 'none'
  };
  color: white;
  font-size: 1rem;
  font-weight: bold;
  opacity: ${({ visible }) => (visible ? 1 : 0)};
  transition: all 0.3s ease;
  border: ${({ visible }) =>
    visible
      ? '3px solid #ffd700'
      : 'none'
  };
  border-radius: 4px;
  box-shadow: ${({ visible }) =>
    visible
      ? '0 0 20px rgba(255,215,0,0.5), inset 0 0 10px rgba(255,215,0,0.5)'
      : 'none'
  };
  
  &::after {
    content: '';
    position: absolute;
    top: -2px;
    left: -2px;
    right: -2px;
    bottom: -2px;
    border-radius: 6px;
    background: ${({ visible }) =>
    visible
      ? 'linear-gradient(45deg, #ffd700, transparent, #ffd700)'
      : 'none'
  };
    opacity: 0.5;
    animation: ${({ visible }) =>
    visible ? 'shine 1.5s ease-in-out infinite' : 'none'};
  }
  
  @keyframes shine {
    0% { opacity: 0.5; }
    50% { opacity: 0.8; }
    100% { opacity: 0.5; }
  }
`;

export const InfoContainer = styled.div`
  display: flex;
  flex-direction: column;
  position: sticky;
  top: 100px;
  right: 2rem;
  padding: 2rem;
  color: white;
  background: rgba(26, 26, 46, 0.95);
  border: 2px solid #ffd700;
  border-radius: 8px;
  width: 300px;
  max-width: 30vw;
  min-width: 220px;
  height: 400px;
  text-align: center;
  align-items: center;
  box-shadow: 0 0 20px rgba(255,215,0,0.2);
  backdrop-filter: blur(5px);
  justify-content: space-between;
  order: 2;
  
  @media (max-width: 1024px) {
    position: static;
    width: 100%;
    max-width: 100%;
    min-width: 0;
    height: auto;
    min-height: 240px;
    border-radius: 8px;
    order: 0;
  }
`;

export const InfoHeader = styled.h2`
  font-size: 1.5rem;
  font-weight: bold;
  margin-bottom: 1rem;
  color: #ffd700;
  text-shadow: 0 0 10px rgba(255,215,0,0.5);
`;

export const InfoText = styled.p`
  font-size: 1.2rem;
  color: #ffffff;
  margin-bottom: 1.5rem;
  flex-grow: 1;
  display: flex;
  align-items: center;
`;