import Head from 'next/head'
import { getPage } from 'utils/ghostAPI';
import { getBuilds } from "utils/payloadApi";
import { Card, Button } from 'react-bootstrap';
import { HeroImage } from 'components';
import Link from 'next/link';
import styles from './Builds.module.css';

export default function BuildList({ pageData, buildList }) {
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
      <HeroImage
        coverImg={pageData.feature_image}
        title="Creative Character Builds"
        subtitle="Optimal Fun"/>
      <main className={styles.buildList}>
        {buildList.docs.map(build => (
          <Card key={build.id}>
            <Card.Img variant="top" src={build.bannerImage.sizes.thumbnail.url} />
            <Card.Body>
              <Card.Title>{build.title}</Card.Title>
              <Card.Text>{build.shortDescription}</Card.Text>
              <Link href={`/builds/${build.slug}`}><Button variant="primary">Read</Button></Link>
            </Card.Body>
          </Card>
        ))}
      </main>
    </div>
  )
}

export async function getStaticProps() {
  const buildList = await getBuilds();
  const pageData = await getPage('builds');
  return {
    props: {
      pageData,
      buildList
    }
  }
};