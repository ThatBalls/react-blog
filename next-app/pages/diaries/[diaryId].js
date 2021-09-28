import Head from 'next/head'
import styles from '../../styles/Home.module.css';
    
export default function Diary({ diaryId, title }) {
  return (
    <div className={styles.container}>
      <Head>
        <title>{ title } - My Diaries</title>
        <meta name="description" content={`Learn more about ${title}`} />
        <meta property="og:title" content={`${ title } - My Clothing Store`} />
        <meta property="og:description" content={`Learn more about ${title}`} />
        <meta property="og:url" content={`https://dire-dice.com/builds/${diaryId}`} />
        <meta property="og:type" content="website" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <main className={styles.main}>
        <h1 className={styles.title}>{ title }</h1>
        <p>Diary ID: { diaryId }</p>
      </main>
    </div>
  )
}

export async function getStaticProps({ params = {} } = {}) {
  return {
    props: {
      diaryId: params.diaryId,
      title: `Diary ${params.diaryId}`
    }
  }
}

export async function getStaticPaths() {
  const paths = [...new Array(5)].map((i, index) => {
    return {
      params: {
        diaryId: `${index + 1}`,
      }
    };
  });
  return {
    paths,
    fallback: false,
  };
}