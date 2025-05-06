import {
  HeroContainer,
  HeroImageElement,
  HeroImageWrapper,
  HeroImageBlurBg
} from './Hero.css';

export const HeroImage = ({ coverImg, title = "", subtitle = "" }) => {
  return (
    <HeroContainer>
      <HeroImageWrapper style={{ position: 'relative' }}>
        <HeroImageBlurBg src={coverImg} alt="" aria-hidden="true" />
        <HeroImageElement src={coverImg} alt={title} priority width={1600} height={600} />
      </HeroImageWrapper>
    </HeroContainer>
  );
};
