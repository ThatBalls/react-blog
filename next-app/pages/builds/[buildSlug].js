import Head from 'next/head'
import GhostContentAPI from "@tryghost/content-api";
import parse from 'html-react-parser';
import styles from './Builds.module.css';

const api = new GhostContentAPI({
  url: 'https://dire-dice-ghost.herokuapp.com',
  key: 'ff248a91e1538cb754165b35be',
  version: "v3"
});

export async function getPosts() {
  return await api.posts
    .browse({
      filter: 'tag:Builds'
    })
    .catch(err => {
      console.error(err);
    });
};

export async function readPost(slug) {
  return await api.posts
    .read({
      slug
    })
    .catch(err => {
      console.error(err);
    });
};
    
export default function Build({ buildSlug, title, meta, html }) {
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
        {parse(html)}
      </main>
    </div>
  )
}

export async function getStaticProps({ params = {} } = {}) {
  const targetPost = await readPost(params.buildSlug);
  return {
    props: {
      buildSlug: params.buildSlug,
      title: targetPost.title,
      meta: {
        title: targetPost.meta_title,
        description: targetPost.meta_description
      },
      html: targetPost.html
    }
  }
}

export async function getStaticPaths() {
  const posts = await getPosts();
  console.log(posts);
  const paths = posts.map((post, index) => {
    return {
      params: {
        buildSlug: post.slug,
      }
    };
  });
  return {
    paths,
    fallback: false,
  };
}