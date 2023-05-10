import Head from 'next/head';
import { MagicItemGenerator } from "components/tools";

export default function Subclass() {
  return (
    <>
      <Head>
        <title>Magic Item Generator</title>
        <meta name="description" content={`Generate new magic items`} />
        <meta property="og:title" content={`Magic Item Generator`} />
        <meta property="og:description" content={`Generate new magic items`} />
        <meta property="og:url" content={`https://dire-dice.com/brew/magicitem`} />
        <meta property="og:type" content="website" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <MagicItemGenerator />
    </>
  )
};