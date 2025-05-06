import styled from "styled-components";
import Image from "next/image";

export const HeroContainer = styled.div`
  height: 50vh;
  width: 100%;
  position: relative;
  overflow: hidden;  /* Prevent any overflow */
`;

export const HeroImageWrapper = styled.div`
  width: 100%;
  height: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
  position: relative;
  overflow: hidden;  /* Double ensure no overflow */
`;

export const HeroImg = styled.div`
  height: 100%;
  background-position: center;
  background-repeat: no-repeat;
  background-size: cover;
  position: relative;
`;

export const HeroImageElement = styled(Image)`
  max-width: 100%;
  max-height: 100%;
  object-fit: contain;
  position: relative;
  z-index: 1;
  /* Soft edge mask for natural blending */
  mask-image: radial-gradient(ellipse 90% 60% at 50% 50%, black 80%, transparent 100%);
  -webkit-mask-image: radial-gradient(ellipse 90% 60% at 50% 50%, black 80%, transparent 100%);
`;

export const HeroText = styled.div`
  text-align: center;
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  color: white;
`;

export const HeroImageBlurBg = styled.img`
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  object-fit: cover;
  filter: blur(32px) brightness(1.1) saturate(1.2);
  z-index: 0;
  pointer-events: none;
  transform: scale(1.1);  /* Slightly scale up to prevent blur edges showing */
`;