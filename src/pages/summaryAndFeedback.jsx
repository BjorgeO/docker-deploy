import React from "react";
import Summary from "../major-components/summary";
import FeedbackForm from "../major-components/feedbackForm";
import { generateFeedbackFormValidationScheme } from "../utils/inputValidation";
import "../assets/css/summaryAndFeedback.css";


const SummaryAndFeedback = ({ REACT_APP_summaryAndFeedback }) => {
  generateFeedbackFormValidationScheme(
    REACT_APP_summaryAndFeedback["feedbackForm"].feedbackFormQuestions
  );
  if (REACT_APP_summaryAndFeedback["summary"].display === false){
    return(
        <FeedbackForm
        title={REACT_APP_summaryAndFeedback["feedbackForm"].title}
        text={REACT_APP_summaryAndFeedback["feedbackForm"].text}
        feedbackFormQuestions={
          REACT_APP_summaryAndFeedback["feedbackForm"].feedbackFormQuestions
        }
        />
    );
  }
  else{
    return (
    <div className="summary-and-feedback-wrapper">
      <Summary
        highlightAnswers={REACT_APP_summaryAndFeedback["summary"].highlightAnswers}
        title={REACT_APP_summaryAndFeedback["summary"].title}
        text={REACT_APP_summaryAndFeedback["summary"].text}
        label={REACT_APP_summaryAndFeedback["summary"].label}
        highlightClassName={
          REACT_APP_summaryAndFeedback["summary"].highlightClassName
        }
        imagePlaceholderIconPath={
          REACT_APP_summaryAndFeedback["summary"].imagePlaceholderIconPath
        }
        videoPlaceholderIconPath={
          REACT_APP_summaryAndFeedback["summary"].videoPlaceholderIconPath
        }
        audioPlaceholderIconPath={
          REACT_APP_summaryAndFeedback["summary"].audioPlaceholderIconPath
        }
      />
      <FeedbackForm
        title={REACT_APP_summaryAndFeedback["feedbackForm"].title}
        text={REACT_APP_summaryAndFeedback["feedbackForm"].text}
        feedbackFormQuestions={
          REACT_APP_summaryAndFeedback["feedbackForm"].feedbackFormQuestions
        }
      />
    </div>
    );
  };
};

export default SummaryAndFeedback;
