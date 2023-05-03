import Head from 'next/head'
    
export default function Diary({ journalId, title }) {
  return (
    <div>
      <Head>
        <title>{ title } - My Journals</title>
        <meta name="description" content={`Learn more about ${title}`} />
        <meta property="og:title" content={`${ title } - My Clothing Store`} />
        <meta property="og:description" content={`Learn more about ${title}`} />
        <meta property="og:url" content={`https://dire-dice.com/builds/${journalId}`} />
        <meta property="og:type" content="website" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <main>
        <h1>{ title }</h1>
        <p>Journal ID: { journalId }</p>
      </main>
    </div>
  )
}

export async function getStaticProps({ params = {} } = {}) {
  return {
    props: {
      journalId: params.journalId,
      title: `Diary ${params.journalId}`
    }
  }
}

export async function getStaticPaths() {
  const paths = [...new Array(5)].map((i, index) => {
    return {
      params: {
        journalId: `${index + 1}`,
      }
    };
  });
  return {
    paths,
    fallback: false,
  };
}