import styled from "styled-components";
import { COLORS } from "styles/vars.css";

export const GlobalStyles = styled.div`
  min-height: 100vh;
  background-color: ${COLORS.BACKGROUND};
  > * {
    background-color: ${COLORS.BACKGROUND};
  }

  a:hover {
    color: #0a58ca
  }
`;