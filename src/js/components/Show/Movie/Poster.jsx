// Movie General Informations
// such as title, rating, genre, summary

import { Row, Col, Button, Icon } from 'antd';
import React from 'react';

export default class Poster extends React.Component {
  visitMoviePage() {
    window.open(this.props.movie.homepage, "_blank");
  }

  render() {
    const movie = this.props.movie;

    return (
      <Col span={8}>
        {/* Movie poster */}
        <Row type="flex" justify="center" style={{ marginBottom: 10 }}>
          <img src={ movie.poster } 
          alt="poster"/>
        </Row>

        {/* Movie website and share button */}
        <Row type="flex" justify="center">
          <Button.Group>
            {/* Disable button if homepage is not found */}
            <Button onClick={ this.visitMoviePage.bind(this) }
              disabled={ movie.homepage === '' }>
              <Icon type="link" />Homepage
            </Button>

            <Button>
              <Icon type="share-alt" />Share
            </Button>
          </Button.Group>
        </Row>
      </Col>
    );
  }
}