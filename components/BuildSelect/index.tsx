import React, { useState } from "react";
import { BuildSelectContainer, GridContainer, ImageContainer, Image, Overlay, InfoContainer, InfoHeader, InfoText, BuildLinkButton } from "./BuildSelect.css";

export const BuildSelect = ({ builds }) => {
  const [selectedIndex, setSelectedIndex] = useState(null);

  const handleClick = (index) => {
    setSelectedIndex(index);
  };

  return (
    <BuildSelectContainer>
      <GridContainer>
        {builds.map((build, index) => (
          <ImageContainer key={build.id} onClick={() => handleClick(index)}>
            <Image src={build.bannerImage.sizes.thumbnail.url} alt={build.bannerImage.alt} />
            <Overlay visible={selectedIndex === index}>{build.name}</Overlay>
          </ImageContainer>
        ))}
      </GridContainer>
      {selectedIndex != null && (
        <InfoContainer>
          <InfoHeader>{builds[selectedIndex].title}</InfoHeader>
          <InfoText>{builds[selectedIndex].shortDescription}</InfoText>
          <BuildLinkButton href={`/builds/${builds[selectedIndex].slug}`}>Read more</BuildLinkButton>
        </InfoContainer>)}
    </BuildSelectContainer>);
};
