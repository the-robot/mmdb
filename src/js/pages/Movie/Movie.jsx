import { Row, Col, Button, Icon } from 'antd';
import { connect } from 'react-redux';
import React from 'react';

import { fetch, reset } from '../../actions/movie/movieAction';
import { getTrailer } from '../../actions/movie/trailerAction';
import Loading from './Loading';
import MovieInfo from './MovieInfo';

@connect((store) => {
  return {
    general: store.movie.general,
    cast: store.movie.cast,
    trailerId: store.movie.trailerId,

    // states
    fetching: store.movie.fetching,
  };
})
export default class Movie extends React.Component {
  componentWillMount() {
    this.props.dispatch(fetch(this.props.match.params.id));
    this.props.dispatch(getTrailer(this.props.match.params.id));
  }

  componentWillUnmount() {
    this.props.dispatch(reset());
  }

  goBack() {
    window.history.back();
  }

  visitMoviePage() {
    window.open(this.props.general.homepage, "_blank");
  }

  render() {
    const id = this.props.match.params.id;

    // if fetching return loading screen
    if ( this.props.fetching ) {
      return (
        <Loading />
      );
    }

    return (
      <div>
        {/* Back button */}
        <Row type="flex" justify="start" style={{ marginBottom: 20 }}>
          <Button type="primary" icon="left" onClick={this.goBack.bind(this)}>
            Back
          </Button>
        </Row>

        <Row type="flex" justify="center" gutter={16}>
          <Col span={8}>
            {/* Movie poster */}
            <Row type="flex" justify="center" style={{ marginBottom: 10 }}>
              <img src={ this.props.general.poster } 
              alt="poster"/>
            </Row>

            {/* Movie website and share button */}
            <Row type="flex" justify="center">
              <Button.Group>
                {/* Disable button if homepage is not found */}
                <Button onClick={ this.visitMoviePage.bind(this) }
                  disabled={this.props.general.homepage === ''}>
                  <Icon type="link" />Homepage
                </Button>

                <Button>
                  <Icon type="share-alt" />Share
                </Button>
              </Button.Group>
            </Row>
          </Col>

          {/* Movie general information */}
          <MovieInfo movie={ this.props.general } trailer={ this.props.trailerId } />
        </Row>

      </div>
    );
  }
}
