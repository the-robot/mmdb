import { Dropdown, Menu, Icon, message} from 'antd';
import { connect } from 'react-redux';
import React from 'react';

import { isTracked, setWatching, setPlanning, 
  setComplete, setDropped, remove, reset } from '../../../actions/series/trackerAction';

@connect((store) => {
  return {
    token: store.auth.token,
    loggedin: store.auth.loggedin,

    tracker_state: store.show_track.tracker_state,
  };
})
export default class SeriesTracker extends React.Component {
  constructor(props) {
    super(props);

    const POSTER_PATH = 'https://image.tmdb.org/t/p/w342/';

    this.state = {
      series: {
        id: props.series.id,
        title: props.series.title,
        summary: props.series.summary,
        poster: POSTER_PATH + props.series.poster.split('/').pop(),
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
    if (this.props.token && this.props.series.id)
      this.props.dispatch(isTracked(this.props.token, this.props.series.id));
  }

  componentWillUnmount() {
    if (this.props.token && this.props.series.id)
      this.props.dispatch(reset());
  }

  onClick = ({ key }) => {
    var tracker = this.state.tracker_methods[key];
      this.props.dispatch(tracker(this.props.token, this.state.series));
  };

  render() {
    // Dropdown menu to add series to plan and etc.
    const trackerMenu = (
      <Menu onClick={ this.onClick }>
        <Menu.Item key="0">Watching</Menu.Item>
        <Menu.Item key="1">Planning</Menu.Item>
        <Menu.Item key="2">Complete</Menu.Item>
        <Menu.Item key="3">Dropped</Menu.Item>
        <Menu.Item key="4" style={{ color: 'red' }}>Remove from Library</Menu.Item>
      </Menu>
    );


    // return null if not loggedin
    if ( !this.props.loggedin )
      return ( null );

    return (
      <Dropdown overlay={ trackerMenu } trigger={ ['click']}>
        <a className="ant-dropdown-link" href="#">
          { this.props.tracker_state } <Icon type="down" />
        </a>
      </Dropdown>
    );
  }
}