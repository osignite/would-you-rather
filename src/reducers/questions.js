import { RECEIVE_QUESTIONS, ADD_QUESTION, ANSWER_QUESTION, DELETE_ANSWER_QUESTION } from '../actions/questions'

export default function questions (state = {}, action) {
  const { user, qid, answer } = action;
  switch(action.type) {
    case RECEIVE_QUESTIONS :
      return {
        ...state,
        ...action.questions
      }
    case ADD_QUESTION :
      return {
        ...state,
        [action.question.id]: action.question
      }
    case ANSWER_QUESTION :
      return {
        ...state,
        [qid]: {
          ...state[qid],
          [answer]: {
            ...state[qid][answer],
            votes: state[qid][answer].votes.concat([user])
          }
        }
      }
    case DELETE_ANSWER_QUESTION :
      return {
        ...state,
        [qid]: {
          ...state[qid],
          [answer]: {
            ...state[qid][answer],
            votes: state[qid][answer].votes.filter(answerer => answerer !== user)
          }
        }
      }
    default :
      return state
  }
}
