import { Layout, Menu, Icon } from 'antd';
import { NavLink } from 'react-router-dom';
import React from 'react';

export default class SideBar extends React.Component {
  state = {
    collapsed: false,
  }

  onCollapse = (collapsed) => {
    this.setState({ collapsed });
  }

  render() {
    const { Sider } = Layout;
    const SubMenu = Menu.SubMenu;

    return (
      <Sider
        breakpoint="xl"
        collapsible
        collapsed={ this.state.collapsed }
        onCollapse={ this.onCollapse }>

        <div className="logo"
             style={{
               backgroundColor: '#041527',
               textAlign: 'center',
               color: '#FFFFFF',
               fontSize: 24,
               fontFamily: 'Do Hyeon' }}>
         MMDB 
        </div>

        <Menu theme="dark" defaultSelectedKeys={[ '1' ]} mode="inline">
          <Menu.Item key="1">
            <NavLink to='/'>
              <Icon type="home" />
              <span>Home</span>
            </NavLink>
          </Menu.Item>

          <SubMenu
            key="sub1"
            title={<span><Icon type="video-camera" /><span>Movies</span></span>}>
            <Menu.Item key="2"><NavLink to='/movies/intheatres'>In Theatre</NavLink></Menu.Item>
            <Menu.Item key="3"><NavLink to='/movies/toprated'>Top Rated</NavLink></Menu.Item>
            <Menu.Item key="4"><NavLink to='/movies/calendar'>Calendar</NavLink></Menu.Item>
          </SubMenu>

          <SubMenu
            key="sub2"
            title={<span><Icon type="switcher" /><span>TV Series</span></span>}>
            <Menu.Item key="5"><NavLink to='/series/airing-today'>Airing Today</NavLink></Menu.Item>
            <Menu.Item key="6"><NavLink to='/series/ontv'>On TV</NavLink></Menu.Item>
            <Menu.Item key="7"><NavLink to='/series/calendar'>Calendar</NavLink></Menu.Item>
          </SubMenu>

          {/*}
          <Menu.Item key="8">
            <Icon type="question-circle" />
            <span>FAQ</span>
          </Menu.Item>

          <Menu.Item key="9">
            <Icon type="mail" />
            <span>Feedback</span>
          </Menu.Item>
          */}

          <Menu.Item key="10">
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