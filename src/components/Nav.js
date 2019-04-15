import React, { Component } from 'react'
import { connect } from 'react-redux'
import { NavLink } from 'react-router-dom'
import { MdInput} from 'react-icons/md/index'

import { logoutUser } from '../actions/loginUser'

class Nav extends Component {

  logoutUser = () => {
    const { dispatch } = this.props;
    dispatch(logoutUser());
  }

  render () {
    return (
      <nav className='nav'>
        <div className='user-details'>
          <img
          src={this.props.avatarURL}
          className='nav-user-avatar'
          alt={this.props.name}
          />
          <span className='name'>Hi, {this.props.name}</span>
          <span className='logout' onClick={this.logoutUser}><MdInput size={30}/></span>
        </div>
        <ul>
          <li>
            <NavLink to='/' exact activeClassName='active'>
              All Questions
            </NavLink>
          </li>
          <li>
            <NavLink to='/leaderboard' exact activeClassName='active'>
              Leaderboard
            </NavLink>
          </li>
          <li>
            <NavLink to='/add' exact activeClassName='active'>
              Ask New Question
            </NavLink>
          </li>
        </ul>
      </nav>
    )
  }
}

function mapStateToProps({ users, loginUser }) {
  return {
    avatarURL: users[loginUser].avatarURL,
    name: users[loginUser].name
  }
}

export default connect(mapStateToProps)(Nav);
