import React from "react";
import Head from 'next/head'
import { getBuild, getBuilds } from "utils/payloadApi";
import { BuildPage } from "components"

export default function Build({ targetBuild }) {
  return (
    <>
      <Head>
        <title>{`Dire Dice | Builds | ${targetBuild.title}`}</title>
        <meta name="description" content={targetBuild.meta.description} />
        <meta property="og:title" content={targetBuild.meta.title} />
        <meta property="og:description" content={targetBuild.meta.description} />
        <meta property="og:image" content={`https://www.diredice.com${targetBuild.bannerImage.url}`} />
        <meta property="og:url" content={`https://www.diredice.com/builds/${targetBuild.slug}`} />
        <meta property="og:type" content="website" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <BuildPage build={targetBuild} />
    </>
  )
}

export async function getStaticProps({ params = { buildSlug: "" } }) {
  const targetBuild = (await getBuild(params.buildSlug));
  return {
    props: {
      targetBuild,
    }
  }
}

export async function getStaticPaths() {
  const builds = (await getBuilds());
  const paths = builds.map((build, index) => {
    return {
      params: {
        buildSlug: build.slug,
      }
    };
  });
  return {
    paths,
    fallback: "blocking",
  };
}