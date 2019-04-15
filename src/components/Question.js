import React, { Component } from 'react'
import { connect } from 'react-redux'
import { Link } from 'react-router-dom'

class Question extends Component {
	render() {
		const { question, id, loginUser } = this.props;
		return (
			<div className='question'>
				<div className='options'>
					<div className='option'>
						<p>{question.optionOne.text}</p>
					</div>
					<div className='option'>
						<p>{question.optionTwo.text}</p>
					</div>
				</div>
				<div className='detailsButton'>
					<Link to={`/questions/${id}`}>
					{question.optionOne.votes.indexOf(loginUser) > -1 || question.optionTwo.votes.indexOf(loginUser) > -1
						? (
							<span>View Results</span>
						) : (
							<span>Answer Now</span>
						)
					}
					</Link>
				</div>
			</div>
		)
	}
}

function mapStateToProps({ questions, loginUser }, { id }) {
	return {
		question: questions[id],
		loginUser
	}
}

export default connect(mapStateToProps)(Question);
