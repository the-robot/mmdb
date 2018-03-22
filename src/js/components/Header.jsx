import { Button, Icon, Input, Layout, Popover, Modal, message } from 'antd';
import { NavLink } from 'react-router-dom';
import React from 'react';

export default class AppHeader extends React.Component {
  state = {
    popover_visible: false,
  }

  handleVisibleChange = (visible) => {
    this.setState({ popover_visible: visible });
  }

  successLogin = () => {
    message.success('This is a message of success');
  };
  
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

    return (
      <Header style={ headerStyle }>
        <Popover
          content={
            <div>
              <Input placeholder='username' style={ inputStyle }
                prefix={<Icon type="user" style={{ color: 'rgba(0,0,0,.25)' }} />} />
              <Input placeholder='password' style={ inputStyle } type='password'
                prefix={<Icon type="lock" style={{ color: 'rgba(0,0,0,.25)' }} />} />

              <div style={{ marginTop: '10px' }}>
                <Button type="primary" style={{ width: '100%', marginBottom: '10px' }}
                  onClick={() => this.successLogin()}>
                  Log in
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
      </Header>
    );
  }
}