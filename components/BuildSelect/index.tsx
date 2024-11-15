import React, { useMemo, useState } from "react";
import { LinkButton } from "patterns";
import Link from "next/link";
import { BuildSelectContainer, GridContainer, ImageContainer, Image, Overlay, InfoContainer, InfoHeader, InfoText, BackgroundOverlay } from "./BuildSelect.css";

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
      <BackgroundOverlay visible={selectedIndex != null} onClick={() => setSelectedIndex(null)} />
      <GridContainer>
        {builds.map((build, index) => (
          <ImageContainer key={build.id} onClick={() => handleClick(index)}>
            <Image selected={selectedIndex === index} src={build.bannerImage.sizes.thumbnail.url} alt={build.bannerImage.alt} priority />
            <Overlay visible={selectedIndex === index}><Link href={`/builds/${build.slug}`} /></Overlay>
          </ImageContainer>
        ))}
      </GridContainer>
      <InfoContainer>
        <InfoHeader>{buildDetails.title}</InfoHeader>
        {selectedIndex != null ? <InfoText>{buildDetails.shortDescription}</InfoText> : null}
        {selectedIndex != null ? <LinkButton href={`/builds/${builds[selectedIndex].slug}`}>Read more</LinkButton> : null}
      </InfoContainer>
    </BuildSelectContainer>);
};
