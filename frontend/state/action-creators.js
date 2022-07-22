// ❗ You don't need to add extra action creators to achieve MVP
import axios from "axios";
import {
  MOVE_CLOCKWISE,
  MOVE_COUNTERCLOCKWISE,
  SET_INFO_MESSAGE,
  SET_SELECTED_ANSWER,
  SET_QUIZ_INTO_STATE,
  INPUT_CHANGE,
  RESET_FORM,
} from "./action-types";

export const moveClockwise = (payload) => ({
  type: MOVE_CLOCKWISE,
  payload: payload,
});

export const moveCounterClockwise = (payload) => ({
  type: MOVE_COUNTERCLOCKWISE,
  payload: payload,
});

export const selectAnswer = (payload) => ({
  type: SET_SELECTED_ANSWER,
  payload: payload,
});

export const setMessage = (payload) => ({
  type: SET_INFO_MESSAGE,
  payload: payload,
});

export const setQuiz = (payload) => ({
  type: SET_QUIZ_INTO_STATE,
  payload: payload,
});

export const inputChange = (payload) => ({
  type: INPUT_CHANGE,
  payload: payload,
});

export const resetForm = (payload) => ({
  type: RESET_FORM,
  payload: payload,
});

// ❗ Async action creators
export const fetchQuiz = () => {
  return function (dispatch) {
    dispatch(setQuiz(null));
    axios("http://localhost:9000/api/quiz/next", {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    })
      .then((response) => {
        dispatch(setQuiz(response.data));
      })
      .catch((error) => {
        dispatch(setMessage(error.response.data.message));
      });
    // First, dispatch an action to reset the quiz state (so the "Loading next quiz..." message can display)
    // On successful GET:
    // - Dispatch an action to send the obtained quiz to its state
  };
};
export const postAnswer = ({ quizId, answerId }) => {
  return function (dispatch) {
    axios("http://localhost:9000/api/quiz/answer", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      data: {
        quiz_id: quizId,
        answer_id: answerId,
      },
    })
      .then((response) => {
        dispatch(selectAnswer(null));
        dispatch(setMessage(response.data.message));
        dispatch(fetchQuiz());
      })
      .catch((error) => {
        dispatch(setMessage(error.response.data.message));
      });
    // On successful POST:
    // - Dispatch an action to reset the selected answer state
    // - Dispatch an action to set the server message to state
    // - Dispatch the fetching of the next quiz
  };
};
export const postQuiz = ({ newQuestion, newTrueAnswer, newFalseAnswer }) => {
  return function (dispatch) {
    axios("http://localhost:9000/api/quiz/new", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      data: {
        question_text: newQuestion,
        true_answer_text: newTrueAnswer,
        false_answer_text: newFalseAnswer,
      },
    })
      .then((response) => {
        dispatch(
          setMessage(
            `Congrats: "${response.data.question}" is a great question!`
          )
        );
        dispatch(resetForm());
      })
      .catch((error) => {
        dispatch(setMessage(error.response.data.message));
      });
    // On successful POST:
    // - Dispatch the correct message to the the appropriate state
    // - Dispatch the resetting of the form
  };
};
// ❗ On promise rejections, use log statements or breakpoints, and put an appropriate error message in state
