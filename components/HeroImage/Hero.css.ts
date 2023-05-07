import styled from "styled-components";
import Image from "next/image";

export const HeroContainer = styled.div`
  height: 50vh;
  width: 100%;
  position: relative;
`;

export const HeroImg = styled.div`
  height: 100%;
  background-position: center;
  background-repeat: no-repeat;
  background-size: cover;
  position: relative;
`;

export const HeroImageElement = styled(Image)`
  object-fit: cover;
`;

export const HeroText = styled.div`
  text-align: center;
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  color: white;
`;