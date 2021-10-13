import Head from 'next/head';
import Link from 'next/link';
import { Container, Row, Col, Card, Button } from 'react-bootstrap';
import { HeroImage } from 'components';
import {getSettings, getFeaturedPosts} from 'utils/ghostAPI';
import styles from '../styles/Home.module.css';

export default function Home({coverImg, featuredPosts}) {
  return (
    <>
      <Head>
        <title>Dire Dice Blog</title>
        <meta name="description" content="Blog for Dungeons and Dragons and Coding" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <HeroImage
        coverImg={coverImg}
        title="Welcome to DM Dad's Domain"
        subtitle="Roll with it"
      />
      <Container fluid className={styles.main}>
        <Row>
          <h3 className={styles.description}>
            {"What's new:"}
          </h3>
        </Row>
        <Row>
          {featuredPosts.map(post => {
            return (
              <Col>
                <Card style={{ width: '18rem' }}>
                  <Card.Img variant="top" src={post.feature_image} />
                  <Card.Body>
                    <Card.Title>{post.title}</Card.Title>
                    <Card.Text>{post.meta_description}</Card.Text>
                    {post.primary_tag && <Link href={`/${post.primary_tag.slug}/${post.slug}`}><Button variant="primary">Read</Button></Link>}
                  </Card.Body>
                </Card>
              </Col>
            )
          })}
          <Col>
            <Card style={{ width: '18rem' }}>
              <Card.Img variant="top" src="dice.jpg" />
              <Card.Body>
                <Card.Title>Dice Calculator</Card.Title>
                <Card.Text>
                  Calculate your damage or whatever.
                </Card.Text>
                <Link href='/tools/dice'><Button variant="primary">Get Crunchy!</Button></Link>
              </Card.Body>
            </Card>
          </Col>
        </Row>
      </Container>
    </>
  )
}

export async function getStaticProps() {
  const settings = await getSettings();
  const featuredPosts = await getFeaturedPosts();
  return {
    props:{
      coverImg: settings.cover_image,
      featuredPosts: featuredPosts
    }
  };
}