import { Button, Icon, Input, Layout, Popover, Modal, message } from 'antd';
import React from 'react';

export default class AppHeader extends React.Component {
  state = {
    popoverVisible: false,
  }

  handleVisibleChange = (visible) => {
    this.setState({ popoverVisible: visible });
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
      width: '180px',
      display: 'block',
      marginBottom: '5px',
    }

    const popOverButton = {
      display: 'block',
      margin: '5px',
    }

    return (
      <Header style={ headerStyle } >
        <Popover
          content={
            <div>
              <Input placeholder='username' style={ inputStyle }
                prefix={<Icon type="user" style={{ color: 'rgba(0,0,0,.25)' }} />} />
              <Input placeholder='password' style={ inputStyle } type='password'
                prefix={<Icon type="lock" style={{ color: 'rgba(0,0,0,.25)' }} />} />

              <div style={{ marginTop: '15px' }}>
                <a onClick={ this.successLogin } style={ popOverButton }>Login</a>
                <a onClick={ this.successLogin } style={ popOverButton }>Register</a>
              </div>
            </div>
          }

          title='Login User'
          trigger='click'
          visible={ this.state.popoverVisible }
          onVisibleChange={ this.handleVisibleChange }
          placement="topRight"
        >
          <Button type="primary" icon="login">LOGIN</Button>
        </Popover>
      </Header>
    );
  }
}