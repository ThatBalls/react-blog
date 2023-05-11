import {
  HeroContainer,
  HeroImg,
  HeroImageElement,
  HeroText
} from './Hero.css';

export const HeroImage = ({ coverImg, title = "", subtitle = "" }) => {
  return (
    <HeroContainer>
      {/* <HeroImg style={{ backgroundImage: `linear-gradient(rgba(0, 0, 0, 0), rgba(0, 0, 0, 0.5)), url("${coverImg}")` }}> */}
      <HeroImageElement fill src={coverImg} alt={title} priority />
        {/*<HeroText>
          <h1>
            {title}
          </h1>
          <h2>{subtitle}</h2>
        </HeroText>
        */}
      {/* </HeroImg> */}
    </HeroContainer>
  );
};
