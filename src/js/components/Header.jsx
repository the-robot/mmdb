import { Layout } from 'antd';
import React from 'react';

export default class AppHeader extends React.Component {
  render() {
    const { Header } = Layout;

    return (
      <Header style={{ background: '#fff', padding: 0 }} />
    );
  }
}