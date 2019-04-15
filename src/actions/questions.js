import { saveQuestion, saveQuestionAnswer  } from '../utils/api'
import { showLoading, hideLoading } from 'react-redux-loading'

export const RECEIVE_QUESTIONS = 'RECEIVE_QUESTIONS'
export const ADD_QUESTION = 'ADD_QUESTION'
export const ANSWER_QUESTION = 'ANSWER_QUESTION'
export const DELETE_ANSWER_QUESTION = 'DELETE_ANSWER_QUESTION'

export function receiveQuestions(questions) {
  return {
    type: RECEIVE_QUESTIONS,
    questions
  }
}

function addQuestion(question) {
  return {
    type: ADD_QUESTION,
    question
  }
}

function answerQuestion({ user, qid, answer }) {
  return {
    type: ANSWER_QUESTION,
    user,
    qid,
    answer
  }
}

function deleteAnswerQuestion({ user, qid, answer }) {
  return {
    type: DELETE_ANSWER_QUESTION,
    user,
    qid,
    answer
  }
}

export function handleAddQuestion(optionOneText, optionTwoText) {
  return (dispatch, getState) => {
    const { loginUser } = getState();
    dispatch(showLoading());
    return saveQuestion({
      optionOneText,
      optionTwoText,
      author: loginUser
    })
    .then(question => dispatch(addQuestion(question)))
    .finally(() => dispatch(hideLoading()))
  }
}

export function handleAnswerQuestion(qid, answer) {
  return (dispatch, getState) => {
    const { loginUser } = getState()
    dispatch(showLoading());
    dispatch(answerQuestion({ user: loginUser, qid, answer }));
    return saveQuestionAnswer({
      loginUser,
      qid,
      answer
    })
    .catch(() => dispatch(deleteAnswerQuestion({ user: loginUser, qid, answer })))
    .finally(() => dispatch(hideLoading()))
  }
}
