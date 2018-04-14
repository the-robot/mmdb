import { Row, Col, Spin } from 'antd';
import { connect } from 'react-redux';
import React from 'react';
import withSizes from 'react-sizes';

import { fetch as fetch_series, reset as reset_series } from '../../actions/series/airingTodayAction';
import { fetch as fetch_movies, reset as reset_movies } from '../../actions/movies/inTheatreAction';

@withSizes(({ width }) => ({
  isTablet: width < 768,
  isLargeTablet: width < 992,
}))
@connect((store) => {
  return {
    series: store.series_airing_today.series,
    movies: store.movies_in_theatre.movies,

    series_fetching: store.series_airing_today.fetching,
    movies_fetching: store.movies_in_theatre.fetching,
  };
})
export default class Discover extends React.Component {
  componentWillMount() {
    this.props.dispatch(fetch_series(1));
    this.props.dispatch(fetch_movies(1));
  }

  componentWillUnmount() {
    this.props.dispatch(reset_series());
    this.props.dispatch(reset_movies());
  }

  render() {
    return (
      <Row gutter={16} style={{ paddingTop: 10 }}>
        {/* TV Series Airing Today */}
        <Col
          xs={{ span: 24, offset: 0 }}
          sm={{ span: 24, offset: 0 }} 
          md={{ span: 24, offset: 0 }}
          lg={{ span: 11, offset: 1 }}
          xl={{ span: 11, offset: 1 }}
        >
          <h5> Airing Today </h5>
          { this.props.series_fetching
          ? <div style={{ textAlign: 'center' }}><Spin/></div>
          : <div>
              <Col
                xs={{ span: 24, offset: 0 }}
                sm={{ span: 18, offset: 3 }} 
                md={{ span: 12, offset: 0 }}
                lg={{ span: 12, offset: 0 }}
                xl={{ span: 12, offset: 0 }}
              >
                <div
                  style={{ 
                    backgroundImage: (this.props.series[0] != undefined ? 'url(' + this.props.series[0]['backcover']  + ')' : null),
                    backgroundSize: 'cover',
                    backgroundRepeat: 'no-repeat',
                    width: '100%',
                    height: 140,
                    position: 'relative',
                  }}
                >
                  <span style={{ position: 'absolute', bottom: -8, left: 8 }}>
                    <p style={{
                      color: '#FFFFFF',
                      fontWeight: 'bold',
                      textShadow: '-1px 0 black, 0 1px black, 1px 0 black, 0 -1px black',
                      }}> { this.props.series[0] != undefined ? this.props.series[0].title : null } </p>
                  </span>
                </div>
              </Col>

              <Col
                xs={{ span: 24, offset: 0 }}
                sm={{ span: 18, offset: 3 }} 
                md={{ span: 12, offset: 0 }}
                lg={{ span: 12, offset: 0 }}
                xl={{ span: 12, offset: 0 }}
              >
                <div
                  style={{ 
                    backgroundImage: (this.props.series[1] != undefined ? 'url(' + this.props.series[1]['backcover']  + ')' : null),
                    backgroundSize: 'cover',
                    backgroundRepeat: 'no-repeat',
                    width: '100%',
                    height: 140,
                    position: 'relative',
                  }}
                >
                  <span style={{ position: 'absolute', bottom: -8, left: 8 }}>
                    <p style={{
                      color: '#FFFFFF',
                      fontWeight: 'bold',
                      textShadow: '-1px 0 black, 0 1px black, 1px 0 black, 0 -1px black',
                      }}> { this.props.series[1] != undefined ? this.props.series[1].title : null } </p>
                  </span>
                </div>
              </Col>

              <Col
                xs={{ span: 24, offset: 0 }}
                sm={{ span: 18, offset: 3 }} 
                md={{ span: 24, offset: 0 }}
                lg={{ span: 24, offset: 0 }}
                xl={{ span: 24, offset: 0 }}
              >
                <div
                  style={{ 
                    backgroundImage: (this.props.series[2] != undefined ? 'url(' + this.props.series[2]['backcover']  + ')' : null),
                    backgroundSize: 'cover',
                    backgroundRepeat: 'no-repeat',
                    width: '100%',
                    height: (this.props.isTablet ? 140 : 280),
                    position: 'relative',
                  }}
                >
                  <span style={{ position: 'absolute', bottom: -8, left: 8 }}>
                    <p style={{
                      color: '#FFFFFF',
                      fontWeight: 'bold',
                      textShadow: '-1px 0 black, 0 1px black, 1px 0 black, 0 -1px black',
                      }}> { this.props.series[2] != undefined ? this.props.series[2].title : null } </p>
                  </span>
                </div>
              </Col>
            </div>
          }
        </Col>

        {/* Movies in theatre */}
        <Col
          xs={{ span: 24, offset: 0 }}
          sm={{ span: 24, offset: 0 }} 
          md={{ span: 24, offset: 0 }}
          lg={{ span: 11, offset: 0 }}
          xl={{ span: 11, offset: 0 }}

          style={{ paddingTop: (this.props.isLargeTablet ? 30 : 0 ) }}
        >
          <h5> In Theatre </h5>
          { this.props.movies_fetching
          ? <div style={{ textAlign: 'center' }}><Spin/></div>
          : <div>
              <Col
                xs={{ span: 24, offset: 0 }}
                sm={{ span: 18, offset: 3 }} 
                md={{ span: 24, offset: 0 }}
                lg={{ span: 24, offset: 0 }}
                xl={{ span: 24, offset: 0 }}
              >
                <div
                  style={{ 
                    backgroundImage: (this.props.movies[0] != undefined ? 'url(' + this.props.movies[0]['backcover']  + ')' : null),
                    backgroundSize: 'cover',
                    backgroundRepeat: 'no-repeat',
                    width: '100%',
                    height: (this.props.isTablet ? 140 : 280),
                    position: 'relative',
                  }}
                >
                  <span style={{ position: 'absolute', bottom: -8, left: 8 }}>
                    <p style={{
                      color: '#FFFFFF',
                      fontWeight: 'bold',
                      textShadow: '-1px 0 black, 0 1px black, 1px 0 black, 0 -1px black',
                      }}> { this.props.movies[0] != undefined ? this.props.movies[0].title : null } </p>
                  </span>
                </div>
              </Col>

              <Col
                xs={{ span: 24, offset: 0 }}
                sm={{ span: 18, offset: 3 }} 
                md={{ span: 12, offset: 0 }}
                lg={{ span: 12, offset: 0 }}
                xl={{ span: 12, offset: 0 }}
              >
                <div
                  style={{ 
                    backgroundImage: (this.props.movies[1] != undefined ? 'url(' + this.props.movies[1]['backcover']  + ')' : null),
                    backgroundSize: 'cover',
                    backgroundRepeat: 'no-repeat',
                    width: '100%',
                    height: 140,
                    position: 'relative',
                  }}
                >
                  <span style={{ position: 'absolute', bottom: -8, left: 8 }}>
                    <p style={{
                      color: '#FFFFFF',
                      fontWeight: 'bold',
                      textShadow: '-1px 0 black, 0 1px black, 1px 0 black, 0 -1px black',
                      }}> { this.props.movies[1] != undefined ? this.props.movies[1].title : null } </p>
                  </span>
                </div>
              </Col>

              <Col
                xs={{ span: 24, offset: 0 }}
                sm={{ span: 18, offset: 3 }} 
                md={{ span: 12, offset: 0 }}
                lg={{ span: 12, offset: 0 }}
                xl={{ span: 12, offset: 0 }}
              >
                <div
                  style={{ 
                    backgroundImage:  (this.props.movies[2] != undefined ? 'url(' + this.props.movies[2]['backcover']  + ')' : null),
                    backgroundSize: 'cover',
                    backgroundRepeat: 'no-repeat',
                    width: '100%',
                    height: 140,
                    position: 'relative',
                  }}
                >
                  <span style={{ position: 'absolute', bottom: -8, left: 8 }}>
                    <p style={{
                      color: '#FFFFFF',
                      fontWeight: 'bold',
                      textShadow: '-1px 0 black, 0 1px black, 1px 0 black, 0 -1px black',
                      }}> { this.props.movies[2] != undefined ? this.props.movies[2].title : null } </p>
                  </span>
                </div>
              </Col>
            </div>
          }
        </Col>
      </Row>
    );
  }
}