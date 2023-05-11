import { LinkButton } from "patterns";
import { FeaturedToolsContainer, FeaturedToolWrapper, FeaturedToolPreviewArea, FeaturedToolDescriptionWrapper, FeaturedToolImage } from "./FeaturedTools.css";

export const FeaturedTools = ({ tools }) => {
  return (
    <>
      <FeaturedToolsContainer>
        <FeaturedToolPreviewArea>
          <FeaturedToolWrapper>
            <FeaturedToolImage
              src={tools.bannerImage.sizes.tablet.url}
              alt={tools.bannerImage.alt}
              fill
              priority />
          </FeaturedToolWrapper>
        </FeaturedToolPreviewArea>
        <FeaturedToolDescriptionWrapper>
          <h1>Dice Calculator</h1>
          <p>Crunch some numbers</p>
          <LinkButton href={`/tools/dice`}>Try it!</LinkButton>
        </FeaturedToolDescriptionWrapper>
      </FeaturedToolsContainer>
    </>
  );
}