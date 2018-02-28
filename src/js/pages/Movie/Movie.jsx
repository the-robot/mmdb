import { Row, Col, Button, Icon } from 'antd';
import { connect } from 'react-redux';
import React from 'react';

import { getCast } from '../../actions/movie/castAction';
import { fetch, reset } from '../../actions/movie/movieAction';
import { getTrailer } from '../../actions/movie/trailerAction';
//import Cast from './Cast';
import CastCard from '../../components/Movie/CastCard';
import Loading from './Loading';
import MovieInfo from './MovieInfo';
import TopCast from '../../components/Movie/TopCast';

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

  getCastCards(data) {
    // divide the data into two dimentioanl array with 6 elements each
    var cast = [];
    var castCards = [];

    for (let i=0; i<data.length; i+=6) {
      cast.push(data.slice(i, i+6));
    }

  // convert the cast data into CastCard react component
    for (let i=0; i<cast.length; i++) {
      let temp = cast[i].map(
        (person) => <CastCard key={ person.cast_id } 
                              name={ person.name }
                              character={ person.character }
                              picture={ person.profile_path } />
      );
      castCards.push(temp);
    }

    return castCards;
  }

  render() {
    const id = this.props.match.params.id;

    // format casts into two dimentional array
    const cast = this.getCastCards(this.props.cast);

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

        <Row type="flex" justify="center" gutter={16} style={{ marginBottom: 20 }}>
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

        <Row type="flex" justify="start" gutter={16}
          style={{ marginLeft: 15, marginRight: 15 }}>
          {/* Movie cast */}
          <Col span={24}>
            <h4> Cast </h4>
          </Col>

          <Col span={24}>
            {/* only show first row as top cast */}
            <TopCast cast={ cast[0] } />
          </Col>
        </Row>

      </div>
    );
  }
}
