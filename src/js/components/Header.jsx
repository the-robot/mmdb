import { Button, Icon, Input, Layout, Popover, Modal, message } from 'antd';
import { NavLink } from 'react-router-dom';
import { connect } from 'react-redux';
import React from 'react';

import { login, logout, refresh_token } from '../actions/authentication/authAction';

@connect((store) => {
  return {
    auth_refresh: store.auth.refresh,
    loggedin: store.auth.loggedin,
  };
})
export default class AppHeader extends React.Component {
  state = {
    popover_visible: false,
    username: '',
    password: '',
  }

  handleVisibleChange = (visible) => {
    this.setState({ popover_visible: visible });
  }

  login = () => {
    let username = this.state.username;
    let password = this.state.password;

    if (username.replace(/ /g,'').length === 0) {
      message.error("Username cannot be empty");
      return;
    }
    else if (password.replace(/ /g,'').length === 0) {
      message.error("Password cannot be empty")
      return;
    }

    this.props.dispatch(login(this.state.username, this.state.password));

    // hide popover then
    // reset saved credentials in state
    this.setState({
      popover_visible: false,
      username: '',
      password: '',
    });
  }

  logout = () => {
    this.props.dispatch(logout());
  }

  render() {
    const loginInputBoxStyle = {
      width: '200px',
      display: 'block',
      marginBottom: '5px',
    }

    // FOR TESTING / DEVELOPMENT
    if ( this.props.loggedin ) {
      //this.props.dispatch(refresh_token(this.props.auth_refresh.token));
    }

    return (
      <Layout.Header style={{
        background: 'transparent',
        padding: 0,
        paddingRight: '20px',
        textAlign: 'right',
      }}>
        { !this.props.loggedin ?  (
          <Popover
            content={
              <div>
                <Input placeholder='username' style={ loginInputBoxStyle }
                  prefix={<Icon type="user" style={{ color: 'rgba(0,0,0,.25)' }} />}
                  onChange={(evt) => {
                    this.setState({ username: evt.target.value, });
                  }}/>

                <Input placeholder='password' style={ loginInputBoxStyle } type='password'
                  prefix={<Icon type="lock" style={{ color: 'rgba(0,0,0,.25)' }} />}
                  onChange={(evt) => {
                    this.setState({ password: evt.target.value, });
                  }}/>

                <div style={{ marginTop: '10px' }}>
                  <Button type="primary" style={{ width: '100%', marginBottom: '10px' }}
                    onClick={() => this.login()}>
                    Login
                  </Button>

                  <NavLink to='/register'>
                    <p style={{
                      display: 'block',
                      margin: '5px',
                      fontSize: 13,
                    }}>register</p>
                  </NavLink>

                  <p style={{
                    display: 'block',
                    margin: '5px',
                    fontSize: 13,
                  }}>forgot password</p>
                </div>
              </div>
            }

            title='Login User'
            trigger='click'
            visible={ this.state.popover_visible }
            onVisibleChange={ this.handleVisibleChange }
            placement="topRight"
          >
            <Button type="primary" icon="login">LOGIN</Button>
          </Popover>
        ) : (
          <Button type="primary" icon="logout" type="danger" onClick={() => this.logout()}>LOGOUT</Button>
        )}
      </Layout.Header>
    );
  }
}