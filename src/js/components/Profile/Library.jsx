import { Button, Col, Row, Divider, Dropdown, Icon, Menu } from 'antd';
import { connect } from 'react-redux';
import React from 'react';
import withSizes from 'react-sizes';

import { get_tracker_count,
         get_movie_tracker,
         get_series_tracker,
         reset_library,
         reset_library_data } from '../../actions/profile/libraryAction';
import ShowView from './ShowsView';

@withSizes(({ width }) => ({
  isTablet: width < 768,
}))
@connect((store) => {
  return {
    loggedin: store.auth.loggedini,
    loggedin_username: store.profile.username,

    tracker_count: store.library.tracker_count,
    page: store.library.page,
    data: store.library.data,
    fetched_complete: store.library.fetched_complete,
  };
})
export default class Library extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      username: this.props.username,
      tracker_status: 'all',
      tracker_type: 'movies',
    }
  }
  
  componentWillMount() {
    // get tracker count
    this.props.dispatch(get_tracker_count(this.state.username, this.state.tracker_type));

    // on start, fetch data from all trackers
    // (by default tracker source is set to movies)
    this.trackAll();
  }

  componentWillUnmount() {
    this.props.dispatch(reset_library());
  }

  trackAll(tracker=this.state.tracker_type) {
    var get_tracker = (tracker == 'movies' ? get_movie_tracker : get_series_tracker);
    this.props.dispatch(get_tracker(this.state.username, 'watching', 1));
    this.props.dispatch(get_tracker(this.state.username, 'planning', 1));
    this.props.dispatch(get_tracker(this.state.username, 'completed', 1));
    this.props.dispatch(get_tracker(this.state.username, 'dropped', 1));
  }

  trackShow(status) {
    /*
    - track data from different trackers (status)
    - if given status is previously chosen status, do not fetch data
    - else reset library, then fetch either movie or tv series
    */

    // prevent fetching the same tracker
    if (this.state.tracker_status == status)
      return;

    this.setState({tracker_status: status});
    // only reset tracker movie/series data
    this.props.dispatch(reset_library_data());

    if (status == 'all') {
      this.trackAll();
    }
    else {
      let get_tracker = (this.state.tracker_type == 'movies' ? get_movie_tracker : get_series_tracker);
      this.props.dispatch(get_tracker(this.state.username, status, 1));
    }
  }

  updateTrackerType(tracker) {
    /*
    update the trackerType between movie and tv series

    - update tracker type so dropdown menu will also updated
    - delete (reset) previously fetched data from redux
    - if user selected all as tracker, then refetch either movie or tv series
      data again from all trackers
    - else just fetch either movie or series data from selected tracker
    */

    // to update dropdown menu
    this.setState({
      tracker_type: tracker,
    });

    // reset library
    this.props.dispatch(reset_library());

    // reupdate tracker count for new tracker type
    this.props.dispatch(get_tracker_count(this.state.username, tracker));

    if (this.state.tracker_status == 'all') {
      this.trackAll(tracker)
    }
    else {
      let get_tracker = (tracker == 'movies' ? get_movie_tracker : get_series_tracker);
      this.props.dispatch(get_tracker(this.state.username, this.state.tracker_status, 1));
    }
  }

  render() {
    const trackerTypeMenu = (
      <Menu onClick={ (e) => this.updateTrackerType(e['key']) }>
        <Menu.Item key="movies">Movie</Menu.Item>
        <Menu.Item key="series">TV Series</Menu.Item>
      </Menu>
    );

    return (
      <Row type="flex" justify="start">
        {/* Tracker buttons */}
        <Col
          xs={{ span: 24, offset: 0 }}
          sm={{ span: 24, offset: 0 }}
          md={{ span: 6, offset: 0 }}
          lg={{ span: 4, offset: 0 }}
          xl={{ span: 4, offset: 0 }}
        >
          <div style={{ paddingBottom: 20 }}>
            <Dropdown overlay={ trackerTypeMenu }>
              <Button style={{ width: '100%' }}>
                { this.state.tracker_type == 'movies' ? 'Movies' : 'TV Series' }
                <Icon type="down"/>
              </Button>
            </Dropdown>
          </div>

          <Button size="large" style={{
            width: '100%',
            borderColor: '#FFFFFF',
            borderRadius: 0,
            borderWidth: 2,
            backgroundColor: (this.state.tracker_status == 'all' ? '#417FB4' : '#C6DBEB'),
            color: (this.state.tracker_status == 'all' ? '#FFFFFF' : '#8D8B8E'),
          }} onClick={() => this.trackShow('all') }>
            <Col span={18} style={{ textAlign: 'left' }}>
              All Shows
            </Col>

            <Col span={6} style={{ textAlign: 'right' }}>
              { this.props.tracker_count.all }
            </Col>
          </Button>

          <Button size="large" style={{
            width: '100%',
            borderColor: '#FFFFFF',
            borderRadius: 0,
            borderWidth: 2,
            backgroundColor: (this.state.tracker_status == 'watching' ? '#2F3E4E' : '#B6C1CD'),
            color: (this.state.tracker_status == 'watching' ? '#FFFFFF' : '#8D8B8E'),
          }} onClick={() => this.trackShow('watching') }>
            <Col span={18} style={{ textAlign: 'left' }}>
              Watching
            </Col>

            <Col span={6} style={{ textAlign: 'right' }}>
              { this.props.tracker_count.watching }
            </Col>
          </Button>

          <Button size="large" style={{
            width: '100%',
            borderColor: '#FFFFFF',
            borderRadius: 0,
            borderWidth: 2,
            backgroundColor: (this.state.tracker_status == 'planning' ? '#E89F3C' : '#F8E3C1'),
            color: (this.state.tracker_status == 'planning' ? '#FFFFFF' : '#8D8B8E'),
          }} onClick={() => this.trackShow('planning') }>
            <Col span={18} style={{ textAlign: 'left' }}>
              Planning
            </Col>

            <Col span={6} style={{ textAlign: 'right' }}>
              { this.props.tracker_count.planning }
            </Col>
          </Button>

          <Button size="large" style={{
            width: '100%',
            borderColor: '#FFFFFF',
            borderRadius: 0,
            borderWidth: 2,
            backgroundColor: (this.state.tracker_status == 'completed' ? '#55AB68' : '#C6EED4'),
            color: (this.state.tracker_status == 'completed' ? '#FFFFFF' : '#8D8B8E'),
          }} onClick={() => this.trackShow('completed') }>
            <Col span={18} style={{ textAlign: 'left' }}>
              Completed
            </Col>

            <Col span={6} style={{ textAlign: 'right' }}>
              { this.props.tracker_count.completed }
            </Col>
          </Button>

          <Button size="large" style={{
            width: '100%',
            borderColor: '#FFFFFF',
            borderRadius: 0,
            borderWidth: 2,
            backgroundColor: (this.state.tracker_status == 'dropped' ? '#953835' : '#ECD0D0'),
            color: (this.state.tracker_status == 'dropped' ? '#FFFFFF' : '#8D8B8E'),
          }} onClick={() => this.trackShow('dropped') }>
            <Col span={18} style={{ textAlign: 'left' }}>
              Dropped
            </Col>

            <Col span={6} style={{ textAlign: 'right' }}>
              { this.props.tracker_count.dropped }
            </Col>
          </Button>

          { this.state.username == this.props.loggedin_username
          ? <div> 
              <Divider/>

              <div style={{ textAlign: 'center' }}>
                <a href="#"> Manage Library </a>
              </div>
            </div>
          : null }
        </Col>

        <Col
          xs={{ span: 24, offset: 0 }}
          sm={{ span: 24, offset: 0 }}
          md={{ span: 17, offset: 1 }}
          lg={{ span: 19, offset: 1 }}
          xl={{ span: 19, offset: 1 }}

          style={{ paddingTop: (this.props.isTablet ? 20 : 0) }}
        >
          <ShowView shows={ this.props.data }
            path={ this.state.tracker_type + '/calendar/' }
          /> 
        </Col>
      </Row>
    );
  }
}