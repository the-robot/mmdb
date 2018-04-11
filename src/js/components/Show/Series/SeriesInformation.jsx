// Movie General Informations
// such as title, rating, genre, summary

import { Row, Col, Button, Tag, Tooltip, Progress } from 'antd';
import ModalVideo from 'react-modal-video'
import React from 'react';
import withSizes from 'react-sizes';

import SeriesTracker from './SeriesTracker';

@withSizes(({ width }) => ({
  isTablet: width < 992
}))
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
    const mobileTopPadding = (this.props.isTablet ? 25 : 0)

    const series = this.props.series;
    const trailer = this.props.trailer;

    const genreTags = series.genres.map(
      (genre, i) => <Tag key={ i }>{ genre }</Tag>
    );

    return (
      <Col
        xs={{ span: 24, offset: 0 }}
        sm={{ span: 24, offset: 0 }}
        md={{ span: 23, offset: 1 }}
        lg={{ span: 14, offset: 2 }}
        xl={{ span: 16, offset: 1 }}
      >
        {/* Movie Title */}
        <Row type="flex" justify="start" style={{ paddingTop: mobileTopPadding }}>
          <Col
            xs={{ span: 22, offset: 2 }}
            sm={{ span: 20, offset: 2 }}
            md={{ span: 24, offset: 0 }}
            lg={{ span: 18, offset: 0 }}
            xl={{ span: 18, offset: 0 }}
          >
            <h3> { series.title } </h3>
          </Col>
        </Row>

        {/* Rating, User tracker info, Watch trailer button */}
        <Row type="flex" justify="start" align="middle" gutter={16}
          style={{ marginBottom: 10 }}>

          {/* Rating */}
          <Col
            xs={{ span: 2, offset: 2 }}
            sm={{ span: 2, offset: 2 }}
            md={{ span: 2, offset: 0 }}
            lg={{ span: 2, offset: 0 }}
            xl={{ span: 2, offset: 0 }}
          >
            <Progress type="dashboard" percent={ series.rating }
            width={60} />
          </Col>
          <Col
            xs={{ span: 18, offset: 2 }}
            sm={{ span: 18, offset: 2 }}
            md={{ span: 2, offset: 0 }}
            lg={{ span: 2, offset: 1 }}
            xl={{ span: 2, offset: 0 }}
          
            style={{ paddingLeft: 25 }}
          >
            <p>User Rating</p>
          </Col>

          {/* Add to user library */}
          <Col
            xs={{ span: 7, offset: 2 }}
            sm={{ span: 5, offset: 2 }}
            md={{ span: 5, offset: 2 }}
            lg={{ span: 6, offset: 2 }}
            xl={{ span: 4, offset: 1 }}
          >
            <SeriesTracker series={ this.props.series } />
          </Col>

          {/* Watch trailer button */}
          <Col
            xs={{ span: 8, offset: 1 }}
            sm={{ span: 8, offset: 1 }}
            md={{ span: 2, offset: 0 }}
            lg={{ span: 2, offset: 0 }}
            xl={{ span: 2, offset: 0 }}
          >
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
          <Col
            xs={{ span: 22, offset: 2 }}
            sm={{ span: 20, offset: 2 }}
            md={{ span: 24, offset: 0 }}
            lg={{ span: 18, offset: 0 }}
            xl={{ span: 18, offset: 0 }}
          >
            { genreTags }
          </Col>
        </Row>

        {/* Number of seasons */}
        <Row type="flex" justify="start" align="middle" gutter={16}
          style={{ marginBotton: 10 }}>
          <Col
            xs={{ span: 22, offset: 2 }}
            sm={{ span: 20, offset: 2 }}
            md={{ span: 24, offset: 0 }}
            lg={{ span: 24, offset: 0 }}
            xl={{ span: 24, offset: 0 }}
          >
            Number of Seasons: { series.number_of_season }
          </Col>
        </Row>

        {/* First Air Date */}
        <Row type="flex" justify="start" align="middle" gutter={16}
          style={{ marginBottom: 25 }}>
        
          <Col
            xs={{ span: 22, offset: 2 }}
            sm={{ span: 20, offset: 2 }}
            md={{ span: 24, offset: 0 }}
            lg={{ span: 24, offset: 0 }}
            xl={{ span: 24, offset: 0 }}
          >
            First Air Date: { series.first_air_date }
          </Col>
        </Row>

        {/* Summary */}
        <Row type="flex" justify="start">
          <Col
            xs={{ span: 22, offset: 2 }}
            sm={{ span: 22, offset: 2 }}
            md={{ span: 24, offset: 0 }}
            lg={{ span: 24, offset: 0 }}
            xl={{ span: 24, offset: 0 }}
          >
            <h6><b>Plot Summary</b></h6>
          </Col>

          <Col
            xs={{ span: 20, offset: 2 }}
            sm={{ span: 20, offset: 2 }}
            md={{ span: 24, offset: 0 }}
            lg={{ span: 24, offset: 0 }}
            xl={{ span: 24, offset: 0 }}
          >
            { series.summary ? series.summary : 'No plot summary yet.' }
          </Col>
        </Row>
      </Col>
    );
  }
}