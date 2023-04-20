/* TODO: MAKE INTO A GENERIC FUNCTION WHICH CAN BE USED BY ANY COMPONENT */
const handleRadioChange = (e, field1, field2) => {
  const FeedbackFormAnswers = JSON.parse(
    localStorage.getItem("FeedbackFormAnswers")
  );
  if (FeedbackFormAnswers) {
    const answers = { ...FeedbackFormAnswers };
    //answers[field] = e.currentTarget.innerText;
    answers[field1] = e.target.id;
    answers[field2] = e.currentTarget.innerText;
    localStorage.setItem("FeedbackFormAnswers", JSON.stringify(answers));
  } else {
    const FeedbackFormAnswers = {
      /*  [field]: e.currentTarget.value */
      [field1]: e.target.id,
      [field2]: e.currentTarget.innerText,
    };
    localStorage.setItem(
      "FeedbackFormAnswers",
      JSON.stringify(FeedbackFormAnswers)
    );
  }
};
export { handleRadioChange };
