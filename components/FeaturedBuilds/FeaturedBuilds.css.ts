import styled from "styled-components";
import Link from 'next/link';
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

export const FeaturedBuildImage = styled.img<{ buildImage }>`
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
  flex-grow: ${({isBuildOpened}) => isBuildOpened ? "2" : "1"};
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
      flex-grow: 2;
    }
  }

  @keyframes build-close {
    0% {
      flex-grow: 2;
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
  display: grid;
  grid-template-columns: 60% 40%;
  justify-content: flex-end;
  width: 100%;
  height: 400px;
  overflow: hidden;
  background-color: ${COLORS.PRIMARY};
  padding-left: 80px;
  position: relative;
`;

export const FeaturedBuildDescriptionWrapper = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  color: ${COLORS.BACKGROUND};
  padding: 1rem 5rem 1rem 5rem;
`;

export const FeaturedBuildLinkButton = styled(Link)`
  display: inline-block;
  padding: 1rem 2rem;
  font-size: 1.2rem;
  font-weight: 600;
  text-align: center;
  text-transform: uppercase;
  color: white;
  border-radius: 0.5rem;
  box-shadow: 0 0.5rem 1rem rgba(0, 0, 0, 0.25);
  transition: all 0.3s ease;
  cursor: pointer;
  background-color: ${COLORS.ACCENT};

  &:active {
    transform: translateY(0.1rem);
    box-shadow: 0 0.3rem 0.6rem rgba(0, 0, 0, 0.25);
  }
`;