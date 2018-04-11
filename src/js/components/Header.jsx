import { Avatar, Button, Icon, Input, Modal, Layout, List, Popover, message } from 'antd';
import { NavLink } from 'react-router-dom';
import { connect } from 'react-redux';
import React from 'react';

import { login, logout,
         refresh_token, isTokenExpired } from '../actions/authentication/authAction';
import { get_user_information } from '../actions/authentication/userAction';

@connect((store) => {
  return {
    token: store.auth.token,
    expire: store.auth.expire,
    loggedin: store.auth.loggedin,

    // user basic information
    user_fetched: store.auth.user_fetched,
    username: store.auth.username,
    name: store.auth.name,
    avatar: store.auth.avatar,
  };
})
export default class AppHeader extends React.Component {
  state = {
    login_popover_visible: false,
    user_popover_visible: false,
    username: '',
    password: '',
  }

  handleLoginVisibleChange = (visible) => {
    this.setState({ login_popover_visible: visible });
  }

  handleUserVisibleChange = (visible) => {
    this.setState({ user_popover_visible: visible });
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
      login_popover_visible: false,
      password: '',
    });
  }

  logout = () => {
    this.props.dispatch(logout( this.props.token ));

    // hide user popover
    this.setState({
      user_popover_visible: false,
    });
  }

  render() {
    const loginInputBoxStyle = {
      width: '200px',
      display: 'block',
      marginBottom: '5px',
    }

    var user_popover_menu = [
      {
        icon: 'user',
        menu: 'Profile',
        link: '#/profile/' + this.props.username,
      },

      {
        icon: 'question-circle',
        menu: 'FAQ',
        link: '#',
      },

      {
        icon: 'smile',
        menu: 'Feedback',
        link: '#',
      },

      {
        icon: 'setting',
        menu: 'Settings',
        link: '#/settings/',
      }
    ]

    // if logged in and check if auth token expired
    if ( this.props.loggedin ) {
      // if token is about to expire, refresh
      if ( isTokenExpired(this.props.expire) )
        this.props.dispatch(refresh_token(this.props.token));

      // if user information is not fetched yet, get it
      if ( !this.props.user_fetched )
        this.props.dispatch(get_user_information(this.state.username));
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

                  {/*
                  <p style={{
                    display: 'block',
                    margin: '5px',
                    fontSize: 13,
                  }}>forgot password</p>
                  */}
                </div>
              </div>
            }

            title='Login User'
            trigger='click'
            visible={ this.state.login_popover_visible }
            onVisibleChange={ this.handleLoginVisibleChange }
            placement="topRight"
          >
            <Avatar size="large" icon="user" style={{ backgroundColor: '#3E91F7' }}/>
          </Popover>
        ) : (
          <Popover
            content={
              <div style={{ minWidth: 180, maxWidth: 250, overflow: 'hidden' }} >
                <div style={{ textAlign: 'center' }}>
                  <h6 style={{ marginBottom: 0, color: '#3E91F7' }}> { this.props.username } </h6>
                  <p style={{ fontSize: 10, marginTop: 0 }}> @{ this.props.username } </p>
                </div>

                <List
                  itemLayout="horizontal"
                  dataSource={ user_popover_menu }

                  renderItem={item => (
                    <List.Item style={{ border: 0, padding: 10 }}>
                    <a href={ item.link } style={{ color: '#595959' }}>
                      <Icon type={ item.icon }
                        style={{ paddingRight: 16, fontSize: 18, color: '#888888' }}
                      />
                      { item.menu }
                    </a>
                    </List.Item>
                  )}
                />

                <Button type="primary" icon="logout" type="danger"
                  onClick={() => this.logout()}
                  style={{ width: '100%', borderColor: 'white', marginTop: 20 }}>
                  LOGOUT
                </Button> 
              </div>
            }

            trigger='click'
            visible={ this.state.user_popover_visible }
            onVisibleChange={ this.handleUserVisibleChange }
            placement="topRight"
          >

          {/* if there is an anvtar, show that else show the first char of name as icon */} 
          { this.props.avatar ? <Avatar src={ this.props.avatar } size="large" /> :
            <Avatar style={{ backgroundColor: '#3E91F7', verticalAlign: 'middle' }} size="large">
              { this.props.name != undefined ? this.props.name.charAt(0) : '' }
            </Avatar>
          }
          </Popover>
        )}
      </Layout.Header>
    );
  }
}