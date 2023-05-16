import Head from 'next/head'
import { getBuilds, getPage } from "utils/payloadApi";
import { HeroImage, BuildSelect } from 'components';

export default function BuildsPage({ coverImg, buildList, dataHost }) {
  return (
    <div>
      <Head>
        <title>Dire Dice - Build List</title>
        <meta name="description" content='Build List' />
        <meta property="og:title" content='Dire Dice - Build List' />
        <meta property="og:description" content='Build List' />
        <meta property="og:url" content={`https://www.diredice.com/builds`} />
        <meta property="og:type" content="website" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <HeroImage
        coverImg={coverImg}
        title="Creative Character Builds"
        subtitle="Optimal Fun"/>
      <BuildSelect builds={buildList} />
    </div>
  )
}

export async function getStaticProps() {
  const buildList = await getBuilds();
  const pageData = await getPage("builds");
  const dataHost = process.env.PAYLOAD_HOST;
  return {
    props: {
      coverImg: `${dataHost}${pageData.bannerImage.url}`,
      buildList,
      dataHost,
    }
  }
};