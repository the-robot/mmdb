import { Col, Dropdown, Menu, Icon } from 'antd';
import { connect } from 'react-redux';
import React from 'react';

@connect((store) => {
  return {
    token: store.auth.token,
    loggedin: store.auth.loggedin,
  };
})
export default class MovieTracker extends React.Component {
  render() {
    // Dropdown menu to add movie to plan and etc.
    const trackerMenu = (
      <Menu>
        <Menu.Item key="0">Watching</Menu.Item>
        <Menu.Item key="1">Planning</Menu.Item>
        <Menu.Item key="2">Completed</Menu.Item>
        <Menu.Item key="3">Dropped</Menu.Item>
        <Menu.Item key="4" style={{ color: 'red' }}>Remove from Library</Menu.Item>
      </Menu>
    );


    // return null if not loggedin
    if ( !this.props.loggedin )
      return ( null );

    return (
      <Col span={5} offset={2}>
        <Dropdown overlay={trackerMenu} trigger={['click']}>
          <a className="ant-dropdown-link" href="#">
            Tracker <Icon type="down" />
          </a>
        </Dropdown>
      </Col>
    );
  }
}