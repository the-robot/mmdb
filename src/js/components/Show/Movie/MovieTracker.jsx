import { Dropdown, Menu, Icon, message} from 'antd';
import { connect } from 'react-redux';
import React from 'react';

import { isTracked, setWatching, setPlanning, 
         setComplete, setDropped, remove, reset } from '../../../actions/movies/trackerAction';

@connect((store) => {
  return {
    token: store.auth.token,
    loggedin: store.auth.loggedin,

    tracker_state: store.show_track.tracker_state,
  };
})
export default class MovieTracker extends React.Component {
  constructor(props) {
    super(props);

    const POSTER_PATH = 'https://image.tmdb.org/t/p/w342/';

    this.state = {
      movie: {
        id: props.movie.id,
        title: props.movie.title,
        summary: props.movie.summary,
        poster: POSTER_PATH + props.movie.poster.split('/').pop(),
      },

      tracker_methods: {
        "0": setWatching,
        "1": setPlanning,
        "2": setComplete,
        "3": setDropped,
        "4": remove,
      },
    }
  }

  componentDidMount() {
    if (this.props.token && this.props.movie.id)
      this.props.dispatch(isTracked(this.props.token, this.props.movie.id));
  }

  componentWillUnmount() {
    if (this.props.token && this.props.movie.id)
      this.props.dispatch(reset());
  }

  onClick = ({ key }) => {
    var tracker = this.state.tracker_methods[key];
    this.props.dispatch(tracker(this.props.token, this.state.movie));
  };

  render() {
    // Dropdown menu to add movie to plan and etc.
    const trackerMenu = (
      <Menu onClick={ this.onClick }>
        <Menu.Item key="0">Watching</Menu.Item>
        <Menu.Item key="1">Planning</Menu.Item>
        <Menu.Item key="2">Complete</Menu.Item>
        <Menu.Item key="3">Dropped</Menu.Item>
        <Menu.Item key="4" style={{ color: 'red' }}>Remove from Library</Menu.Item>
      </Menu>
    );

    return (
      <Dropdown overlay={ trackerMenu } trigger={ ['click']} disabled={ this.props.loggedin ? false : true }>
        <a className="ant-dropdown-link" href="#">
          { this.props.tracker_state } <Icon type="down" />
        </a>
      </Dropdown>
    );
  }
}