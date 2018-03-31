// Movie General Informations
// such as title, rating, genre, summary

import { Row, Col, Button, Tag, Tooltip, Progress } from 'antd';
import ModalVideo from 'react-modal-video'
import React from 'react';

import SeriesTracker from './SeriesTracker';

export default class SeriesInformation extends React.Component {
  constructor () {
    super()
    this.state = {
      isTrailerOpen: false
    }
    this.openTrailer = this.openTrailer.bind(this)
  }

  openTrailer() {
    this.setState({isTrailerOpen: true})
  }

  render() {
    const series = this.props.series;
    const trailer = this.props.trailer;

    const genreTags = series.genres.map(
      (genre, i) => <Tag key={ i }>{ genre }</Tag>
    );

    return (
      <Col span={16}>

        {/* Movie Title */}
        <Row type="flex" justify="start">
          <Col span={24}>
            <h2> { series.title } </h2>
          </Col>
        </Row>

        {/* Rating, User tracker info, Watch trailer button */}
        <Row type="flex" justify="start" align="middle" gutter={16}
          style={{ marginBottom: 10 }}>

          {/* Rating */}
          <Col span={2}>
              <Progress type="dashboard" percent={ series.rating }
              width={60} />
          </Col>
          <Col span={2} style={{ paddingLeft: 15 }}>
            <p>User Rating</p>
          </Col>

          {/* Add to user library */}
          <SeriesTracker series={ this.props.series } />

          {/* Watch trailer button */}
          <Col span={2}>
            <ModalVideo channel='youtube' isOpen={this.state.isTrailerOpen} 
              videoId={ trailer } onClose={() => this.setState({isTrailerOpen: false})} />
            
            <Tooltip placement="right" title="Watch Trailer">
              <Button type="primary" shape="circle" icon="caret-right" size="large" 
                onClick={this.openTrailer} 
                disabled={ trailer === '' }/>
            </Tooltip>
          </Col>
        </Row>

        {/* Language and Genres */}
        <Row type="flex" justify="start" align="middle" gutter={16}
          style={{ marginBottom: 10 }}>
          <Col span={18}>
            { genreTags }
          </Col>
        </Row>

        {/* Number of seasons */}
        <Row type="flex" justify="start" align="middle" gutter={16}
          style={{ marginBotton: 10 }}>
          <Col span={18}>
            Number of Seasons: { series.number_of_season }
          </Col>
        </Row>

        {/* First Air Date */}
        <Row type="flex" justify="start" align="middle" gutter={16}
          style={{ marginBottom: 25 }}>
        
          <Col span={16}>
            First Air Date: { series.first_air_date }
          </Col>
        </Row>

        {/* Summary */}
        <Row type="flex" justify="start">
          <Col span={24}>
            <h6><b>Plot Summary</b></h6>
          </Col>

          <Col span={24}>
            { series.summary }
          </Col>
        </Row>
      </Col>
    );
  }
}