import { Button, Icon, Input, Layout, Popover, Modal } from 'antd';
import { NavLink } from 'react-router-dom';
import { connect } from 'react-redux';
import React from 'react';

import { login, logout } from '../actions/authentication/authAction';

@connect((store) => {
  return {
    loggedin: store.auth.loggedin,
    auth_token: store.auth.token,
  };
})
export default class AppHeader extends React.Component {
  state = {
    popover_visible: false,
  }

  handleVisibleChange = (visible) => {
    this.setState({ popover_visible: visible });
  }

  login = () => {
    this.props.dispatch(login());
  }

  logout = () => {
    this.props.dispatch(logout());
  }
  
  render() {
    const { Header } = Layout;

    const headerStyle = {
      background: 'transparent',
      padding: 0,
      paddingRight: '20px',
      textAlign: 'right',
    }

    const inputStyle = {
      width: '200px',
      display: 'block',
      marginBottom: '5px',
    }

    console.log("TOKEN", this.props.auth_token);

    return (
      <Header style={ headerStyle }>
        { !this.props.loggedin ?  (
          <Popover
            content={
              <div>
                <Input placeholder='username' style={ inputStyle }
                  prefix={<Icon type="user" style={{ color: 'rgba(0,0,0,.25)' }} />} />
                <Input placeholder='password' style={ inputStyle } type='password'
                  prefix={<Icon type="lock" style={{ color: 'rgba(0,0,0,.25)' }} />} />

                <div style={{ marginTop: '10px' }}>
                  <Button type="primary" style={{ width: '100%', marginBottom: '10px' }}
                    onClick={() => this.login()}>
                    Login
                  </Button>

                  <NavLink to='/register'>
                    <a style={{
                      display: 'block',
                      margin: '5px',
                      fontSize: 13,
                    }}>register</a>
                  </NavLink>

                  <a style={{
                    display: 'block',
                    margin: '5px',
                    fontSize: 13,
                  }}>forgot password</a>
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
      </Header>
    );
  }
}