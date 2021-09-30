import Head from 'next/head'
import GhostContentAPI from "@tryghost/content-api";
import Link from 'next/link';
import styles from './Builds.module.css';

const api = new GhostContentAPI({
  url: 'https://dire-dice-ghost.herokuapp.com',
  key: 'ff248a91e1538cb754165b35be',
  version: "v3"
});

export async function getBuilds() {
  return await api.posts
    .browse({
      filter: 'tag:Builds'
    })
    .catch(err => {
      console.error(err);
    });
};
    
export default function BuildList({ buildList }) {
  return (
    <div className={styles.container}>
      <Head>
        <title>Build List</title>
        <meta name="description" content='Build List' />
        <meta property="og:title" content='Build List' />
        <meta property="og:description" content='Build List' />
        <meta property="og:url" content={`https://dire-dice.com/builds`} />
        <meta property="og:type" content="website" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <main className={styles.main}>
        {buildList.map(build => (
          <Link key={build.slug} href={`builds/${build.slug}`}>{build.title}</Link>
        ))}
      </main>
    </div>
  )
}

export async function getStaticProps() {
  const buildResponse = await getBuilds();
  const buildList = buildResponse.map(build => ({
    title: build.title,
    slug: build.slug
  }));
  return {
    props: {
      buildList
    }
  }
}