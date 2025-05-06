import { LinkButton } from "patterns";
import { useRouter } from 'next/router';
import { ROUTES } from 'constants/routes';
import { 
  FeaturedToolsContainer, 
  FeaturedToolWrapper, 
  FeaturedToolPreviewArea, 
  FeaturedToolDescriptionWrapper, 
  FeaturedToolImage,
  DesktopContainer,
  MobileContainer
} from "./FeaturedTools.css";

export const FeaturedTools = ({ tools }) => {
  const router = useRouter();
  const handleClick = () => {
    router.push(ROUTES.TOOLS_DICE);
  };

  return (
    <FeaturedToolsContainer>
      <DesktopContainer>
        <FeaturedToolPreviewArea onClick={handleClick} style={{ cursor: 'pointer' }}>
          <FeaturedToolWrapper>
            <FeaturedToolImage
              src={tools.bannerImage.sizes.tablet.url}
              alt={tools.bannerImage.alt}
              fill
              priority />
          </FeaturedToolWrapper>
        </FeaturedToolPreviewArea>
        <FeaturedToolDescriptionWrapper>
          <h1>Tools</h1>
          <p>Find the right tool for the job!</p>
          <div>
            <LinkButton href={ROUTES.TOOLS_DICE}>Browse tools</LinkButton>
          </div>
        </FeaturedToolDescriptionWrapper>
      </DesktopContainer>

      <MobileContainer onClick={handleClick} style={{ cursor: 'pointer' }}>
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
          <h1>Tools</h1>
          <p>Find the right tool for the job!</p>
          <div onClick={(e) => e.stopPropagation()}>
            <LinkButton href={ROUTES.TOOLS_DICE}>Browse tools</LinkButton>
          </div>
        </FeaturedToolDescriptionWrapper>
      </MobileContainer>
    </FeaturedToolsContainer>
  );
}