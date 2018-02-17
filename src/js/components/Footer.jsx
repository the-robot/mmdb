import { Layout } from 'antd';
import React from 'react';

export default class AppFooter extends React.Component {
  render() {
    const { Footer } = Layout;

    return (
      <Footer style={{ textAlign: 'center' }}>
        My Movie Database © 2018
      </Footer>
    );
  }
}