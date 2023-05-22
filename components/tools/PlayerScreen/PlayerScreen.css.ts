import styled from "styled-components";
import { COLORS } from "styles/vars.css";

export const ScreenContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  background-color: ${COLORS.BACKGROUND};
  color: ${COLORS.PRIMARY};
  height: 100%;
  width: 100%;
  overflow: hidden;
  flex: 1 1 0;
`;

export const DraggableContainer = styled.div`
  display: flex;
  flex-direction: column;
  width: 100%;
  height: 100%;
  position: relative;
`;

export const CardContainer = styled.div<{size: { width: number, height: number }}>`
  transition: height 0.3s, width 0.3s;
  position: relative;
  display: flex;
  flex-direction: column;

  ${({size}) => `
    width: ${size.width}px;
    height: ${size.height}px;
  `}
`;

export const CardTitle = styled.span`
  font-weight: bold;
`;

export const CardContents = styled.div`
  display: flex;
  flex-direction: column;
  height: 100%;

  textarea {
    width: 100%;
    height: 100%;
    line-height: 1.5rem;
    box-sizing: border-box;
    resize: none;
    flex-grow: 1;
    margin-bottom: 1rem;
  }
`;

export const DraggableCard = styled.div<{isMinimized: boolean, zIndex: number}>`
  padding: 0 1rem;
  background-color: ${COLORS.TERTIARY};
  border-radius: 5px;
  cursor: move;
  position: absolute;
  z-index: ${({zIndex}) => zIndex};
  box-shadow: 0 4px 8px 0 rgba(0,0,0,0.2);
  transition: box-shadow 0.3s;
  line-height: 3rem;
  overflow-y: auto;

  &:hover {
    box-shadow: 0 8px 16px 0 rgba(0,0,0,0.2);
  }

  ${({isMinimized}) => isMinimized ? `
    padding-top: 0;
    padding-bottom: 0;
    overflow: hidden;
    opacity: 0.8;

    ${CardContainer} {
      width: 10rem;
      height: 3rem;
    }

    ${CardContents} {
      display: none;
    }
  ` : ``}
`;

export const SearchContainer = styled.div`
  display: flex;
  flex-direction: column;
  position: relative;
  width: 100%;
`;

export const SearchInput = styled.input`
  width: 100%;
  padding: 0.5rem;
  border-radius: 5px;
  border: none;
  margin-bottom: 1rem;
  font-size: 1rem;
`;

export const SearchResults = styled.dialog`
  display: flex;
  flex-direction: column;
  position: absolute;
`;

export const SearchResult = styled.div`
  display: flex;
`;

export const ScreenDialog = styled.dialog`
  background-color: ${COLORS.TERTIARY};
  border-radius: 0.5rem;
  position: relative;
`;

export const TypeSelectContainer = styled.div`
  display: flex;
  flex-direction: column;
  padding: 1rem;
  gap: 1rem;
`;

export const TypeSelectButton = styled.button`
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

export const AddItemButton = styled.button`
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

export const FrameSelectContainer = styled.div`
  display: flex;
  flex-direction: column;
  padding: 1rem;
  gap: 1rem;
`;

export const FrameInput = styled.input`
  width: 100%;
  padding: 0.5rem;
  border-radius: 5px;
  border: none;
  margin-bottom: 1rem;
  font-size: 1rem;
`;

export const FrameButton = styled.button`
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

export const FrameError = styled.div`
  color: red;
  font-weight: bold;
`;

export const BrewSelectContainer = styled.div`

`;

export const BrewSelect = styled.select`

`;

export const DialogCloseButton = styled.button`
  border: none;
  background-color: transparent;
  position: absolute;
  top: 0;
  right: 0;
  cursor: pointer;
`;

export const ResizeHandle = styled.div`
  position: absolute;
  bottom: 0;
  right: 0;
  width: 1rem;
  height: 1rem;
  background-color: ${COLORS.TERTIARY};
  cursor: nwse-resize;
`;

export const ResizePreview = styled.div<{size: { width: number, height: number }}>`
  position: absolute;
  top: 0;
  left: 0;
  width: 1rem;
  height: 1rem;
  background-color: ${COLORS.TERTIARY};
  opacity: 0.5;

  ${({size}) => `
    width: ${size.width}px;
    height: ${size.height}px;
  `}
`;

export const ResizeOverlay = styled.div<{ isResizing: boolean }>`
  position: absolute;
  top: 0;
  left: 0;
  width: calc(100% - 1rem);
  height: calc(100% - 1rem);

  ${({isResizing}) => isResizing ? `
    display: block;
    cursor: nwse-resize;
  ` : `
    display: none;
  `}
`;