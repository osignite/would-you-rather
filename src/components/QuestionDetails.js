import React, { Component } from 'react'
import { connect } from 'react-redux'
import { Redirect } from 'react-router-dom'

import { handleAnswerQuestion } from '../actions/questions'

class QuestionDetails extends Component {
	handleVote = (e, qid, answer) => {
		e.preventDefault()
		const { dispatch } = this.props
		dispatch(handleAnswerQuestion(qid, answer))
	}
	render() {
		const {id, authorImg, question, optionOneSelected, optionOneVotePercentage, optionTwoSelected, optionTwoVotePercentage, loginUser } = this.props;
		if (!loginUser){
			return <Redirect to={{
				pathname: '/login',
				state: {
					returnPath: '/questions/' + id
				}
			}} />
		}
		if (!question) {
			return (
				<div className='error-404'>
					<h1>404</h1>
					<p>Sorry, that question doesn't exist.</p>
				</div>
			)
		}
		return (
			<div className='question-details'>
				<div className='author-details'>
					<img src={authorImg} alt='Author Avatar'className='user-avatar'/>
					<span>Asked by {question.author}</span>
				</div>
				<h3>Would You Rather...?</h3>
				{(optionOneSelected !== true && optionTwoSelected !== true) &&
					<div className='options-details'>
						<div className='option'>
							<p>{question.optionOne.text}</p>
							<button className='btn' onClick={(e) => this.handleVote(e, id, 'optionOne')}>Select Answer</button>
						</div>
						<div className='option'>
							<p>{question.optionTwo.text}</p>
							<button className='btn' onClick={(e) => this.handleVote(e, id, 'optionTwo')}>Select Answer</button>
						</div>
					</div>
				}
				{(optionOneSelected === true || optionTwoSelected === true) &&
					<div className='options-details'>
						<div className='option'>
							<p>{question.optionOne.text}</p>
							<p>Votes: {question.optionOne.votes.length}</p>
							<p>Percentage: {optionOneVotePercentage}%</p>
							{optionOneSelected && (
								<p className='selected'>You selected this option.</p>
							)}
						</div>
						<div className='option'>
							<p>{question.optionTwo.text}</p>
							<p>Votes: {question.optionTwo.votes.length}</p>
							<p>Percentage: {optionTwoVotePercentage}%</p>
							{optionTwoSelected && (
								<p className='selected'>You selected this option.</p>
							)}
						</div>
					</div>
				}
			</div>
		)
	}
}

function mapStateToProps({ questions, users, loginUser }, props) {

	const { id } = props.match.params

	return {
		id,
		authorImg: questions[id] ? users[questions[id].author].avatarURL : null,
		question: questions[id] ? questions[id] : null,
		optionOneSelected: questions[id] ? questions[id].optionOne.votes.indexOf(loginUser) > -1 : null,
		optionOneVotePercentage: questions[id] ? (questions[id].optionOne.votes.length / (questions[id].optionOne.votes.length + questions[id].optionTwo.votes.length)) * 100 : null,
		optionTwoSelected: questions[id] ? questions[id].optionTwo.votes.indexOf(loginUser) > -1 : null,
		optionTwoVotePercentage: questions[id] ? (questions[id].optionTwo.votes.length / (questions[id].optionOne.votes.length + questions[id].optionTwo.votes.length)) * 100 : null,
		loginUser
	}

}

export default connect(mapStateToProps)(QuestionDetails)
