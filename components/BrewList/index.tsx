import { BrewListContainer } from "./BrewList.css";
import { Card } from "components/shared/Card";

export const BrewList = ({ brews }) => {
  return (
    <BrewListContainer>
      {brews.map(brew => (
        <Card
          key={brew.title}
          href={`/brews/${brew.slug}`}
          imageUrl={brew.bannerImage.sizes.tablet.url}
          imageAlt={brew.bannerImage.alt}
          title={brew.title}
          description={brew.description}
        />
      ))}
    </BrewListContainer>
  );
};