import React from "react";
import Head from 'next/head'
import { getBrews, getBrew } from "utils/payloadApi";
import { PicoWrapper } from "components/tools"
import { Brew, BrewTypes } from "components/Brew";

export default function BrewPage({ targetBrew }) {
  return (
    <>
      <Head>
        <title>{`Dire Dice | Brews | ${targetBrew.title}`}</title>
        <meta name="description" content={targetBrew.meta.description} />
        <meta property="og:title" content={targetBrew.meta.title} />
        <meta property="og:description" content={targetBrew.meta.description} />
        <meta property="og:image" content={`https://www.diredice.com${targetBrew.bannerImage.url}`} />
        <meta property="og:url" content={`https://www.diredice.com/brews/${targetBrew.slug}`} />
        <meta property="og:type" content="website" />
        <link rel="icon" href="/favicon.ico" />
        <link rel="canonical" href={`https://www.diredice.com/brews/${targetBrew.slug}`} key="canonical" />
      </Head>
      {targetBrew.slug && Object.values(BrewTypes).includes(targetBrew.slug.toLowerCase() as BrewTypes) ? (
        <Brew brewType={targetBrew.slug.toLowerCase() as BrewTypes} />
      ) : (
        <PicoWrapper url={targetBrew.externalUrl} />
      )}
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