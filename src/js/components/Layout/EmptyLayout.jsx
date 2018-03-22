import { Layout } from 'antd';
import React from 'react';

import AppFooter from '../Footer';
import Body from '../Body';

const EmptyLayout = props => (
  <Layout style={{ minHeight: '100vh' }}>
    <Layout>
      <Body children={ props.children } />
      <AppFooter />
    </Layout>
  </Layout>
);

export default EmptyLayout;