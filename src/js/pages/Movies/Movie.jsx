import { Row, Button, Icon, Tabs } from 'antd';
import { connect } from 'react-redux';
import React from 'react';
import withSizes from 'react-sizes';

import { fetch, reset } from '../../actions/movies/movie/movieAction';
import { getTrailer } from '../../actions/movies/movie/trailerAction';

import Casts from '../../components/Show/Movie/Casts/Casts';
import Loading from '../../components/Show/Movie/Loading';
import MovieInformation from '../../components/Show/Movie/MovieInformation';
import Poster from '../../components/Show/Movie/Poster';
import Reviews from '../../components/Show/Movie/Reviews'

@withSizes(({ width }) => ({
  isTablet: width < 768
}))
@connect((store) => {
  return {
    overview: store.movie.overview,
    trailer: store.movie.trailer,

    // states
    fetching: store.movie.fetching,
    error: store.movie.error,
  };
})
export default class Movie extends React.Component {
  componentWillMount() {
    const ID = this.props.match.params.id;

    this.props.dispatch(fetch(ID));
    this.props.dispatch(getTrailer(ID));
  }

  componentWillUnmount() {
    this.props.dispatch(reset());
  }

  goBack() {
    window.history.back();
  }

  render() {
    const TabPane = Tabs.TabPane;
    const tabPosition = (this.props.isTablet ? 'top' : 'right');
    const tabSize = (this.props.isTablet ? 'small' : 'default');

    const ID = this.props.match.params.id;

    var overview = this.props.overview;
    var trailer = this.props.trailer;

    // if fetching return loading screen
    if ( this.props.fetching ) {
      return (
        <Loading showBackButton={ false } />
      );
    }
    
    // if movie not found redirect to 404 page
    if ( this.props.error && this.props.error.status == 404 )
      window.location.replace('#/404');

    return (
      <div>
        {/* Back button */}
        <Row type="flex" justify="start" style={{ marginBottom: 20 }}>
          <Button type="primary" icon="left" onClick={ this.goBack.bind(this) }>
            Back
          </Button>
        </Row>

        <Tabs defaultActiveKey="1" tabPosition={ tabPosition } size={ tabSize }>
          {/* Movie overview */}
          <TabPane tab={<span><Icon type="info-circle" />Overview</span>} key="1">
            <Row type="flex" justify="center" gutter={16}>
              <Poster movie={ overview } />
              <MovieInformation movie={ overview } trailer={ trailer }
                id={ this.props.match.params.id } />
            </Row>
          </TabPane>

          {/* Reviews */}
          <TabPane tab={<span><Icon type="message" />Reviews</span>} key="2">
            <Reviews id={ ID } />
          </TabPane>

          {/* Casts */}
          <TabPane tab={<span><Icon type="star" />Casts</span>} key="3">
            <Casts id={ ID } />
          </TabPane>
        </Tabs>
      </div>
    );
  }
}
