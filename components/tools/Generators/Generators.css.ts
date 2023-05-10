import styled from 'styled-components';

export const GeneratorsContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  height: 100%;
  width: 100%;
`;

export const FrameSizer = styled.div`
  height: 100%;
  width: 100%;
  display: flex;
  flex-direction: column;
  flex-grow: 1;
`;

export const PicoContainer = styled.iframe`
  border: none;
  width: 100%;
  flex-grow: 1;
`;