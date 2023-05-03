import styled from "styled-components";
import Link from 'next/link';
import { COLORS } from "styles/vars.css";

export const FeaturedToolsContainer = styled.section`
  display: grid;
  grid-template-columns: 60% 40%;
  justify-content: flex-end;
  width: 100%;
  height: 400px;
  overflow: hidden;
  position: relative;
  background-color: ${COLORS.TERTIARY};
`;

export const FeaturedToolPreviewArea = styled.div`
  display: flex;
`;

export const FeaturedToolWrapper = styled.div`
  overflow: hidden;
  width: 100%;
  height: 100%;
  z-index: 5;
`;

export const FeaturedToolDescriptionWrapper = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  color: ${COLORS.PRIMARY};
  padding: 1rem 5rem 1rem 5rem;
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

export const FeaturedToolImage = styled.img`
  width: 100%;
  overflow: hidden;
  height: 100%;
  z-index: 1;
`;