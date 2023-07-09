import React from "react";
import Head from 'next/head'
import { getBrews, getBrew } from "utils/payloadApi";
import { PicoWrapper } from "components/tools"

export default function Brew({ targetBrew }) {
  return (
    <>
      <Head>
        <title>{`Dire Dice - ${targetBrew.metaTitle}`}</title>
        <meta name="description" content={targetBrew.metaDescription} />
        <meta property="og:title" content={`Dire Dice - ${targetBrew.metaTitle}`} />
        <meta property="og:description" content={targetBrew.metaDescription} />
        <meta property="og:url" content={`https://www.diredice.com/brews/${targetBrew.slug}`} />
        <meta property="og:type" content="website" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <PicoWrapper url={targetBrew.externalUrl} />
    </>
  )
}

export async function getStaticProps({ params = { brewSlug: "" } }) {
  const targetBrew = (await getBrew(params.brewSlug));
  return {
    props: {
      targetBrew,
    }
  }
}

export async function getStaticPaths() {
  const brews = (await getBrews());
  const paths = brews.map((brew, index) => {
    return {
      params: {
        brewSlug: brew.slug,
      }
    };
  });
  return {
    paths,
    fallback: "blocking",
  };
}