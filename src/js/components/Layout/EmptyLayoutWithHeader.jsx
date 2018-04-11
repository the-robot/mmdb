import { Layout } from 'antd';
import React from 'react';

import AppHeader from '../Header';
import AppFooter from '../Footer';
import Body from '../Body';

const EmptyLayoutWithHeader = props => (
  <Layout style={{ minHeight: '100vh' }}>
    <Layout>
      <AppHeader/>
      <Body children={ props.children } />
      <AppFooter />
    </Layout>
  </Layout>
);

export default EmptyLayoutWithHeader;