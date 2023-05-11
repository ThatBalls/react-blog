import React, { useMemo, useState } from "react";
import { LinkButton } from "patterns";
import { BuildSelectContainer, GridContainer, ImageContainer, Image, Overlay, InfoContainer, InfoHeader, InfoText } from "./BuildSelect.css";

export const BuildSelect = ({ builds }) => {
  const [selectedIndex, setSelectedIndex] = useState(null);

  const handleClick = (index) => {
    setSelectedIndex(index);
  };

  const buildDetails = useMemo(() => selectedIndex != null ? builds[selectedIndex] : {
    title: "Select a build",
    shortDescription: ""
  }, [selectedIndex, builds]);

  return (
    <BuildSelectContainer>
      <GridContainer>
        {builds.map((build, index) => (
          <ImageContainer key={build.id} onClick={() => handleClick(index)}>
            <Image src={build.bannerImage.sizes.thumbnail.url} alt={build.bannerImage.alt} priority />
            <Overlay visible={selectedIndex === index}>{build.name}</Overlay>
          </ImageContainer>
        ))}
      </GridContainer>
      <InfoContainer>
        <InfoHeader>{buildDetails.title}</InfoHeader>
        <InfoText>{buildDetails.shortDescription}</InfoText>
        {selectedIndex != null ? <LinkButton href={`/builds/${builds[selectedIndex].slug}`}>Read more</LinkButton> : null}
      </InfoContainer>
    </BuildSelectContainer>);
};
