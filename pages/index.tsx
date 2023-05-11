import Head from 'next/head';
import { HeroImage, FeaturedBuilds, FeaturedTools } from 'components';
import { getPage, getFeaturedBuilds, getFeaturedTools } from 'utils/payloadApi';
import { HomeContainer } from "styles/Home.css";

export default function Home({coverImg, featuredBuilds, featuredTools}) {
  return (
    <>
      <Head>
        <title>Dire Dice Blog</title>
        <meta name="description" content="Blog for Dungeons and Dragons and Coding" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <HeroImage
        coverImg={coverImg}
        title="Dire Dice"
        subtitle="Roll with it"
      />
      <HomeContainer>
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
  const dataHost = process.env.PAYLOAD_HOST;
  return {
    props:{
      coverImg: `${dataHost}${pageData.bannerImage.url}`,
      featuredBuilds,
      featuredTools,
    }
  };
}