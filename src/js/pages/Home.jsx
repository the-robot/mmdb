import { Row, Col, Card } from 'antd';
import React from 'react';

import Discover from '../components/Home/Discover';

export default class Home extends React.Component {
  componentDidMount() {
    document.title = "MMDB - Home";
  }

  render() {
    return (
      <div>
        <Discover/>
      </div>
    );
  }
}
