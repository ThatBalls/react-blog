import styled from "styled-components";
import { COLORS } from "styles/vars.css";

export const BuildSelectContainer = styled.div`
  display: flex;
  background-color: ${COLORS.BACKGROUND};
  padding: 1rem;
  flex-direction: column;
  align-items: center;
`;

export const GridContainer = styled.div`
  display: flex;
  gap: 1rem;
  flex-wrap: wrap;
  justify-content: space-evenly;

  @media (max-width: 1024px) {
    justify-content: center;
  }
`;

export const ImageContainer = styled.div`
  position: relative;
  cursor: pointer;
  flex-grow: 3;
  max-width: 350px;
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
  pointer-events: ${({ visible }) => (visible ? "auto" : "none")};
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

  a {
    width: 100%;
    height: 100%;
  }
`;

export const InfoContainer = styled.div`
  display: flex;
  flex-direction: column;
  position: sticky;
  justify-content: space-between;
  padding: 1rem;
  color: ${COLORS.PRIMARY};
  flex-grow: 1;
  background-color: ${COLORS.BACKGROUND};
  bottom: 0;
  left: -1px;
  top: auto;
  width: 100%;
  text-align: center;
  align-items: center;

  & > * {
    max-width: 400px;
  }
`;

export const InfoHeader = styled.h2`
  font-size: 1.5rem;
  font-weight: bold;
  margin-bottom: 1rem;
`;

export const InfoText = styled.p`
  font-size: 1.2rem;
`;