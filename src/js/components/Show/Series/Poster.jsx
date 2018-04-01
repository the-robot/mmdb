import { Row, Col, Button, Icon } from 'antd';
import React from 'react';

export default class Poster extends React.Component {
  visitMoviePage() {
    window.open(this.props.series.homepage, "_blank");
  }

  render() {
    const series = this.props.series;

    return (
      <Col span={8}>
        {/* Poster */}
        <Row type="flex" justify="center" style={{ marginBottom: 10 }}>
          <img src={ series.poster } 
          alt="poster"/>
        </Row>

        {/* TV series website and share button */}
        <Row type="flex" justify="center">
          <Button.Group>
            {/* Disable button if homepage is not found */}
            <Button onClick={ this.visitMoviePage.bind(this) }
              disabled={ series.homepage === '' || series.homepage === null }>
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