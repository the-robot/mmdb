import { Row, Col, Button, Icon } from 'antd';
import React from 'react';

export default class Poster extends React.Component {
  visitMoviePage() {
    window.open(this.props.series.homepage, "_blank");
  }

  render() {
    const series = this.props.series;

    return (
      <Col 
        xs={{ span: 24, offset: 0 }} 
        sm={{ span: 24, offset: 0 }}
        md={{ span: 24, offset: 0 }}
        lg={{ span: 8, offset: 0 }}
        xl={{ span: 7, offset: 0 }}
      >
        {/* Poster */}
        <Row type="flex" justify="center" style={{ marginBottom: 10 }}>
          <img src={ series.poster } width={300} height={450}
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