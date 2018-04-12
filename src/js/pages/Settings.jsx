import { Divider, Row, Col, Tabs } from 'antd';
import { connect } from 'react-redux';
import React from 'react';
import withSizes from 'react-sizes';

import General from '../components/Settings/General';
import PasswordUpdate from '../components/Settings/PasswordUpdate';
import AccountDelete from '../components/Settings/AccountDelete';

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
                <p>Content of Tab Pane 3</p>
              </Tabs.TabPane>
            </Tabs>
          </Col>
        </Row>
      </div>
    );
  }
}
