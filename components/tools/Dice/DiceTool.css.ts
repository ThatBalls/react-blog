import { DialogContent, TextField } from "@mui/material";
import styled from "styled-components";

export const DialogInputForm = styled(DialogContent)`
  font-size: 12px;
`;

export const DialogTextInput = styled(TextField)`
  width: 100%;
  margin: 10px 0;
`;

export const ButtonRow = styled.div`
  display: flex;
  gap: 3rem;
  justify-content: center;
`;

export const CardFlex = styled.div`
  display: flex;
  flex-direction: horizontal;
  flex-wrap: wrap;
  gap: 1rem;
  justify-content: space-around;
`;