import React, {useEffect} from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchQuiz, selectAnswer, postAnswer } from "../state/action-creators";

export default function Quiz() {
  const dispatch = useDispatch();
  const quiz = useSelector((state) => state.quiz);
  const selectedAnswer = useSelector((state) => state.selectedAnswer);

  useEffect(()=>{
    dispatch(fetchQuiz())
  },[])
  
  const onSelect = (answerId) => {
    dispatch(selectAnswer(answerId));
  };

  const onSubmit = (quizId) => {
    dispatch(postAnswer({ quizId, answerId: selectedAnswer }));
  };

  return (
    <div id="wrapper">
      {
        // quiz already in state? Let's use that, otherwise render "Loading next quiz..."
        quiz ? (
          <>
            <h2>{quiz.question}</h2>

            <div id="quizAnswers">
              {quiz.answers.map((answer) => {
                <div
                  className={`answer ${
                    answer.answer_id === selectedAnswer ? "selected" : ""
                  }`}
                >
                  {answer.text}
                  <button onClick={() => onSelect(answer.answer_id)}>
                    {answer.answer_id === selectedAnswer
                      ? "SELECTED"
                      : "Select"}
                  </button>
                </div>;
              })}
            </div>

            <button id="submitAnswerBtn" onClick={() => onSubmit(quiz.quiz_id)}>
              Submit answer
            </button>
          </>
        ) : (
          "Loading next quiz..."
        )
      }
    </div>
  );
}
