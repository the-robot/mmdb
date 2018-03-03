import { Row, Col, Button, Icon } from 'antd';
import { NavLink } from 'react-router-dom';
import React from 'react';

import ShowCard from './ShowCard';

export default class ShowsView extends React.Component {
  render() {
    const shows = this.props.shows;
    const path = this.props.path;

    const showsInRow = shows.map(
      (shows, i) => <ShowsInRow key={ i } shows={ shows } path={ path } />
    );

    return(
      <div>
        { showsInRow }
      </div>
    );
  }
}

// Group feature shows by year
class ShowsInRow extends React.Component {
  render() {
    const shows = this.props.shows;
    const path = this.props.path;

    // Header Button CSS
    const headerButton = {
      fontSize: 28,
      border: 0,
      marginBottom: 8,
    }

    var year = null;
    var showsLink = null;
    var showCards = '';
    
    // make show cards on each show objects from json
    var success = true;
    try {
      year = Object.keys(shows);
    } catch (err) {
      success = false;
    }

    if (success) {
      showsLink = path + year;
      showCards = shows[year].map(
        (show, i) => <ShowCard key={ i } showInfo={ show } year={ year } path={ path } />
      );
    }

    return(
      <div>
        <Row gutter={16} type="flex" justify="start">
          <Col>
            <NavLink to={ showsLink } >
              <Button size='large' style={ headerButton }> { year } </Button>
            </NavLink>
          </Col>
        </Row>

        <Row gutter={24} type="flex" justify="center">
          { showCards }
        </Row>
      </div>
    );
  }
}