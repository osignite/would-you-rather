import React, { Component } from 'react'
import { Redirect } from 'react-router-dom'
import { connect } from 'react-redux'

import { loginUser } from '../actions/loginUser'

class Login extends Component {
	state = {
		username: '',
		loginFail: false,
		quickUsers: [
		  { value: '', name: 'Select User' },
			{ value: 'sarahedo', name: 'Sarah Edo' },
		  { value: 'tylermcginnis', name: 'Tyler McGinnis' },
			{ value: 'johndoe', name: 'John Doe' }
		]
	}
	//usernameTyped = (e) => {
		//const username = e.target.value;
		//this.setState(() => ({
			//username
		//}))
	//}
	handleLogin = (e) => {
		e.preventDefault()
		const { username } =  this.state;
		const { dispatch, usernames } = this.props;

		if (usernames.indexOf(username)  > -1) {
			dispatch(loginUser(username));
			this.setState({
				username: '',
				loginFail: false,
			})
		} else {
			this.setState({
				username: '',
				loginFail: true,
			})
		}
	}
	usernameSelected = (e) => {
		const username = e.target.value;
		this.setState(() => ({
			username
		}))
	}
	render() {
		const { username } = this.state
		if (this.props.loginUser){
			return <Redirect to={this.props.location.state.returnPath} />
		}
		return (
			<div className='login'>
				<form className='login-form' onSubmit={this.handleLogin}>
					<select
					name="username"
					value={username}
					onChange={this.usernameSelected}
					className='inputbox'
					>
					{this.state.quickUsers.map((e, key) => {
						return <option key={key} value={e.value}>{e.name}</option>;
					})}
					</select>
					<div className='btn-login-group'>
						<button className='btn' type='submit'>Log In</button>
					</div>
					{this.state.loginFail && (
						<p className='login-error'>Please choose one of the accepted log-in names.</p>
					)}
				</form>
			</div>
		)
	}
}

// Map the usernames to the Component props
function mapStateToProps({ users, loginUser }) {
	return {
		usernames: Object.keys(users),
		loginUser
	}
}

export default connect(mapStateToProps)(Login)
