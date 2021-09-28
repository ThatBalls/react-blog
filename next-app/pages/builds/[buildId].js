import Head from 'next/head'
import styles from '../../styles/Home.module.css';
    
export default function Build({ buildId, title }) {
  return (
    <div className={styles.container}>
      <Head>
        <title>{ title } - My Builds</title>
        <meta name="description" content={`Learn more about ${title}`} />
        <meta property="og:title" content={`${ title } - My Clothing Store`} />
        <meta property="og:description" content={`Learn more about ${title}`} />
        <meta property="og:url" content={`https://dire-dice.com/builds/${buildId}`} />
        <meta property="og:type" content="website" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <main className={styles.main}>
        <h1 className={styles.title}>{ title }</h1>
        <p>Build ID: { buildId }</p>
      </main>
    </div>
  )
}

export async function getStaticProps({ params = {} } = {}) {
  return {
    props: {
      buildId: params.buildId,
      title: `Build ${params.buildId}`
    }
  }
}

export async function getStaticPaths() {
  const paths = [...new Array(5)].map((i, index) => {
    return {
      params: {
        buildId: `${index + 1}`,
      }
    };
  });
  return {
    paths,
    fallback: false,
  };
}