import Head from 'next/head';
import { HeroImage, FeaturedBuilds } from 'components';
import { getPage, getFeaturedBuilds } from 'utils/payloadApi';
import { HomeContainer } from "styles/Home.css";

export default function Home({coverImg, featuredBuilds}) {
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
      </HomeContainer>
    </>
  )
}

export async function getStaticProps() {
  const pageData = await getPage("home");
  const featuredBuilds = await getFeaturedBuilds();
  const dataHost = process.env.PAYLOAD_HOST;
  return {
    props:{
      coverImg: `${dataHost}${pageData.bannerImage.url}`,
      featuredBuilds
    }
  };
}