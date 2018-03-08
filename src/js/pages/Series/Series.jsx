import { Row, Col, Button, Icon } from 'antd';
import { connect } from 'react-redux';
import React from 'react';

import { fetch, reset } from '../../actions/series/seriesAction';
import { getTrailer } from '../../actions/series/trailerAction';

import Loading from '../../components/Show/Series/Loading';
import Poster from '../../components/Show/Series/Poster';
import Seasons from '../../components/Show/Series/Seasons';
import SeriesInformation from '../../components/Show/Series/SeriesInformation';

@connect((store) => {
  return {
    overview: store.series.overview,
    trailer: store.series.trailer,
    seasons : store.series.seasons,

    // states
    fetching: store.series.fetching,
  };
})
export default class Series extends React.Component {
  componentWillMount() {
    const SERIES_ID = this.props.match.params.id;

    this.props.dispatch(fetch(SERIES_ID));
    this.props.dispatch(getTrailer(SERIES_ID));
  }

  componentWillUnmount() {
    this.props.dispatch(reset());
  }

  goBack() {
    window.history.back();
  }

  render() {
    const overview = this.props.overview;
    const trailer = this.props.trailer;
    const seasons = this.props.seasons;

    const pathname = this.props.location.pathname;

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

        {/* TV series poster and summary */}
        <Row type="flex" justify="center" gutter={16} style={{ marginBottom: 30 }}>
          <Poster series={ overview } />
          <SeriesInformation series={ overview } trailer= { trailer }/>
        </Row>

        <Seasons seasons={ seasons } pathname={ this.props.location.pathname } />
      </div>
    );
  }
}
