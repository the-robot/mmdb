import { Divider, Row, Col, Tabs } from 'antd';
import { connect } from 'react-redux';
import React from 'react';
import withSizes from 'react-sizes';

import AccountDelete from '../components/Settings/AccountDelete';
import General from '../components/Settings/General';
import LibraryReset from '../components/Settings/LibraryReset';
import PasswordUpdate from '../components/Settings/PasswordUpdate';

@withSizes(({ width }) => ({
  isLargeTablet: width < 992
}))
@connect((store) => {
  return {
    loggedin: store.auth.loggedin,
  };
})
export default class Settings extends React.Component {
  componentDidMount() {
    document.title = "MMDB - Settings";
  }

  render() {
    const tabPosition = (this.props.isLargeTablet ? 'top' : 'left');

    if (!this.props.loggedin)
      return (
        <div style={{ textAlign: 'center' }}>
          <h6> You need to login to view this page </h6>
          <a href="/"> Back to Home </a>
        </div>
      );

    return (
      <div>
        <Row type="flex" justify="center" style={{ paddingTop: 25 }}>
          <Col
            xs={{ span: 24, offset: 0 }}
            sm={{ span: 24, offset: 0 }}
            md={{ span: 24, offset: 0 }}
            lg={{ span: 22, offset: 0 }}
            xl={{ span: 20, offset: 0 }}
          >
            <Tabs tabPosition={ tabPosition } size="small" defaultActiveKey="1">
              <Tabs.TabPane tab="General" key="1">
                <h5> General Account Settings </h5>
                <Divider/>
                <General/>                
              </Tabs.TabPane>

              <Tabs.TabPane tab="Security" key="2">
                <h5>Account Security</h5>
                <Divider/>

                <PasswordUpdate/>
                <Divider/>

                <AccountDelete/>
              </Tabs.TabPane>

              <Tabs.TabPane tab="Library" key="3">
                <h5> Library Management </h5>
                <Divider/>

                <LibraryReset/>
              </Tabs.TabPane>
            </Tabs>
          </Col>
        </Row>
      </div>
    );
  }
}
