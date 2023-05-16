import { BrewListContainer, Brew, BrewDescriptionWrapper, BrewImage, BrewImageWrapper } from "./BrewList.css";

export const BrewList = ({ brews }) => {
  return (
    <BrewListContainer>
      {brews.map(brew =>
        (<Brew key={brew.title} href={`/brews/${brew.slug}`}>
          <BrewImageWrapper>
            <BrewImage src={brew.bannerImage.sizes.tablet.url}
              alt={brew.bannerImage.alt}
              fill
              priority />
          </BrewImageWrapper>
          <BrewDescriptionWrapper>
            <h1>{brew.title}</h1>
            <p>{brew.description}</p>
          </BrewDescriptionWrapper>
        </Brew>)
      )}
    </BrewListContainer>
  );
};