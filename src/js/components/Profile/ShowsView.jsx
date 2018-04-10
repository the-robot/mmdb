import { Row, Col, Button, Icon } from 'antd';
import { NavLink } from 'react-router-dom';
import React from 'react';

import ShowCard from './ShowCard';

// PROPS
// shows = { shows }
// path = 'path/'
export default class ShowsView extends React.Component {
  validate(data) {
    // if movie data does not have summary or poster image
    // consider as invalid
    if (data.poster === null)
      return false
  
    // valid
    return true
  }

  render() {
    const shows_data = this.props.shows;
    const path = this.props.path;

    var shows = [];

    for (let i=0; i<shows_data.length; i++) {
      if (!this.validate(shows_data[i])) {
        continue;
      }

      shows.push(
        <ShowCard key={ i } showInfo={ shows_data[i] } path={ path } />
      )
    }

    if ( shows.length > 0 ) {
      return(
        <Row type="flex" justify="start">
          { shows }
        </Row>
      );
    }

    return(
      <Row type="flex" align="middle" justify="center" style={{ paddingTop: 20 }} >
        <p> You don't have shows in this tracker. </p>
      </Row>
    );
  }
}