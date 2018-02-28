// TopCast row to show only 6 most popular casts in Movie Page

import { Row } from 'antd';
import React from 'react';

export default class TopCast extends React.Component {
  render() {
    const topCast = this.props.cast;

    return (
      <Row type="flex" justify="center" gutter={24}>
        { topCast }
      </Row>
    );
  }
}