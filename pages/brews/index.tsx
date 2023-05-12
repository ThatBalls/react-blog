import Head from 'next/head'
import { getPage } from "utils/payloadApi";
import { HeroImage, BrewList } from 'components';
import { getBrews } from 'utils/payloadApi';

export default function BuildsPage({ coverImg, brews }) {
  return (
    <>
      <Head>
        <title>Homebrew Generators</title>
        <meta name="description" content='Homebrew Generators' />
        <meta property="og:title" content='Homebrew Generators' />
        <meta property="og:description" content='Homebrew Generators' />
        <meta property="og:url" content={`https://www.diredice.com/brews`} />
        <meta property="og:type" content="website" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <HeroImage coverImg={coverImg} />
      <BrewList brews={brews} />
    </>
  )
}

export async function getStaticProps() {
  const pageData = await getPage("brews");
  const brews = await getBrews();
  const dataHost = process.env.PAYLOAD_HOST;
  return {
    props: {
      coverImg: `${dataHost}${pageData.bannerImage.url}`,
      brews
    }
  }
};