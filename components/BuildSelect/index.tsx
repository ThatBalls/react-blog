import React, { useMemo, useState } from "react";
import { LinkButton } from "patterns";
import { BuildSelectContainer, GridContainer, ImageContainer, Image, Overlay, InfoContainer, InfoHeader, InfoText } from "./BuildSelect.css";
import styled from "styled-components";

// Hidden list for SEO purposes
const SeoLinks = styled.div`
  height: 0;
  width: 0;
  overflow: hidden;
  position: absolute;
`;

interface Build {
  id: string;
  name: string;
  title: string;
  shortDescription: string;
  slug: string;
  bannerImage: {
    sizes: {
      thumbnail: {
        url: string;
      };
    };
    alt: string;
  };
}

interface BuildSelectProps {
  builds: Build[];
}

export const BuildSelect: React.FC<BuildSelectProps> = ({ builds }) => {
  const [selectedIndex, setSelectedIndex] = useState<number | null>(null);

  const handleClick = (index: number) => {
    setSelectedIndex(index);
  };

  const buildDetails = useMemo(() => 
    selectedIndex != null 
      ? builds[selectedIndex] 
      : {
          title: "Select Your Build",
          shortDescription: "Choose a build to view its details and begin your journey"
        }, 
    [selectedIndex, builds]
  );

  return (
    <BuildSelectContainer>
      {/* Hidden list of links for SEO */}
      <SeoLinks>
        <h2>Available Builds</h2>
        <nav aria-label="Build navigation">
          <ul>
            {builds.map(build => (
              <li key={`seo-${build.id}`}>
                <a href={`/builds/${build.slug}`}>
                  {build.title} - {build.shortDescription}
                </a>
              </li>
            ))}
          </ul>
        </nav>
      </SeoLinks>

      {/* Always render InfoContainer before the grid */}
      <InfoContainer role="complementary" aria-label="Build details">
        <InfoHeader>{buildDetails.title}</InfoHeader>
        <InfoText>{buildDetails.shortDescription}</InfoText>
        {selectedIndex != null && (
          <LinkButton 
            href={`/builds/${builds[selectedIndex].slug}`}
            aria-label={`View details for ${builds[selectedIndex].title}`}
          >
            Select Build
          </LinkButton>
        )}
      </InfoContainer>

      <GridContainer role="grid">
        {builds.map((build, index) => (
          <ImageContainer 
            key={build.id} 
            onClick={() => handleClick(index)}
            role="gridcell"
            aria-label={build.title}
          >
            <Image 
              src={build.bannerImage.sizes.thumbnail.url} 
              alt={build.bannerImage.alt} 
              loading="eager"
            />
            <Overlay visible={selectedIndex === index}>
              {build.name}
            </Overlay>
            {/* Adding a hidden link for each build that's always in the DOM */}
            <a 
              href={`/builds/${build.slug}`} 
              aria-hidden="true" 
              tabIndex={-1}
              style={{ display: 'none' }}
            >
              {build.title}
            </a>
          </ImageContainer>
        ))}
      </GridContainer>
    </BuildSelectContainer>
  );
};
