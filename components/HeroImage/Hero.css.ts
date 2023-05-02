import styled from "styled-components";

export const HeroContainer = styled.div`
  height: 20rem;
  width: 100%;
`;

export const HeroImg = styled.div`
  height: 100%;
  background-position: center;
  background-repeat: no-repeat;
  background-size: cover;
  position: relative;
`;

export const HeroText = styled.div`
  text-align: center;
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  color: white;
`;