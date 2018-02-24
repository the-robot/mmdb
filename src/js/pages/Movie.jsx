import { Row, Col } from 'antd';
import React from 'react';

export default class Movie extends React.Component {
  render() {
    const id = this.props.match.params.id;

    console.log('Movie id :' + id);

    return (
      <div>
        
      </div>
    );
  }
}
