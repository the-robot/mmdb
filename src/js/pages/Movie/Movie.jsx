import { Row, Col, Button, Icon, Tabs } from 'antd';
import { connect } from 'react-redux';
import React from 'react';

import { getCast } from '../../actions/movie/castAction';
import { fetch, reset } from '../../actions/movie/movieAction';
import { getTrailer } from '../../actions/movie/trailerAction';

import CastView from '../../components/Show/Movie/CastView';
import Loading from './Loading';
import MovieInfo from './MovieInfo';

@connect((store) => {
  return {
    general: store.movie.general,
    trailerId: store.movie.trailerId,
    cast: store.movie.cast,

    // states
    fetching: store.movie.fetching,
  };
})
export default class Movie extends React.Component {
  componentWillMount() {
    this.props.dispatch(fetch(this.props.match.params.id));
    this.props.dispatch(getTrailer(this.props.match.params.id));
    this.props.dispatch(getCast(this.props.match.params.id));
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

  getCast(data) {
    var cast = [];

    for (let i=0; i<data.length; i+=6) {
      cast.push(data.slice(i, i+6));
    }

    return cast;
  }

  render() {
    // format casts into two dimentional array
    const casts = this.getCast(this.props.cast);

    const TabPane = Tabs.TabPane;

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

        <Tabs defaultActiveKey="1" tabPosition="right">

          {/* Movie overview */}
          <TabPane tab={<span><Icon type="info-circle" />Overview</span>} key="1">
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
                      disabled={ this.props.general.homepage === '' }>
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
          </TabPane>

          {/* Casts */}
          <TabPane tab={<span><Icon type="star" />Casts</span>} key="2">
            <Row type="flex" justify="start" gutter={16}
              style={{ marginLeft: 15, marginRight: 15 }}>
              {/* Movie cast */}
              <Col span={24}>
                <h4> Cast </h4>
              </Col>

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
