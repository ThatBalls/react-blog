import Head from 'next/head';
import { HeroImage, FeaturedBuilds, FeaturedTools } from 'components';
import { getPage, getFeaturedBuilds, getFeaturedTools, getFeaturedBrews } from 'utils/payloadApi';
import { HomeContainer } from "styles/Home.css";
import { FeaturedBrews } from 'components/FeaturedBrews';

export default function Home({coverImg, featuredBrews, featuredBuilds, featuredTools}) {
  return (
    <>
      <Head>
        <title>Dire Dice</title>
        <meta name="description" content="Tools and Builds for Dungeons and Dragons" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <HeroImage
        coverImg={coverImg}
        title="Dire Dice"
        subtitle="Roll with it"
      />
      <HomeContainer>
        <FeaturedBrews brews={featuredBrews} />
        <FeaturedBuilds builds={featuredBuilds} />
        <FeaturedTools tools={featuredTools} />
      </HomeContainer>
    </>
  )
}

export async function getStaticProps() {
  const pageData = await getPage("home");
  const featuredBuilds = await getFeaturedBuilds();
  const featuredTools = await getFeaturedTools();
  const featuredBrews = await getFeaturedBrews();
  const dataHost = process.env.PAYLOAD_HOST;
  return {
    props:{
      coverImg: `${dataHost}${pageData.bannerImage.url}`,
      featuredBrews,
      featuredBuilds,
      featuredTools,
    }
  };
}