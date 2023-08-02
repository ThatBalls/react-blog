import styled from "styled-components";
import Link from 'next/link';
import Image from "next/image";
import { COLORS } from "styles/vars.css";

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

export const FeaturedBuildLink = styled(Link)`
  width: 100%;
  height: 100%;
`;

export const FeaturedBuildWrapper = styled.div<{isBuildOpened: boolean}>`
  display: flex;
  flex-grow: ${({isBuildOpened}) => isBuildOpened ? "3" : "1"};
  height: 100%;
  transform: skew(-20deg);
  animation: build-close ${EXPAND_TIME}s ease;
  animation-fill-mode: both;
  overflow: hidden;

  ${({isBuildOpened}) => isBuildOpened ? `
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

  ${FeaturedBuildWrapper}:nth-child(4) {
    background-color: ${COLORS.TERTIARY};
    ${FeaturedBuildPreview}, ${FeaturedBuildImage} {
      background-color: ${COLORS.TERTIARY};
    }
  }
`;

export const FeaturedBuildsContainer = styled.section`
  width: 100%;
  height: 400px;
  text-align: center;

  @media (max-width: 1024px) {
    max-width: 100%;
    min-width: 350px;
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
  @media (max-width: 1024px) {
    display: none;
  }
`;

export const FeaturedBuildDescriptionWrapper = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  color: ${COLORS.PRIMARY};
  padding: 1rem 5rem 1rem 5rem;
  max-width: 500px;

  h1 {
    font-size: 2rem;
  }

  @media (max-width: 1024px) {
    padding: 1rem 2rem 1rem 2rem;
  }
`;

export const FeaturedBuildsSmall = styled.div`
  display: none;
  width: 100%;
  height: 100%;
  position: relative;
  @media (max-width: 1024px) {
    padding-top: 1rem;
    display: flex;
    flex-direction: column;
    align-items: center;
  }

  .carousel-wrapper,
  .carousel,
  .carousel > .slider-wrapper,
  .carousel > .slider-wrapper > .slider {
    height: 100%;
    width: 100%;
  }

  & > * {
    flex: 1 1 0;
  }
`;

export const FeaturedImageWrapper = styled.div`
  width: 100%;
  position: relative;
`;

export const SmallFeaturedBuildImage = styled(Image)`
  object-fit: contain;
`;

export const FeaturedBuildCarouselItem = styled.div`
  width: 100%;
  height: 100%;
`;

export const FeaturedBuildCarouselImage = styled(Image)`
`;