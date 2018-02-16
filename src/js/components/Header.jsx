import { Button, Input, Layout, Popover } from 'antd';
import React from 'react';

export default class AppHeader extends React.Component {
  state = {
    visible: false,
  }

  hide = () => {
    this.setState({
      visible: false,
    });
  }

  handleVisibleChange = (visible) => {
    this.setState({ visible });
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
              <Input placeholder='username' style={ inputStyle } />
              <Input placeholder='password' style={ inputStyle } type='password' />

              <div style={{ marginTop: '15px' }}>
                <a onClick={this.hide} style={ popOverButton }>Login</a>
                <a onClick={this.hide} style={ popOverButton }>Register</a>
              </div>
            </div>
          }

          title='Login User'
          trigger='click'
          visible={ this.state.visible }
          onVisibleChange={ this.handleVisibleChange }
        >
          <Button type="primary" icon="login">LOGIN</Button>
        </Popover>
      </Header>
    );
  }
}