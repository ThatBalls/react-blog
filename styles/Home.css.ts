import styled from "styled-components";

export const HomeContainer = styled.div`
  width: 100%;
  flex: 1;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;

  @media (max-width: 1024px) {
    flex-direction: row;
    flex-wrap: wrap;
  }
`;