import { LinkButton } from "patterns";
import { FeaturedBrewsContainer, FeaturedBrewWrapper, FeaturedBrewsPreviewArea, FeaturedBrewDescriptionWrapper, FeaturedBrewImage } from "./FeaturedBrews.css";

export const FeaturedBrews = ({ brews }) => {
  return (
    <>
      <FeaturedBrewsContainer>
        <FeaturedBrewsPreviewArea>
          <FeaturedBrewWrapper>
            <FeaturedBrewImage
              src={brews.bannerImage.sizes.tablet.url}
              alt={brews.bannerImage.alt}
              fill
              priority />
          </FeaturedBrewWrapper>
        </FeaturedBrewsPreviewArea>
        <FeaturedBrewDescriptionWrapper>
          <h1>Brews</h1>
          <p>Brew something new!</p>
          <LinkButton href={`/brews`}>Get brewing</LinkButton>
        </FeaturedBrewDescriptionWrapper>
      </FeaturedBrewsContainer>
    </>
  );
}