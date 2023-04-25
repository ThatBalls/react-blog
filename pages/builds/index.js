import Head from 'next/head'
import { getBuilds, getPage } from "utils/payloadApi";
import { Card, Button } from 'react-bootstrap';
import { HeroImage } from 'components';
import Link from 'next/link';
import { BuildList } from "./builds.css.ts"

export default function BuildsPage({ coverImg, buildList, dataHost }) {
  return (
    <div>
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
        coverImg={coverImg}
        title="Creative Character Builds"
        subtitle="Optimal Fun"/>
      <BuildList>
        {buildList.docs.map(build => (
          <Card key={build.id}>
            <Card.Img variant="top" src={`${dataHost}${build.bannerImage.sizes.thumbnail.url}`} />
            <Card.Body>
              <Card.Title>{build.title}</Card.Title>
              <Card.Text>{build.shortDescription}</Card.Text>
              <Link href={`/builds/${build.slug}`}><Button variant="primary">Read</Button></Link>
            </Card.Body>
          </Card>
        ))}
      </BuildList>
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