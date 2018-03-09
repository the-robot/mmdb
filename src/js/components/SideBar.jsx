import { Layout, Menu, Icon } from 'antd';
import { NavLink } from 'react-router-dom';
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
          collapsed={ this.state.collapsed }
          onCollapse={ this.onCollapse }>

        <div className="logo" />

        <Menu theme="dark" defaultSelectedKeys={[ '1' ]} mode="inline">
          <Menu.Item key="1">
            <NavLink to='/'>
              <Icon type="home" />
              <span>Home</span>
            </NavLink>
          </Menu.Item>

          <SubMenu
            key="sub1"
            title={<span><Icon type="calendar" /><span>Calendar</span></span>}>
            <Menu.Item key="2"><NavLink to='/calendar/movies'>Movies</NavLink></Menu.Item>
            <Menu.Item key="3"><NavLink to='/calendar/series'>TV Series</NavLink></Menu.Item>
          </SubMenu>

          <Menu.Item key="4">
            <Icon type="heart" />
            <span>Library</span>
          </Menu.Item>

          <Menu.Item key="5">
            <Icon type="question-circle" />
            <span>FAQ</span>
          </Menu.Item>

          <Menu.Item key="6">
            <Icon type="mail" />
            <span>Feedback</span>
          </Menu.Item>

          <Menu.Item key="7">
            <NavLink to='/about' className="nav-text">
              <Icon type="team" />
              <span>About</span>
            </NavLink>
          </Menu.Item>
        </Menu>

      </Sider>
    );
  }
}