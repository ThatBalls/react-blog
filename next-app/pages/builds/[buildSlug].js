import Head from 'next/head'
import {getBuilds, readBuild} from 'utils/ghostAPI';
import parse from 'html-react-parser';
import styles from './Builds.module.css';
    
export default function Build({ buildSlug, title, meta, html, imageUrl }) {
  return (
    <div className={styles.container}>
      <Head>
        <title>{meta.title}</title>
        <meta name="description" content={meta.description} />
        <meta property="og:title" content={meta.title} />
        <meta property="og:description" content={meta.description} />
        <meta property="og:url" content={`https://dire-dice.com/builds/${buildSlug}`} />
        <meta property="og:type" content="website" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <main className={styles.main}>
        <h1 className={styles.title}>{ title }</h1>
        <img src={imageUrl}></img>
        {parse(html)}
      </main>
    </div>
  )
}

export async function getStaticProps({ params = {} } = {}) {
  const targetBuild = await readBuild(params.buildSlug);
  return {
    props: {
      buildSlug: params.buildSlug,
      title: targetBuild.title,
      meta: {
        title: targetBuild.meta_title,
        description: targetBuild.meta_description
      },
      html: targetBuild.html,
      imageUrl: targetBuild.feature_image
    }
  }
}

export async function getStaticPaths() {
  const builds = await getBuilds();
  const paths = builds.map((build, index) => {
    return {
      params: {
        buildSlug: build.slug,
      }
    };
  });
  return {
    paths,
    fallback: false,
  };
}