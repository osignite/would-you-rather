import React, { Component } from 'react'
import { connect } from 'react-redux'
import { Redirect } from 'react-router-dom'

import Question from './Question'

class QuestionList extends Component {
	state = {
		answered: false
	}
	toggleAnswered = (e, answered) => {
		e.preventDefault()
		this.setState(() => ({
			answered
		}))
	}
	render() {
		if (!this.props.loginUser){
			return <Redirect to={{
				pathname: '/login',
				state: {
					returnPath: '/'
				}
			}} />
		}
		return (
			<div className ='questionsList'>
				<div className='btn-list-group'>
					<button className='btn' onClick={(e) => this.toggleAnswered(e, false)}>Unanswered</button>
					<button className='btn' onClick={(e) => this.toggleAnswered(e, true)}>Answered</button>
				</div>
				{this.state.answered === true
					? <h3>Answered</h3>
					: <h3>Not Answered Yet</h3>
				}
				<ul>
				{this.state.answered
					? this.props.answeredQuestionIds.map((id) => (
						<li key={id}><Question id={id}/></li>
					))
					: this.props.unansweredQuestionIds.map((id) => (
						<li key={id}><Question id={id}/></li>
					))
				}
				</ul>
			</div>
		)
	}
}

function mapStateToProps({ questions, loginUser }) {
	return {
		answeredQuestionIds: Object.keys(questions)
			.filter((question) => (questions[question].optionOne.votes.indexOf(loginUser) > -1) || (questions[question].optionTwo.votes.indexOf(loginUser) > -1))
			.sort((a,b) => questions[b].timestamp - questions[a].timestamp),
		unansweredQuestionIds: Object.keys(questions)
			.filter((question) => (questions[question].optionOne.votes.indexOf(loginUser) === -1) && (questions[question].optionTwo.votes.indexOf(loginUser) === -1))
			.sort((a,b) => questions[b].timestamp - questions[a].timestamp),
		loginUser
	}
}

export default connect(mapStateToProps)(QuestionList);
