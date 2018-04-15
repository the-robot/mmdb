import { Col, Row, Divider, Icon, Timeline } from 'antd';
import { NavLink } from 'react-router-dom';
import { connect } from 'react-redux';
import React from 'react';
import withSizes from 'react-sizes';

import { get_recent_shows } from '../../actions/profile/profileAction';

@withSizes(({ width }) => ({
  isTablet: width < 768,
}))
@connect((store) => {
  return {
    loggedin: store.auth.loggedin,

    username: store.profile.username,
    gender: store.profile.gender,
    birthday: store.profile.birthday,
    user_location: store.profile.location,
  };
})
export default class Activity extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      activity_fetched: false,
      activities: [],
    }
  }

  get_status_color(status) {
    switch(status) {
      case 'Watching':
        return '#3E91F7';
      case 'Planning':
        return '#E89F3C';
      case 'Completed':
        return '#55AB68';
      case 'Dropped':
        return '#953835';
      default:
        return '#2F3E4E';
    }
  }

  get_recent_shows_activity() {
    get_recent_shows(this.props.username)
      .then((response) => {
        let activities = response.data.map((activity, index) => {
          return (
            <Timeline.Item color={ this.get_status_color(activity.status) }
                           key={ index }>
              <Row type="flex" justify="start">
                <Col
                  xs={{ span: 6 }}
                  sm={{ span: 4 }}
                  md={{ span: 4 }}
                  lg={{ span: 3 }}
                  xl={{ span: 2 }}
                >
                  <img src={ activity.poster } width={70} height={100} />
                </Col>
                <Col style={{ paddingLeft: 15 }}>
                  <NavLink
                    to={ activity.type == 'movie'
                         ? '/movies/calendar/' + activity.id
                         : '/series/calendar/' + activity.id  }
                    className="nav-text">
                    <h6 style={{ color: '#3E91F7' }}>{ activity.title }</h6>
                  </NavLink>
                  <p>{ activity.date }</p>
                  <p><font style={{ color: '#417FB4' }}>newuser3</font> saved this to { activity.status }</p>
                </Col>
              </Row>
            </Timeline.Item>
          );
        });

        this.setState({
          activity_fetched: true,
          activities: activities,
        });
      })

      .catch((err) => {
        ;
      })
  }

  render() {
    if ( this.props.username != undefined && this.state.activity_fetched == false )
      this.get_recent_shows_activity()

    return (
      <Row type="flex" justify="start">
        <Col
          xs={{ span: 24, offset: 0 }}
          sm={{ span: 24, offset: 0 }}
          md={{ span: 8, offset: 0 }}
          lg={{ span: 6, offset: 0 }}
          xl={{ span: 6, offset: 0 }}
        >
          <h6> About </h6>
          <Divider/>
          { this.props.gender ?
            <p><b><Icon type="user"/> Gender: </b> { this.props.gender } </p>
          : null }

          { this.props.birthday ?
            <p><b><Icon type="gift"/> Birthday: </b> { this.props.birthday } </p>
          : null }

          { this.props.user_location ? 
            <p><b><Icon type="environment"/> Location: </b> { this.props.user_location } </p>
          : null }

          {/*<p><b><Icon type="facebook"/> Facebook: </b> <a href="#">fb.com/abc </a></p>*/}
        </Col>

        <Col
          xs={{ span: 24, offset: 0 }}
          sm={{ span: 24, offset: 0 }}
          md={{ span: 15, offset: 1 }}
          lg={{ span: 17, offset: 1 }}
          xl={{ span: 17, offset: 1 }}

          style={{ paddingTop: ( this.props.isTablet ? 25 : 0 ) }}
        >
          <h6> Recently Added Shows </h6>
          <Divider/>
          <Timeline>
            { this.state.activities.length != 0 ? this.state.activities : null } 
          </Timeline>
        </Col>
      </Row>
    );
  }
}