import React, { useContext, useEffect, useState} from "react";
import { AppContext } from "../context/appContext";
import _ from "lodash";
import RankedImage from "../minor-components/rankedImage";

const Summary = ({
  highlightAnswers,
  highlightClassName = "option",
  title,
  text,
  label,
  imagePlaceholderIconPath,
  videoPlaceholderIconPath,
  audioPlaceholderIconPath,
}) => {
  const { casesCount } = useContext(AppContext);
  const pagesOrder = JSON.parse(localStorage.getItem("CaseOrder"));
  const [getAnswers, setAnswers] = useState({});

  useEffect(() => {
    const caseStudyAnswers = JSON.parse(
      localStorage.getItem("CaseStudyAnswers")
    );
    setAnswers(caseStudyAnswers);
  }, []);
  
  const imageClassName = (caseNumber, option) =>{
    const answer = getAnswers[caseNumber];
    if (answer !== undefined && highlightAnswers === true){
      if (answer[0] === option){
          return "summary-scaled-image-fit-height-summary highlight-image";
      }
    }
    return "summary-scaled-image-fit-height-summary";
  };

  return (
    <div className="summary-wrapper">
      <h3>{title}</h3>
      <div className="summary-and-feedback-text-content">{text}</div>
      <div className="summary-cases-wrapper">
        <p className="summary-case-header">{label}</p>
        <p className="summary-case-header">A</p>
        <p className="summary-case-header">B</p>
      </div>

      {_.range(1, casesCount + 1)
        .map((item) => parseInt(item, 10))
        .map((item) => {
          let casePrefix = pagesOrder[item - 1].split("-")[0].toLowerCase();
          let thumbnailPathSingle = `/gallery/cases/${pagesOrder[item - 1]}/${
            pagesOrder[item - 1]
          }-thumbnail.png`;
          let thumbnailPathA = `/gallery/cases/${pagesOrder[item - 1]}/${
            pagesOrder[item - 1]
          }-a-thumbnail.png`;
          let thumbnailPathB = `/gallery/cases/${pagesOrder[item - 1]}/${
            pagesOrder[item - 1]
          }-b-thumbnail.png`;

          return (
            <div key={item} className="summary-case-answer">
              <div className={highlightClassName}>
                <span className="summary-case-label">{item}</span>
              </div>
              <div className={highlightClassName}>
                <RankedImage
                  path={
                    //todo: add a conditional to check for the existence of the image thumbnail. If not, use the generic icon specified by imagePlaceholderIconPath
                    casePrefix === "video"
                      ? `/gallery/empty-white.png`
                      : casePrefix === "audio"
                      ? `/gallery/empty-white.png`
                      : casePrefix === "hybrid"
                      ? /* videoPlaceholderIconPath */ thumbnailPathSingle
                      : /* ? videoPlaceholderIconPath */
                        `/gallery/cases/${pagesOrder[item - 1]}/${
                          pagesOrder[item - 1]
                        }.png`
                  }
                  alternativeText={`case`}
                  wrapperClassName="summary-ranked-image-wrapper-summary"
                  className="summary-scaled-image-fit-height-summary"
                />
              </div>
              <div className={highlightClassName}>
                <RankedImage
                  path={
                    casePrefix === "video"
                      ? `${videoPlaceholderIconPath}`
                      : casePrefix === "audio"
                      ? `${audioPlaceholderIconPath}`
                      : casePrefix === "hybrid"
                      ? `${`/gallery/cases/${pagesOrder[item - 1]}/${
                          pagesOrder[item - 1]
                        }-a.png`}`
                      : `/gallery/cases/${pagesOrder[item - 1]}/${
                          pagesOrder[item - 1]
                        }-a.png`
                  }
                  alternativeText={`A`}
                  wrapperClassName="summary-ranked-image-wrapper-summary"
                  className={imageClassName(item, "A")}
                  />
              </div>
              <div className={highlightClassName}>
                <RankedImage
                  path={
                    casePrefix === "video"
                      ? `${videoPlaceholderIconPath}`
                      : casePrefix === "audio"
                      ? `${audioPlaceholderIconPath}`
                      : casePrefix === "hybrid"
                      ? `${`/gallery/cases/${pagesOrder[item - 1]}/${
                          pagesOrder[item - 1]
                        }-b.png`}`
                      : `/gallery/cases/${pagesOrder[item - 1]}/${
                          pagesOrder[item - 1]
                        }-b.png`
                  }
                  alternativeText={`B`}
                  wrapperClassName="summary-ranked-image-wrapper-summary"
                  className={imageClassName(item, "B")}
                />
              </div>
            </div>
          );
        })}
    </div>
  );
};

export default Summary;
