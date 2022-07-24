import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { inputChange, postQuiz } from "../state/action-creators";

export default function Form() {
  const dispatch = useDispatch();
  const form = useSelector((state) => state.form);

  const validate = () => {
    const error = {};
    if (!form.newQuestion.trim()) {
      error.newQuestion = true;
    }
    if (!form.newTrueAnswer.trim()) {
      error.newTrueAnswer = true;
    }
    if (!form.newFalseAnswer.trim()) {
      error.newFalseAnswer = true;
    }

    return Object.keys(error).length !== 0;
  };

  const onChange = (evt) => {
    dispatch(inputChange({ [evt.target.id]: evt.target.value }));
  };

  const onSubmit = (evt) => {
    evt.preventDefault();
    dispatch(postQuiz(form));
  };

  return (
    <form id="form" onSubmit={onSubmit}>
      <h2>Create New Quiz</h2>
      <input
        maxLength={50}
        onChange={onChange}
        id="newQuestion"
        placeholder="Enter question"
        value={form.newQuestion}
      />
      <input
        maxLength={50}
        onChange={onChange}
        id="newTrueAnswer"
        placeholder="Enter true answer"
        value={form.newTrueAnswer}
      />
      <input
        maxLength={50}
        onChange={onChange}
        id="newFalseAnswer"
        placeholder="Enter false answer"
        value={form.newFalseAnswer}
      />
      <button id="submitNewQuizBtn" disabled={validate()} onClick={onSubmit}>
        Submit new quiz
      </button>
    </form>
  );
}
