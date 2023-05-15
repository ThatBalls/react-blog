import React from "react";
import { slateToHtml, payloadSlateToDomConfig } from 'slate-serializers'
import parse from 'html-react-parser';
import { InArticleAd } from "components/Ads";
import { BuildPageContainer, BannerWrapper, BannerImage, ContentWrapper, SplitRow, LevelTable } from "./BuildPage.css";

export const BuildPage = ({ build }) => {
  const { title, characterConcept, levelTable, levelBlocks, analysis, bannerImage } = build;
  
  return (<BuildPageContainer>
    <BannerWrapper>
      <BannerImage src={bannerImage.sizes.tablet.url} alt={bannerImage.alt} fill priority/>
      <h1>{ title }</h1>
    </BannerWrapper>
    <ContentWrapper>
      <h2>Character Concept</h2>
      <SplitRow>
        <div>
          {parse(slateToHtml(characterConcept, payloadSlateToDomConfig))}
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
      <InArticleAd />
      {levelBlocks.map(block => {
        return (<React.Fragment key={block.title}>
          <h2>{block.title}</h2>
          {parse(slateToHtml(block.text, payloadSlateToDomConfig))}
        </React.Fragment>)
      })}
      <h2>Analysis</h2>
      {parse(slateToHtml(analysis, payloadSlateToDomConfig))}
    </ContentWrapper>
  </BuildPageContainer>)
};