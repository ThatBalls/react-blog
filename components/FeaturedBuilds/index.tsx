import { useState, useMemo, useEffect, useCallback, useRef } from "react";
import Image from "next/image";
import "react-responsive-carousel/lib/styles/carousel.min.css";
import { Carousel } from 'react-responsive-carousel';
import { FeaturedBuildsContainer, FeaturedBuildWrapper, FeaturedBuildImage, FeaturedBuildPreview, FeaturedBuildDescriptionWrapper, FeaturedBuildPreviewArea, FeaturedBuildLinkButton, FeaturedBuildsLarge, FeaturedBuildsSmall, FeaturedBuildCarouselItem, FeaturedBuildCarouselImage, SmallFeaturedBuildImage, FeaturedImageWrapper } from './FeaturedBuilds.css'

const NUM_FEATURED_BUILDS = 3;
const AUTO_ADVANCE_TIME = 5000;

export const FeaturedBuilds = ({ builds }) => {
  const [openedBuild, setOpenedBuild] = useState<number>(0);
  const [buildChangeInterval, setBuildChangeInterval] = useState(null);
  const [smallBuildData, setSmallBuildData] = useState(builds[0]);
  const buildRef = useRef(openedBuild);

  const createInterval = useCallback(() => {
    const id = setInterval(() => {
      setOpenedBuild((buildRef.current + 1) % 3);
    }, AUTO_ADVANCE_TIME);
    setBuildChangeInterval(id);
    return id;
  }, [setOpenedBuild, setBuildChangeInterval]);

  useEffect(() => {
    buildRef.current = openedBuild;
  }, [openedBuild]);

  useEffect(() => {
    createInterval();
    return () => clearInterval(buildChangeInterval);
  }, [createInterval]);

  const openBuildPreview = (index: number) => {
    setOpenedBuild(index);
  };

  const enterBuildPreview = () => {
    clearInterval(buildChangeInterval);
  };

  const leaveBuildPreview = () => {
    createInterval();
  };

  const largeBuildData = useMemo(() => openedBuild != null ? builds[openedBuild] : {
    title: "Featured Builds",
    shortDescription: "Click a build to see details"
  }, [openedBuild, builds]);

  return (
    <>
      <FeaturedBuildsContainer onMouseEnter={enterBuildPreview} onMouseLeave={leaveBuildPreview}>
        <FeaturedBuildsLarge>
          <FeaturedBuildPreviewArea>
            {builds.slice(0, NUM_FEATURED_BUILDS).map((build, index) => (
              <FeaturedBuildWrapper isBuildOpened={openedBuild === index} onClick={() => openBuildPreview(index)} key={build.id}>
                <FeaturedBuildPreview />
                <FeaturedBuildImage src={build.bannerImage.sizes.tablet.url} alt={build.bannerImage.alt} />
              </FeaturedBuildWrapper>
            ))}
          </FeaturedBuildPreviewArea>
          <FeaturedBuildDescriptionWrapper>
            <h1>{largeBuildData.title}</h1>
            <p>{largeBuildData.shortDescription}</p>
            <FeaturedBuildLinkButton href={`/builds/${largeBuildData.slug}`}>Read more</FeaturedBuildLinkButton>
          </FeaturedBuildDescriptionWrapper>
        </FeaturedBuildsLarge>
        <FeaturedBuildsSmall>
          <FeaturedImageWrapper>
            <SmallFeaturedBuildImage src={builds[0].bannerImage.sizes.tablet.url}
              alt={builds[0].bannerImage.alt}
              fill
              priority />
          </FeaturedImageWrapper>
          {/* <Carousel
            className="carousel-wrapper"
            showThumbs={false}
            showStatus={false}
            autoPlay
            stopOnHover
            infiniteLoop
            interval={AUTO_ADVANCE_TIME}
            onChange={(index) => setSmallBuildData(builds[index])}>
            {builds.slice(0, NUM_FEATURED_BUILDS).map((build, index) => (
              <FeaturedBuildCarouselItem key={build.id}>
                <FeaturedBuildCarouselImage
                  src={build.bannerImage.sizes.tablet.url}
                  alt={build.bannerImage.alt}
                  fill
                  sizes="(max-width: 1024px) 100vw,
                    80vw" />
              </FeaturedBuildCarouselItem>
            ))}
          </Carousel> */}
          <FeaturedBuildDescriptionWrapper>
            <h1>Specialized Builds</h1>
            <p>Check out some fun and unique character builds for Dungeons and Dragons</p>
            <FeaturedBuildLinkButton href={`/builds`}>Read more</FeaturedBuildLinkButton>
          </FeaturedBuildDescriptionWrapper>
        </FeaturedBuildsSmall>
      </FeaturedBuildsContainer>
    </>
  );
};
