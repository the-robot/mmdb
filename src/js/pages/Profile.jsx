import { Avatar, Button, Col, Row, Tabs } from 'antd';
import { connect } from 'react-redux';
import React from 'react';
import withSizes from 'react-sizes';

import Activity from '../components/Profile/Activity';
import Library from '../components/Profile/Library';

import { get_profile, reset_profile } from '../actions/profile/profileAction';

@withSizes(({ width }) => ({
  isTablet: width < 768,
}))
@connect((store) => {
  return {
    // username of currently loggedin user
    loggedin_username: store.auth.username,

    // Profile
    // username of currently viewing profile
    username: store.profile.username,
    joined_date: store.profile.joined_date,
    name: store.profile.name,
    avatar: store.profile.avatar,
    description: store.profile.description,

    // Profile fetch state
    profile_fetched: store.profile.fetched,
  };
})
export default class Profile extends React.Component {
  componentDidMount() {
    document.title = "MMDB - @" + this.props.match.params.username;
  }

  componentWillUnmount() {
    this.props.dispatch(reset_profile());
  }

  render() {
    const element_position = ( this.props.isTablet ? 'center' : 'left' );

    if ( !this.props.profile_fetched ) {
      this.props.dispatch(get_profile( this.props.match.params.username ));
    }

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
            { this.props.avatar ?
              <img src={ this.props.avatar }
                style={{ borderRadius: '50%', borderColor: '#E8E4E2', borderWidth: 1, borderStyle: 'solid',
                        width: 120, height: 120 }}
              />
              :
              <Avatar style={{ backgroundColor: '#3E91F7', paddingTop: 40, 
                               height: 120, width: 120, borderRadius: '50%', fontSize: 50
                             }}>
              { this.props.username != undefined
              ? this.props.username.charAt(0).toUpperCase()
              : '' 
              }
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
            { this.props.loggedin_username == this.props.username ?
            <Row type="flex" justify="start">
              <Col
                xs={{ span: 24, offset: 0 }}
                sm={{ span: 24, offset: 0 }}
                md={{ span: 10, offset: 0 }}
                lg={{ span: 8, offset: 0 }}
                xl={{ span: 6, offset: 0 }}
              >
                <Button
                  style={{ width: '100%' }}
                  onClick={() => window.location.href = '/#/settings'}
                > Edit Profile </Button>
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
                <Library username={ this.props.username } />
              </Tabs.TabPane>

              {/*
              <Tabs.TabPane tab="Favorite" key="3">
                Favorite Movie and TV Shows
              </Tabs.TabPane>
              */}
            </Tabs>
          </Col>
        </Row>

      </div>
    );
  }
}
