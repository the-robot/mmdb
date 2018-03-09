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
  
    if (data.summary === '')
      return false
  
    // valid
    return true
  }

  render() {
    const shows = this.props.shows;
    const year = this.props.year;
    const path = this.props.path;

    var showsInRow = [];

    for (let i=0; i<shows[year].length; i++) {
      if (!this.validate(shows[year][i])) {
        continue;
      }

      showsInRow.push(
        <ShowCard key={ i } showInfo={ shows[year][i] } year={ year } path={ path } />
      )
    }

    return(
      <Row gutter={24} type="flex" justify="center">
        { showsInRow }
      </Row>
    );
  }
}