import { Col, Dropdown, Menu, Icon, message} from 'antd';
import { connect } from 'react-redux';
import React from 'react';

import { setWatching, setPlanning, 
         setComplete, setDropped, remove } from '../../../actions/movies/trackerAction';

@connect((store) => {
  return {
    token: store.auth.token,
    loggedin: store.auth.loggedin,
  };
})
export default class MovieTracker extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      movie_id: props.id,

      tracker: {
        "0": setWatching,
        "1": setPlanning,
        "2": setComplete,
        "3": setDropped,
        "4": remove,
      }
    }
  }

  onClick = ({ key }) => {
    var track_function = this.state.tracker[key];
    track_function(this.state.movie_id);
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


    // return null if not loggedin
    if ( !this.props.loggedin )
      return ( null );

    return (
      <Col span={5} offset={2}>
        <Dropdown overlay={ trackerMenu } trigger={ ['click']}>
          <a className="ant-dropdown-link" href="#">
            Tracker <Icon type="down" />
          </a>
        </Dropdown>
      </Col>
    );
  }
}