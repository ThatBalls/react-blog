import { FeaturedToolsContainer, FeaturedToolWrapper, FeaturedToolPreviewArea, FeaturedToolDescriptionWrapper, FeaturedToolLinkButton, FeaturedToolImage } from "./FeaturedTools.css";

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
          <FeaturedToolLinkButton href={`/tools/dice`}>Try it!</FeaturedToolLinkButton>
        </FeaturedToolDescriptionWrapper>
      </FeaturedToolsContainer>
    </>
  );
}