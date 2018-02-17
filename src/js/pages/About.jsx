import { Button } from 'antd';
import { connect } from 'react-redux';
import React from 'react';

import { loginUser } from '../actions/userAction';

@connect((store) => {
  return {
    user: store.user.user,
  };
})
export default class About extends React.Component {
  loginUser() {
    this.props.dispatch(loginUser());
  }

  render() {
    const { user } = this.props;

    return (
      <div>
        <h1>About</h1>
        <Button type="primary" onClick={ this.loginUser.bind(this) }>Login</Button>
        <h4>Name: { user.name }</h4>
        <h4>Username: { user.username }</h4>
        <h4>User type: { user.usertype }</h4>
      </div>
    );
  }
}
