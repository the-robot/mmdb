import { Row, Col, Button, Icon, Tabs } from 'antd';
import { connect } from 'react-redux';
import React from 'react';

import { getCast } from '../actions/movie/castAction';
import { fetch, reset } from '../actions/movie/movieAction';
import { getReviews } from '../actions/movie/reviewsAction';
import { getTrailer } from '../actions/movie/trailerAction';

import CastView from '../components/Show/Movie/CastView';
import Loading from '../components/Show/Movie/Loading';
import MovieInformation from '../components/Show/Movie/MovieInformation';
import Poster from '../components/Show/Movie/Poster';
import ReviewList from '../components/Show/Movie/ReviewList'

@connect((store) => {
  return {
    overview: store.movie.overview,
    trailer: store.movie.trailer,
    cast: store.movie.cast,
    reviews: store.movie.reviews,

    // states
    fetching: store.movie.fetching,
  };
})
export default class Movie extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      defaultTab: "1",
    }
  }

  componentWillMount() {
    const ID = this.props.match.params.id;

    // fetch movie overview
    this.props.dispatch(fetch(ID));
    // fetch trailer
    this.props.dispatch(getTrailer(ID));
    // fetch cast information
    this.props.dispatch(getCast(ID));
    // fetch movie reviews
    this.props.dispatch(getReviews(ID, this.props.reviews.next));
  }

  componentWillUnmount() {
    this.props.dispatch(reset());
  }

  goBack() {
    window.history.back();
  }

  loadReviews() {
    const ID = this.props.match.params.id;
    const NEXT = this.props.reviews.next;

    this.props.dispatch(getReviews(ID, NEXT));

    // prevent from changing to default tab when load more
    this.setState({
      defaultTab: "2",
    });
  }

  render() {
    // React Component
    const TabPane = Tabs.TabPane;

    // Data
    var overview = this.props.overview;
    var trailer = this.props.trailer;
    var casts = this.props.cast;
    var reviews = this.props.reviews.results;

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
          <Button type="primary" icon="left" onClick={ this.goBack.bind(this) }>
            Back
          </Button>
        </Row>

        <Tabs defaultActiveKey={ this.state.defaultTab } tabPosition="right">
          {/* Movie overview */}
          <TabPane tab={<span><Icon type="info-circle" />Overview</span>} key="1">
            <Row type="flex" justify="center" gutter={16}>
              {/* Movie Poster and Homepage/Share buttons */}
              <Poster movie={ overview } />

              {/* Movie overview information */}
              <MovieInformation movie={ overview } trailer={ trailer } />
            </Row>
          </TabPane>

          {/* Reviews */}
          <TabPane tab={<span><Icon type="message" />Reviews</span>} key="2">
            <ReviewList reviews={ reviews } />

            <div style={{ textAlign: 'center' }}>
              <Button style={{ border: 0 }}
                onClick={ this.loadReviews.bind(this) }
              >
                Load More
              </Button>
            </div>

            <div style={{ textAlign: 'right', marginTop: 15, fontSize: 12 }}>
              <p> Reviews from
                <a href="https://www.themoviedb.org/" target="_blank"> The Movie Database </a>
              </p>
            </div>
          </TabPane>

          {/* Casts */}
          <TabPane tab={<span><Icon type="star" />Casts</span>} key="3">
            <Row type="flex" justify="start" gutter={16}
              style={{ marginLeft: 15, marginRight: 15 }}>
              <Col span={24}>
                <CastView cast={ casts } />
              </Col>
            </Row>
          </TabPane>
        </Tabs>
      </div>
    );
  }
}
