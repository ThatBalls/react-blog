import styled from "styled-components";
import Link from "next/link";
import Image from "next/image";
import { COLORS } from "styles/vars.css";

export const BrewListContainer = styled.section`
  width: 100%;
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
`;

export const Brew = styled.div`
  height: 400px;
  width: 350px;
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
  text-align: center;

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