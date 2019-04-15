import { getInitialData } from '../utils/api'
import { receiveUsers } from '../actions/users'
import { receiveQuestions } from '../actions/questions'
//import { loginUser } from '../actions/loginUser'
import { showLoading, hideLoading } from 'react-redux-loading'

//const AUTHED_ID = 'sarahedo'

export function handleInitialData () {
  return (dispatch) => {
    dispatch(showLoading())
    return getInitialData()
      .then(({ users, questions }) => {
        dispatch(receiveUsers(users))
        dispatch(receiveQuestions(questions))
        //dispatch(loginUser(AUTHED_ID)) //testing, so don't need to log in
        dispatch(hideLoading())
      })
  }
}
