import Head from 'next/head';
import Link from 'next/link';
import { Container, Row, Col, Card, Button } from 'react-bootstrap';
import styles from '../styles/Home.module.css';

export default function Home() {
  return (
    <Container fluid className={styles.main}>
      <Head>
        <title>Dire Dice Blog</title>
        <meta name="description" content="Blog for Dungeons and Dragons and Coding" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <Row>
        <h1 className={styles.title}>
          Welcome to Dire Dice
        </h1>
        <h3 className={styles.description}>
          What's new:
        </h3>
      </Row>
      <Row>
        <Col>
          <Card style={{ width: '18rem' }}>
            <Card.Img variant="top" src="sktcover.png" />
            <Card.Body>
              <Card.Title>Storm King's Thunder DM Diary</Card.Title>
              <Card.Text>
                The gang meets Zephyros!
              </Card.Text>
              <Link href='/diaries/1'><Button variant="primary">Feel the Thunder!</Button></Link>
            </Card.Body>
          </Card>
        </Col>
        <Col>
          <Card style={{ width: '18rem' }}>
            <Card.Img variant="top" src="sktcover.png" />
            <Card.Body>
              <Card.Title>Latest Character Build</Card.Title>
              <Card.Text>
                Marcela the Shadow is ready to ambush!
              </Card.Text>
              <Button variant="primary">Sneak Attack!</Button>
            </Card.Body>
          </Card>
        </Col>
        <Col>
          <Card style={{ width: '18rem' }}>
            <Card.Img variant="top" src="sktcover.png" />
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
  )
}
