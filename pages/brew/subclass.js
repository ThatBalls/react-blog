import Head from 'next/head';
import { SubclassGenerator } from "components/tools";

export default function Subclass() {
  return (
    <>
      <Head>
        <title>Subclass Generator</title>
        <meta name="description" content={`Generate new subclasses`} />
        <meta property="og:title" content={`Subclass Generator`} />
        <meta property="og:description" content={`Generate new subclasses`} />
        <meta property="og:url" content={`https://diredice.com/brew/subclass`} />
        <meta property="og:type" content="website" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <SubclassGenerator />
    </>
  )
};