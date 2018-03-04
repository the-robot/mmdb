import { Row, Col, Button, Icon } from 'antd';
import { connect } from 'react-redux';
import React from 'react';

import { fetch, reset } from '../../actions/series/seriesAction';
import { fetch as fetchSeason, reset as resetSeason } from
  '../../actions/series/seriesSeasonAction';
import { getTrailer } from '../../actions/series/trailerAction';

import Loading from './Loading';

@connect((store) => {
  return {
    general: store.series.general,

    // states
    fetching: store.series.fetching,
  };
})
export default class Movie extends React.Component {
  componentWillMount() {
    this.props.dispatch(fetch(this.props.match.params.id));
  }

  goBack() {
    window.history.back();
  }

  render() {
    console.log(this.props.general);

    // if fetching return loading screen
    if ( this.props.fetching ) {
      return (
        <Loading />
      );
    }

    return (
      <div>
        Series
      </div>
    );
  }
}
