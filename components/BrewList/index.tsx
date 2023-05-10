import { BrewListContainer, Brew, BrewDescriptionWrapper, BrewImage, BrewImageWrapper, BrewLinkButton } from "./BrewList.css";

export const BrewList = ({ brews }) => {
  return (
    <BrewListContainer>
      {brews.map(brew =>
        (<Brew key={brew.title}>
          <BrewImageWrapper>
            <BrewImage src={brew.bannerImage.sizes.tablet.url}
              alt={brew.bannerImage.alt}
              fill
              priority />
          </BrewImageWrapper>
          <BrewDescriptionWrapper>
            <h1>{brew.title}</h1>
            <p>{brew.description}</p>
            <BrewLinkButton href={`/brew/${brew.slug}`}>Read more</BrewLinkButton>
          </BrewDescriptionWrapper>
        </Brew>)
      )}
    </BrewListContainer>
  );
};