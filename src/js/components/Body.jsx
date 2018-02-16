import { Layout, Breadcrumb } from 'antd';
import React from 'react';

import { loginUser } from '../actions/userAction';

export default class Body extends React.Component {
  render() {
    const { Content } = Layout;

    return (
      <Content style={{ margin: '0 16px' }}>
        <Breadcrumb style={{ margin: '16px 0' }}>
          <Breadcrumb.Item></Breadcrumb.Item>
        </Breadcrumb>
        <div style={{ padding: 24, background: '#fff', minHeight: 360 }}>
          <main>{ this.props.children }</main>
        </div>
      </Content>
    );
  }
}