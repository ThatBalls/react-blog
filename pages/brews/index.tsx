import Head from 'next/head'
import { getPage } from "utils/payloadApi";
import { HeroImage, BrewList } from 'components';
import { getBrews } from 'utils/payloadApi';

export default function BuildsPage({ coverImg, brews, pageData }) {
  return (
    <>
      <Head>
        <title>Dire Dice - Homebrew Generators</title>
        <meta name="description" content={pageData.meta.description} />
        <meta property="og:title" content={pageData.meta.title} />
        <meta property="og:description" content={pageData.meta.description} />
        <meta property="og:image" content={`https://www.diredice.com${pageData.bannerImage.url}`} />
        <meta property="og:url" content={`https://www.diredice.com/brews`} />
        <meta property="og:type" content="website" />
        <link rel="icon" href="/favicon.ico" />
        <link rel="canonical" href={`https://www.diredice.com/brews`} key="canonical" />
      </Head>
      <HeroImage coverImg={coverImg} />
      <BrewList brews={brews} />
    </>
  )
}

export async function getStaticProps() {
  const pageData = await getPage("brews");
  const brews = await getBrews();
  const dataHost = process.env.HOST;
  return {
    props: {
      coverImg: `${dataHost}${pageData.bannerImage.url}`,
      brews,
      pageData,
    }
  }
};