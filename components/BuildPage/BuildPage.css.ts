import styled from "styled-components";
import Image from "next/image";
import { COLORS } from "styles/vars.css";

export const BuildPageContainer = styled.main`
  padding: 0;
  flex: 1;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  color: ${COLORS.PRIMARY};
`;

export const BannerWrapper = styled.div`
  width: 100%;
  height: 75vh;
  display: flex;
  flex-direction: column;
  align-items: center;
  position: relative;

  h1 {
    position: absolute;
    bottom: 0;
  }

  img {
    max-width: 100%;
    max-height: 100%;
    width: auto;
    height: auto;
    position: absolute;
  }
`;

export const BannerImage = styled(Image)`
  object-fit: cover;
`;

export const ContentWrapper = styled.div`
  padding: 0 2rem;
  max-width: max(75vw, 350px);

  h2 {
    text-align: center;
    padding: 1rem 0;
  }

  p {
    justify-content: left;
    width: 100%;
  }

  ul {
    width: 100%;
    list-style-type: none;
  }
`;

export const SplitRow = styled.div`
  display: flex;
  flex-direction: row;
  gap: 1rem;

  div {
    width: 50%;
  }

  @media (max-width: 1024px) {
    flex-direction: column;
    
    div {
      width: 100%;
    }
  }
`;

export const LevelTable = styled.table`
  border-collapse: collapse;
  background-color: ${COLORS.TERTIARY};
  flex: 1 1 0;

  td, th {
    padding: 0.5rem;
    border: 1px solid black;
  }
`;

export const BuildList = styled.main`
  padding: 5rem 20%;
  flex: 1;
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
  gap: 1rem;

  div {
    display: grid;
    grid-template-rows: 60% 40%;
    width: 18rem;
  }
`;