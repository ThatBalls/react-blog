import Head from 'next/head'
    
export default function About() {
  return (
    <div className={styles.container}>
      <Head>
        <title>About - My Blog</title>
        <meta name="description" content="The story behind My Blog!" />
        <meta property="og:title" content="About - My Blog" />
        <meta property="og:description" content="The story behind My Blog" />
        <meta property="og:url" content="https://dire-dice.com/about" />
        <meta property="og:type" content="website" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <main>
        <h1>
          About My Blog
        </h1>
      </main>
    </div>
  )
}