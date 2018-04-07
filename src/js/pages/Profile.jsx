import { Avatar, Button, Col, Row, Tabs } from 'antd';
import { connect } from 'react-redux';
import React from 'react';
import withSizes from 'react-sizes';

import Activity from '../components/Profile/Activity';
import Library from '../components/Profile/Library';

@withSizes(({ width }) => ({
  isTablet: width < 768,
}))
@connect((store) => {
  return {
    loggedin: store.auth.loggedin,

    // profile
    username: store.profile.username,
    joined_date: store.profile.joined_date,
    name: store.profile.name,
    avatar: store.profile.avatar,
    description: store.profile.description,
  };
})
export default class Profile extends React.Component {
  constructor(props) {
    super(props);
  
    this.state = {
      current_username: props.match.params.username,
    }
  }

  componentDidMount() {
    document.title = "MMDB - @" + this.props.match.params.username;
  }

  render() {
    const element_position = ( this.props.isTablet ? 'center' : 'left' );

    return (
      <div>
        <Row type="flex" justify="start">
          {/* Profile Picture - Avatar */}
          <Col 
            xs={{ span: 24, offset: 0 }}
            sm={{ span: 24, offset: 0 }}
            md={{ span: 6, offset: 0 }}
            lg={{ span: 5, offset: 0 }}
            xl={{ span: 4, offset: 0 }}

            style={{ textAlign: element_position }}
          >
            { this.state.current_username === this.props.username ?
              <img src={ this.props.avatar }
                style={{ borderRadius: '50%', borderColor: '#E8E4E2', borderWidth: 1, borderStyle: 'solid',
                        width: 120, height: 120 }}
              />
              :
              <Avatar style={{ backgroundColor: '#3E91F7', paddingTop: 40, 
                               height: 120, width: 120, borderRadius: '50%', fontSize: 50
                             }}>
              { this.state.current_username != undefined ? this.state.current_username.charAt(0) : '' }
            </Avatar>
            }
          </Col>

          <Col
            xs={{ span: 24, offset: 0 }}
            sm={{ span: 24, offset: 0 }}
            md={{ span: 18, offset: 0 }}
            lg={{ span: 19, offset: 0 }}
            xl={{ span: 20, offset: 0 }}

            style={{ textAlign: element_position, paddingTop: 12 }}
          >
            {/* Name, join date and description */}
            <Row type="flex" justify="start">
              <Col span={24}>
                <h4> { this.props.name } </h4>
                <p> joined since { this.props.joined_date } </p>
              </Col>

              { this.props.description ?
                <Col
                  xs={{ span: 24, offset: 0 }}
                  sm={{ span: 24, offset: 0 }}
                  md={{ span: 20, offset: 0 }}
                  lg={{ span: 18, offset: 0 }}
                  xl={{ span: 16, offset: 0 }}

                  style={{ textAlign: 'justify'}}
                >
                  <p> { this.props.description } </p> 
                </Col>
              : null }
            </Row>

            {/*
              Edit profile
              if user is loggedin and current viewing its profile
            */}
            { this.props.loggedin &&
              this.state.current_username === this.props.username ?
            <Row type="flex" justify="start">
              <Col
                xs={{ span: 24, offset: 0 }}
                sm={{ span: 24, offset: 0 }}
                md={{ span: 10, offset: 0 }}
                lg={{ span: 8, offset: 0 }}
                xl={{ span: 6, offset: 0 }}
              >
                <Button style={{ width: '100%' }} > Edit Profile </Button>
              </Col>
            </Row>
            : null }
          </Col>
        </Row>

        <Row type="flex" justify="start" style={{ paddingTop: 30 }}>
          <Col span={ 24 }>
            <Tabs defaultActiveKey="1" type="card">
              <Tabs.TabPane tab="Activity" key="1">
                <Activity/>
              </Tabs.TabPane>

              <Tabs.TabPane tab="Library" key="2">
                <Library username={ this.state.current_username } />
              </Tabs.TabPane>

              <Tabs.TabPane tab="Favorite" key="3">
                Favorite Movie and TV Shows
              </Tabs.TabPane>
            </Tabs>
          </Col>
        </Row>

      </div>
    );
  }
}
