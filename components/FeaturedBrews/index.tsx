import { LinkButton } from "patterns";
import { useRouter } from 'next/router';
import { ROUTES } from 'constants/routes';
import { 
  FeaturedBrewsContainer, 
  FeaturedBrewWrapper, 
  FeaturedBrewsPreviewArea, 
  FeaturedBrewDescriptionWrapper, 
  FeaturedBrewImage,
  DesktopContainer,
  MobileContainer
} from "./FeaturedBrews.css";

export const FeaturedBrews = ({ brews }) => {
  const router = useRouter();
  const handleClick = () => {
    router.push(ROUTES.BREWS);
  };

  return (
    <FeaturedBrewsContainer>
      <DesktopContainer>
        <FeaturedBrewsPreviewArea onClick={handleClick} style={{ cursor: 'pointer' }}>
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
          <div>
            <LinkButton href={ROUTES.BREWS}>Get brewing</LinkButton>
          </div>
        </FeaturedBrewDescriptionWrapper>
      </DesktopContainer>

      <MobileContainer onClick={handleClick} style={{ cursor: 'pointer' }}>
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
          <div onClick={(e) => e.stopPropagation()}>
            <LinkButton href={ROUTES.BREWS}>Get brewing</LinkButton>
          </div>
        </FeaturedBrewDescriptionWrapper>
      </MobileContainer>
    </FeaturedBrewsContainer>
  );
}