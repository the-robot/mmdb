// Movie General Informations
// such as title, rating, genre, summary

import { Row, Col, Button, Tag, Tooltip, Progress } from 'antd';
import ModalVideo from 'react-modal-video';
import React from 'react';
import withSizes from 'react-sizes';

import MovieTracker from './MovieTracker';

@withSizes(({ width }) => ({
  isTablet: width < 992
}))
export default class MovieInformation extends React.Component {
  constructor (props) {
    super(props);
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

    const movie = this.props.movie;
    const trailer = this.props.trailer;

    const genreTags = movie.genres.map(
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
            <h3> { movie.title } </h3>
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
            <Progress type="dashboard" percent={ movie.rating }
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
            <MovieTracker movie={ this.props.movie } />
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

        {/* Movie Language and Genres */}
        <Row type="flex" justify="start" align="middle" gutter={16}
          style={{ marginBottom: 10 }}>
          {/*
          <Col span={6}>
            Language: { movie.language }
          </Col>
          */}

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

        {/* Release Date and Movie Runtime */}
        <Row type="flex" justify="start" align="middle" gutter={16}
          style={{ marginBottom: 25 }}>
        
          <Col
            xs={{ span: 22, offset: 2 }}
            sm={{ span: 20, offset: 2 }}
            md={{ span: 24, offset: 0 }}
            lg={{ span: 24, offset: 0 }}
            xl={{ span: 24, offset: 0 }}
          >
            Release Date: { movie.release_date }
          </Col>

          <Col
            xs={{ span: 22, offset: 2 }}
            sm={{ span: 20, offset: 2 }}
            md={{ span: 24, offset: 0 }}
            lg={{ span: 24, offset: 0 }}
            xl={{ span: 24, offset: 0 }}
          >
            Runtime: { movie.runtime }
          </Col>
        </Row>

        {/* Movie Summary */}
        <Row type="flex" justify="start">
          <Col
            xs={{ span: 22, offset: 2 }}
            sm={{ span: 22, offset: 2 }}
            md={{ span: 24, offset: 0 }}
            lg={{ span: 24, offset: 0 }}
            xl={{ span: 24, offset: 0 }}
          >
            <h6><b>Movie Summary</b></h6>
          </Col>

          <Col
            xs={{ span: 20, offset: 2 }}
            sm={{ span: 20, offset: 2 }}
            md={{ span: 24, offset: 0 }}
            lg={{ span: 24, offset: 0 }}
            xl={{ span: 24, offset: 0 }}
          >
            <p style={{ textAlign: 'justify'}}>
              { movie.summary }
            </p>
          </Col>
        </Row>
      </Col>
    );
  }
}