import { Row, Col, Button, Icon, List, Card } from 'antd';
import { NavLink } from 'react-router-dom';
import { connect } from 'react-redux';
import React from 'react';

import { fetch, reset } from '../../actions/series/seriesAction';
import { getTrailer } from '../../actions/series/trailerAction';

import Loading from './Loading';
import SeriesInfo from './SeriesInfo';

@connect((store) => {
  return {
    general: store.series.general,
    trailerId: store.series.trailerId,
    seasons : store.series.seasons,

    // states
    fetching: store.series.fetching,
  };
})
export default class Movie extends React.Component {
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

  visitHomepage() {
    window.open(this.props.general.homepage, "_blank");
  }

  render() {
    const SERIES_ID = this.props.match.params.id;

    const general_info = this.props.general;
    const trailer = this.props.trailerId;
    const seasons = this.props.seasons;

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

        <Row type="flex" justify="center" gutter={16} style={{ marginBottom: 30 }}>
          <Col span={8}>
            {/* Movie poster */}
            <Row type="flex" justify="center" style={{ marginBottom: 10 }}>
              <img src={ general_info.poster } 
              alt="poster"/>
            </Row>

            {/* Movie website and share button */}
            <Row type="flex" justify="center">
              <Button.Group>
                {/* Disable button if homepage is not found */}
                <Button onClick={ this.visitHomepage.bind(this) }
                  disabled={ general_info.homepage === '' }>
                  <Icon type="link" />Homepage
                </Button>

                <Button>
                  <Icon type="share-alt" />Share
                </Button>
              </Button.Group>
            </Row>
          </Col>

          {/* Movie general information */}
          <SeriesInfo series={ general_info } trailer= { trailer }/>
        </Row>

        {/* List of series seasons */}
        <Row type="flex" justify="start">
          <Col span={24} style={{ marginLeft: 20 }}>
            <h4> Seasons </h4>
          </Col>

          <Col span={24}>
            <List
              grid={{ gutter:12, column: 6 }}
              dataSource={ seasons }
              renderItem={season => (
                <List.Item>
                  <NavLink to={
                    this.props.location.pathname + '/' + season.season_number
                  }>
                    <Card bordered={false} hoverable>
                      <img src={ season.poster } style={{ width: 120, paddingBottom: 10 }} />
                      <h6> { season.title } </h6>
                      <p> { season.air_date } </p>
                    </Card>
                  </NavLink>
                </List.Item>
              )}
            />
          </Col>
        </Row>
      </div>
    );
  }
}
