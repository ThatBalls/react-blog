import styled from "styled-components";

// Common display container for generated content
export const ContentDisplay = styled.div`
  padding: 20px;
  background: rgba(255, 255, 255, 0.05);
  border-radius: 8px;
  margin-top: 20px;
`;

// Common title styling for main content
export const ContentTitle = styled.h2`
  color: #d4af37;
  margin-bottom: 15px;
  font-size: 1.8em;
`;

// Common description text styling
export const ContentDescription = styled.p`
  color: #ffffff;
  line-height: 1.6;
  margin-bottom: 20px;
`;

// Common section title styling
export const SectionTitle = styled.h3`
  color: #c0c0c0;
  font-size: 1.2em;
  margin-bottom: 10px;
`;

// Common list styling
export const ContentList = styled.ul`
  color: #ffffff;
  margin: 0;
  padding-left: 20px;
`;

// Common section container
export const Section = styled.div`
  margin-bottom: 20px;
`;

// Common item container with dark background
export const ItemContainer = styled.div`
  margin-bottom: 15px;
  padding: 10px;
  background: rgba(0, 0, 0, 0.2);
  border-radius: 4px;
`;

// Common item title styling
export const ItemTitle = styled.h4`
  color: #d4af37;
  margin-bottom: 8px;
`;

// Common item description styling
export const ItemDescription = styled.p`
  color: #ffffff;
  margin: 0;
`;

// Loading state components
export const LoadingContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  padding: 40px;
  color: #d4af37;
  gap: 20px;
`;

export const LoadingText = styled.div`
  font-size: 1.2em;
  color: #c0c0c0;
`; 