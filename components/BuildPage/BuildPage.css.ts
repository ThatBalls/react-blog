import styled from "styled-components";
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

export const ContentWrapper = styled.div`
  padding: 0 10rem;

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
  }
`;

export const SplitRow = styled.div`
  display: grid;
  grid-template-columns: 50% 50%;
  gap: 1rem;
`;

export const LevelTable = styled.table`
  border-collapse: collapse;

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