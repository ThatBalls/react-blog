import Head from 'next/head';
import { PlayerScreen } from "components/tools";
import { getPage, getBrews } from 'utils/payloadApi';

export default function PlayerScreenPage({ brews }) {
  return (
    <>
      <Head>
        <title>Dire Dice - Player Screen</title>
        <meta name="description" content={`Player screen for reference`} />
        <meta property="og:title" content={`Dire Dice - Player Screen`} />
        <meta property="og:description" content={`Player screen for reference`} />
        <meta property="og:url" content={`https://www.diredice.com/tools/screen`} />
        <meta property="og:type" content="website" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <PlayerScreen brews={brews} />
    </>
  )
};

export async function getStaticProps() {
  const brews = await getBrews();
  return {
    props: {
      brews
    }
  }
};