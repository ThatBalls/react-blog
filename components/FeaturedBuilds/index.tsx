import { useState, useMemo, useEffect, useCallback, useRef } from "react";
import Link from 'next/link';
import { FeaturedBuildsContainer, FeaturedBuildWrapper, FeaturedBuildImage, FeaturedBuildPreview, FeaturedBuildDescriptionWrapper, FeaturedBuildPreviewArea, FeaturedBuildLinkButton } from './FeaturedBuilds.css'

const NUM_FEATURED_BUILDS = 3;
const AUTO_ADVANCE_TIME = 5000;

export const FeaturedBuilds = ({ builds }) => {
  const [openedBuild, setOpenedBuild] = useState<number>(0);
  const [buildChangeInterval, setBuildChangeInterval] = useState(null);
  const buildRef = useRef(openedBuild);

  const createInterval = useCallback(() => {
    const id = setInterval(() => {
      setOpenedBuild((buildRef.current + 1) % 3);
    }, AUTO_ADVANCE_TIME);
    setBuildChangeInterval(id);
    return id;
  }, [openedBuild, setOpenedBuild, setBuildChangeInterval]);

  useEffect(() => {
    buildRef.current = openedBuild;
  }, [openedBuild]);

  useEffect(() => {
    const id = createInterval();
    return () => clearInterval(id);
  }, []);

  const openBuildPreview = (index: number) => {
    setOpenedBuild(index);
  };

  const enterBuildPreview = () => {
    clearInterval(buildChangeInterval);
  };

  const leaveBuildPreview = () => {
    createInterval();
  };

  const buildData = useMemo(() => openedBuild != null ? builds[openedBuild] : {
    title: "Featured Builds",
    shortDescription: "Click a build to see details"
  }, [openedBuild]);

  return (
    <>
      <FeaturedBuildsContainer onMouseEnter={enterBuildPreview} onMouseLeave={leaveBuildPreview}>
        <FeaturedBuildPreviewArea>
          {builds.slice(0, NUM_FEATURED_BUILDS).map((build, index) => (
            <FeaturedBuildWrapper isBuildOpened={openedBuild === index} onClick={() => openBuildPreview(index)} key={build.id}>
              <FeaturedBuildPreview />
              <FeaturedBuildImage src={build.bannerImage.sizes.tablet.url} alt={build.bannerImage.alt} />
            </FeaturedBuildWrapper>
          ))}
          </FeaturedBuildPreviewArea>
          <FeaturedBuildDescriptionWrapper>
            <h1>{buildData.title}</h1>
            <p>{buildData.shortDescription}</p>
            <FeaturedBuildLinkButton href={`/builds/${buildData.slug}`}>Read more</FeaturedBuildLinkButton>
          </FeaturedBuildDescriptionWrapper>
      </FeaturedBuildsContainer>
    </>
  );
};
