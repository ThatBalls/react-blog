import Head from 'next/head'
import { getBuilds, getPage } from "utils/payloadApi";
import { HeroImage, BuildSelect } from 'components';

export default function BuildsPage({ coverImg, buildList, pageData }) {
  return (
    <div>
      <Head>
        <title>Dire Dice - Build List</title>
        <meta name="description" content={pageData.meta.description} />
        <meta property="og:title" content={pageData.meta.title} />
        <meta property="og:description" content={pageData.meta.description} />
        <meta property="og:image" content={`https://www.diredice.com${pageData.bannerImage.url}`} />
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
      pageData,
    }
  }
};