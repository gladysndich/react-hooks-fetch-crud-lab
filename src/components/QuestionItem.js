import React from "react";

function QuestionItem({ question, deleteQuestion, handleAnswerChange }) {
  const { id, prompt, answers, correctIndex } = question;

  const options = answers.map((answer, index) => (
    <option key={index} value={index}>
      {answer}
    </option>
  ));

  function deleteQuiz() {
    deleteQuestion(id);
  }

  function changeAnswer(event) {
    handleAnswerChange(id, parseInt(event.target.value));
  }

  return (
    <li>
      <h4>Question {id}</h4>
      <h5>Prompt: {prompt}</h5>
      <label>
        Correct Answer:
        <select defaultValue={correctIndex} onChange={changeAnswer}>{options}</select>
      </label>
      <button onClick={deleteQuiz}>Delete Question</button>
    </li>
  );
}

export default QuestionItem;
