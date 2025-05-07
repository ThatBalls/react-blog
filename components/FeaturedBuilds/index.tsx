import { useState, useMemo, useEffect, useCallback, useRef } from "react";
import { LinkButton } from "patterns";
import { useRouter } from 'next/router';
import { ROUTES } from 'constants/routes';
import { FeaturedBuildsContainer, FeaturedBuildWrapper, FeaturedBuildImage, FeaturedBuildPreview, FeaturedBuildDescriptionWrapper, FeaturedBuildPreviewArea, FeaturedBuildsLarge, SmallFeaturedBuildImage, FeaturedImageWrapper, MobileContainer } from './FeaturedBuilds.css'

const NUM_FEATURED_BUILDS = 3;
const AUTO_ADVANCE_TIME = 5000;

export const FeaturedBuilds = ({ builds }) => {
  const router = useRouter();
  const [openedBuild, setOpenedBuild] = useState<number>(0);
  const [isMouseOver, setIsMouseOver] = useState<boolean>(false);
  const buildRef = useRef(openedBuild);

  const handleMobileClick = () => {
    router.push(ROUTES.BUILDS);
  };

  const createInterval = useCallback(() => {
    const id = setInterval(() => {
      if (isMouseOver) return;
      setOpenedBuild((buildRef.current + 1) % 3);
    }, AUTO_ADVANCE_TIME);
    return id;
  }, [isMouseOver]);

  useEffect(() => {
    buildRef.current = openedBuild;
  }, [openedBuild]);

  useEffect(() => {
    const id = createInterval();
    return () => clearInterval(id);
  }, [createInterval]);

  const openBuildPreview = (index: number) => {
    setOpenedBuild(index);
  };

  const enterBuildPreview = () => {
    setIsMouseOver(true);
  };

  const leaveBuildPreview = () => {
    setIsMouseOver(false);
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
            <LinkButton href={`/builds/${largeBuildData.slug}`}>Read more</LinkButton>
          </FeaturedBuildDescriptionWrapper>
        </FeaturedBuildsLarge>
        <MobileContainer onClick={handleMobileClick} style={{ cursor: 'pointer' }}>
          <FeaturedImageWrapper>
            <SmallFeaturedBuildImage
              src={builds[0].bannerImage.sizes.tablet.url}
              alt={builds[0].bannerImage.alt}
              fill
              priority
            />
          </FeaturedImageWrapper>
          <FeaturedBuildDescriptionWrapper>
            <h1>Specialized Builds</h1>
            <p>Check out some fun and unique character builds for Dungeons and Dragons</p>
            <div onClick={e => e.stopPropagation()}>
              <LinkButton href={ROUTES.BUILDS}>Read more</LinkButton>
            </div>
          </FeaturedBuildDescriptionWrapper>
        </MobileContainer>
      </FeaturedBuildsContainer>
    </>
  );
};
