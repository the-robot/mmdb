import { Layout } from 'antd';
import React from 'react';

import AppHeader from './Header';
import AppFooter from './Footer';
import Body from './Body';
import SideBar from './SideBar';

const MainLayout = props => (
      <Layout style={{ minHeight: '100vh' }}>
        <SideBar />
        <Layout>
          <AppHeader />
          <Body children={ props.children } />
          <AppFooter />
        </Layout>
      </Layout>
    );

export default MainLayout;