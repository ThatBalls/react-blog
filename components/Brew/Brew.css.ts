import styled from "styled-components";

export const BrewContainer = styled.div`
  display: flex;
  flex-direction: column;
  height: 100%;
  width: 100%;
  color: white;
`;

export const BrewHeader = styled.div`
  display: flex;
  justify-content: center;
  padding: 1rem;
  border-bottom: 1px solid #ccc;
`;

export const BrewTitle = styled.h1`
  margin: 0;
`;

export const BrewBody = styled.form`
  flex-grow: 1;
  padding: 1rem;
  display: flex;
  flex-direction: column;
  gap: 1rem;
  width: 100%;
  overflow: hidden;
`;

export const ResponseArea = styled.div`
  flex-grow: 1;
  min-height: 0;
  display: flex;
  flex-direction: column;
  overflow-y: auto;
  padding: 1rem;
`;