import React, { Component } from 'react'
import { connect } from 'react-redux'
import { Redirect } from 'react-router-dom'

import { handleAddQuestion } from '../actions/questions'

class NewQuestion extends Component {
	state = {
		'optionOne': '',
		'optionTwo': '',
		'toHome': false
	}
	handleOptionOneChange = (e) => {
		const optionOne = e.target.value
		this.setState(()=>({
			optionOne
		}))
	}
	handleOptionTwoChange = (e) => {
		const optionTwo = e.target.value
		this.setState(()=>({
			optionTwo
		}))
	}
	handleAddQuestion = (e, optionOne, optionTwo) => {
		e.preventDefault()
		const { dispatch, loginUser } = this.props
		dispatch(handleAddQuestion(optionOne, optionTwo, loginUser))
		.then(() =>
			this.setState({
				'optionOne': '',
				'optionTwo': '',
				'toHome': true
			})
		)
	}

	render() {
		const { optionOne, optionTwo } = this.state;
		if (!this.props.loginUser ){
			return <Redirect to={{
				pathname: '/login',
				state: {
					returnPath: '/add'
				}
			}} />
		}
		if (this.state.toHome){
			return <Redirect to='/' />
		}
		return (
			<div className='add-question'>
				<h3 className='center'>Add a Question</h3>
				<form className='add-question-form' onSubmit={(e) => this.handleAddQuestion(e, optionOne, optionTwo)}>
					<input
						id='questionOne'
						className='inputbox'
						type='text'
						placeholder='Enter Question Option One'
						value={optionOne}
						onChange={this.handleOptionOneChange}
					/>
					<input
						id='questionTwo'
						className='inputbox'
						type='text'
						placeholder='Enter Question Option Two'
						value={optionTwo}
						onChange={this.handleOptionTwoChange}
					/>
					{(optionOne && optionTwo)
						? <button className='btn' type='submit'>Ask Question</button>
						: <button className='btn' type='button' disabled>Ask Question</button>
					}
				</form>
			</div>
		)
	}
}

function mapStateToProps({ loginUser }) {
	return {
		loginUser
	}
}

export default connect(mapStateToProps)(NewQuestion)
