import { Layout, Menu, Icon } from 'antd';
import { Link } from 'react-router-dom';
import React from 'react';

export default class SideBar extends React.Component {
  state = {
    collapsed: false,
  }

  onCollapse = (collapsed) => {
    console.log(collapsed);
    this.setState({ collapsed });
  }

  render() {
    const { Sider } = Layout;
    const SubMenu = Menu.SubMenu;

    return (
      <Sider
          collapsible
          collapsed={this.state.collapsed}
          onCollapse={this.onCollapse}>

        <div className="logo" />

        <Menu theme="dark" defaultSelectedKeys={['1']} mode="inline">
          <Menu.Item key="1">
            <Link to='/'>
              <Icon type="home" />
              <span>Home</span>
            </Link>
          </Menu.Item>

          <Menu.Item key="2">
            <Icon type="upload" />
            <span>Upload</span>
          </Menu.Item>

          <SubMenu
            key="sub2"
            title={<span><Icon type="question-circle" /><span>FAQ</span></span>}>
            <Menu.Item key="6">Menu 1</Menu.Item>
            <Menu.Item key="8">Menu 2</Menu.Item>
          </SubMenu>

          <Menu.Item key="3">
            <Icon type="mail" />
            <span>Feedback</span>
          </Menu.Item>

          <Menu.Item key="4">
            <Link to='/about' className="nav-text">
              <Icon type="team" />
              <span>About</span>
            </Link>
          </Menu.Item>
        </Menu>

      </Sider>
    );
  }
}