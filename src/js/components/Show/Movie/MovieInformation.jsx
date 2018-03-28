// Movie General Informations
// such as title, rating, genre, summary

import { Row, Col, Button, Tag, Tooltip, Progress } from 'antd';
import ModalVideo from 'react-modal-video';
import React from 'react';

import MovieTracker from './MovieTracker';

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
    const movie = this.props.movie;
    const trailer = this.props.trailer;

    const genreTags = movie.genres.map(
      (genre, i) => <Tag key={ i }>{ genre }</Tag>
    );

    return (
      <Col offset={1} span={15}>

        {/* Movie Title */}
        <Row type="flex" justify="start">
          <Col span={24}>
            <h2> { movie.title } </h2>
          </Col>
        </Row>

        {/* Rating, User tracker info, Watch trailer button */}
        <Row type="flex" justify="start" align="middle" gutter={16}
          style={{ marginBottom: 10 }}>

          {/* Rating */}
          <Col span={2}>
              <Progress type="dashboard" percent={ movie.rating }
              width={60} />
          </Col>
          <Col span={2} style={{ paddingLeft: 25 }}>
            <p>User Rating</p>
          </Col>

          {/* Add to user library */}
          <MovieTracker id={ this.props.id } />

          {/* Watch trailer button */}
          <Col span={2} offset={1}>
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

          <Col span={18}>
            { genreTags }
          </Col>
        </Row>

        {/* Release Date and Movie Runtime */}
        <Row type="flex" justify="start" align="middle" gutter={16}
          style={{ marginBottom: 25 }}>
        
          <Col span={10}>
            Release Date: { movie.release_date }
          </Col>

          <Col span={6}>
            Runtime: { movie.runtime }
          </Col>
        </Row>

        {/* Movie Summary */}
        <Row type="flex" justify="start">
          <Col span={24}>
            <h6><b>Movie Summary</b></h6>
          </Col>

          <Col span={23}>
            <p style={{ textAlign: 'justify'}}>
              { movie.summary }
            </p>
          </Col>
        </Row>
      </Col>
    );
  }
}