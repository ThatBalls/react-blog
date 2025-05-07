import styled from "styled-components";
import { COLORS } from "styles/vars.css";
import {
  FeaturedContainer,
  DescriptionWrapper,
  FeaturedImage,
  MobileContainer as SharedMobileContainer,
} from '../shared/FeaturedSection.css';

export const EXPAND_TIME = 0.5;

export const FeaturedBuildPreview = styled.div`
  width: 100%;
  height: 100%;
  z-index: 5;

  @keyframes preview-open {
    0% {
      opacity: 0.5;
    }
    100% {
      opacity: 0;
    }
  }

  @keyframes preview-close {
    0% {
      opacity: 0;
    }
    100% {
      opacity: 0.5;
    }
  }
`;

export const FeaturedBuildImage = styled.img`
  transform: skew(20deg);
  position: absolute;
  left: -40px;
  object-fit: none;
  object-position: -200px 0;

  @keyframes image-open {
    0% {
      opacity: 0;
    }
    100% {
      opacity: 1;
    }
  }

  @keyframes image-close {
    0% {
      opacity: 1;
    }
    100% {
      opacity: 0;
    }
  }
`;


export const FeaturedBuildWrapper = styled.div<{ isBuildOpened: boolean }>`
  display: flex;
  flex-grow: ${({ isBuildOpened }) => isBuildOpened ? "3" : "1"};
  height: 100%;
  transform: skew(-20deg);
  animation: build-close ${EXPAND_TIME}s ease;
  animation-fill-mode: both;
  overflow: hidden;

  ${({ isBuildOpened }) => isBuildOpened ? `
    animation: build-open ${EXPAND_TIME}s ease;
    animation-fill-mode: both;

    ${FeaturedBuildPreview} {
      animation: preview-open ${EXPAND_TIME}s ease;
      animation-fill-mode: both;
    }
  ` : `
    animation: build-close ${EXPAND_TIME}s ease;
    animation-fill-mode: both;

    ${FeaturedBuildPreview} {
      animation: preview-close ${EXPAND_TIME}s ease;
      animation-fill-mode: both;
    }
  `}

  @keyframes build-open {
    0% {
      flex-grow: 1;
    }
    100% {
      flex-grow: 3;
    }
  }

  @keyframes build-close {
    0% {
      flex-grow: 3;
    }
    100% {
      flex-grow: 1;
    }
  }
`;

export const FeaturedBuildPreviewArea = styled.div`
  display: flex;
  cursor: pointer;
  ${FeaturedBuildWrapper}:nth-child(1) {
    background-color: ${COLORS.ACCENT};
    ${FeaturedBuildPreview}, ${FeaturedBuildImage} {
      background-color: ${COLORS.ACCENT};
    }
  }

  ${FeaturedBuildWrapper}:nth-child(2) {
    background-color: ${COLORS.PRIMARY};
    ${FeaturedBuildPreview}, ${FeaturedBuildImage} {
      background-color: ${COLORS.PRIMARY};
    }
  }

  ${FeaturedBuildWrapper}:nth-child(3) {
    background-color: ${COLORS.SECONDARY};
    ${FeaturedBuildPreview}, ${FeaturedBuildImage} {
      background-color: ${COLORS.SECONDARY};
    }
  }
`;

export const FeaturedBuildsContainer = styled(FeaturedContainer)`
  background: transparent;
  
  @media (max-width: 1024px) {
    background: ${COLORS.BACKGROUND};
  }
`;

export const FeaturedBuildsLarge = styled.div`
  display: grid;
  grid-template-columns: 60% 40%;
  justify-content: flex-end;
  width: 100%;
  height: 100%;
  overflow: hidden;
  padding-left: 80px;
  position: relative;
  background: ${COLORS.BACKGROUND};
  
  @media (max-width: 1024px) {
    display: none;
  }
`;

export const FeaturedBuildDescriptionWrapper = styled(DescriptionWrapper);

export const FeaturedImageWrapper = styled.div`
  width: 100%;
  position: relative;
  aspect-ratio: 16/9;
`;

export const SmallFeaturedBuildImage = styled(FeaturedImage)`
  border-radius: 0;
  @media (max-width: 1024px) {
    height: 160px;
    object-fit: cover;
    display: block;
    background: ${COLORS.BACKGROUND};
    box-shadow: 0 4px 24px rgba(0,0,0,0.25), 0 1.5px 6px rgba(0,0,0,0.22);
  }
`;

export const MobileContainer = SharedMobileContainer;