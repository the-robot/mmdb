import { Button, Col, Row, Divider, Dropdown, Icon, Menu } from 'antd';
import { connect } from 'react-redux';
import React from 'react';
import withSizes from 'react-sizes';

import { get_movie_tracker, reset_library } from '../../actions/profile/libraryAction';

@withSizes(({ width }) => ({
  isTablet: width < 768,
}))
@connect((store) => {
  return {

  };
})
export default class Library extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      username: this.props.username,
      tracker: 'all',
      trackerType: 'movies',
    }
  }
  
  componentDidMount() {
    // on start, fetch data from all trackers
    this.trackAll();
  }

  trackAll() {
    this.props.dispatch(get_movie_tracker(this.state.username, 'watching', 1));
    this.props.dispatch(get_movie_tracker(this.state.username, 'planning', 1));
    this.props.dispatch(get_movie_tracker(this.state.username, 'completed', 1));
    this.props.dispatch(get_movie_tracker(this.state.username, 'dropped', 1));
  }

  trackShow(status) {
    // prevent fetching the same tracker
    if (this.state.tracker == status)
      return;

    this.setState({tracker: status});
    this.resetLibrary();

    if (status == 'all')
      this.trackAll();
    else
      this.props.dispatch(get_movie_tracker(this.state.username, status, 1));
  }

  resetLibrary() {
    // reset previous data
    this.props.dispatch(reset_library());
  }

  render() {
    const trackerTypeMenu = (
      <Menu onClick={ (e) => this.setState({ trackerType: e['key']}) }>
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
                { this.state.trackerType == 'movies' ? 'Movies' : 'TV Series' }
                <Icon type="down"/>
              </Button>
            </Dropdown>
          </div>

          <Button size="large" style={{
            width: '100%',
            borderColor: '#FFFFFF',
            borderRadius: 0,
            borderWidth: 2,
            backgroundColor: (this.state.tracker == 'all' ? '#417FB4' : '#C6DBEB'),
            color: (this.state.tracker == 'all' ? '#FFFFFF' : '#8D8B8E'),
          }} onClick={() => this.trackShow('all') }>All Shows</Button>

          <Button size="large" style={{
            width: '100%',
            borderColor: '#FFFFFF',
            borderRadius: 0,
            borderWidth: 2,
            backgroundColor: (this.state.tracker == 'watching' ? '#2F3E4E' : '#B6C1CD'),
            color: (this.state.tracker == 'watching' ? '#FFFFFF' : '#8D8B8E'),
          }} onClick={() => this.trackShow('watching') }>Watching</Button>

          <Button size="large" style={{
            width: '100%',
            borderColor: '#FFFFFF',
            borderRadius: 0,
            borderWidth: 2,
            backgroundColor: (this.state.tracker == 'planning' ? '#E89F3C' : '#F8E3C1'),
            color: (this.state.tracker == 'planning' ? '#FFFFFF' : '#8D8B8E'),
          }} onClick={() => this.trackShow('planning') }>Planning</Button>

          <Button size="large" style={{
            width: '100%',
            borderColor: '#FFFFFF',
            borderRadius: 0,
            borderWidth: 2,
            backgroundColor: (this.state.tracker == 'completed' ? '#55AB68' : '#C6EED4'),
            color: (this.state.tracker == 'completed' ? '#FFFFFF' : '#8D8B8E'),
          }} onClick={() => this.trackShow('completed') }>Completed</Button>

          <Button size="large" style={{
            width: '100%',
            borderColor: '#FFFFFF',
            borderRadius: 0,
            borderWidth: 2,
            backgroundColor: (this.state.tracker == 'dropped' ? '#953835' : '#ECD0D0'),
            color: (this.state.tracker == 'dropped' ? '#FFFFFF' : '#8D8B8E'),
          }} onClick={() => this.trackShow('dropped') }>Dropped</Button>

          <Divider/>

          <div style={{ textAlign: 'center' }}>
            <a href="#"> Manage Library </a>
          </div>
        </Col>

        <Col
          xs={{ span: 24, offset: 0 }}
          sm={{ span: 24, offset: 0 }}
          md={{ span: 15, offset: 1 }}
          lg={{ span: 17, offset: 1 }}
          xl={{ span: 17, offset: 1 }}

          style={{ paddingTop: (this.props.isTablet ? 20 : 0) }}
        >
          <h1> Movie Tracker Area </h1>
        </Col>
      </Row>
    );
  }
}