import React from "react";
import Head from 'next/head'
import { getBuild, getBuilds } from "utils/payloadApi";
import { slateToHtml, payloadSlateToDomConfig } from 'slate-serializers'
import parse from 'html-react-parser';
import styles from './Builds.module.css';
import { BuildPage, BannerWrapper, ContentWrapper, SplitRow, LevelTable } from "styles/builds.css";
    
export default function Build({ buildSlug, title, meta, concept, levelTable, levelBlocks, analysis, imageUrl }) {
  return (
    <div>
      <Head>
        <title>{meta.title}</title>
        <meta name="description" content={meta.description} />
        <meta property="og:title" content={meta.title} />
        <meta property="og:description" content={meta.description} />
        <meta property="og:url" content={`https://dire-dice.com/builds/${buildSlug}`} />
        <meta property="og:type" content="website" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <BuildPage>
        <BannerWrapper>
          <img src={imageUrl}></img>
          <h1 className={styles.title}>{ title }</h1>
        </BannerWrapper>
        <ContentWrapper>
          <h2>Character Concept</h2>
          <SplitRow>
            <div>
              {parse(slateToHtml(concept, payloadSlateToDomConfig))}
            </div>
            <div>
              <LevelTable>
                <thead>
                <tr>
                  <th>Level</th>
                  <th>Notes</th>
                </tr>
                </thead>
                <tbody>
                  {levelTable.map(levelRow => (
                    <tr key={levelRow.id}>
                      <td>{levelRow.levelTitle}</td>
                      <td>{levelRow.levelNotes}</td>
                    </tr>
                  ))}
                </tbody>
              </LevelTable>
            </div>
          </SplitRow>
          {levelBlocks.map(block => {
            return (<React.Fragment key={block.titile}>
              <h2>{block.title}</h2>
              {parse(slateToHtml(block.text, payloadSlateToDomConfig))}
            </React.Fragment>)
          })}
          <h2>Analysis</h2>
          {parse(slateToHtml(analysis, payloadSlateToDomConfig))}
        </ContentWrapper>
      </BuildPage>
    </div>
  )
}

export async function getStaticProps({ params = {} } = {}) {
  const targetBuild = (await getBuild(params.buildSlug)).docs[0];
  return {
    props: {
      buildSlug: params.buildSlug,
      title: targetBuild.title,
      meta: {
        title: targetBuild.metaTitle,
        description: targetBuild.metaDescription
      },
      concept: targetBuild.characterConcept,
      levelTable: targetBuild.levelTable,
      levelBlocks: targetBuild.levelBlocks,
      analysis: targetBuild.analysis,
      imageUrl: targetBuild.bannerImage.sizes.tablet.url
    }
  }
}

export async function getStaticPaths() {
  const builds = (await getBuilds()).docs;
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