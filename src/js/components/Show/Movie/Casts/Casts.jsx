import { Row, Spin } from 'antd';
import { connect } from 'react-redux';
import React from 'react';

import { getCast } from '../../../../actions/movies/movie/castAction';
import CastCard from './CastCard';

@connect((store) => {
  return {
    cast: store.movie.cast,
    fetching: store.movie.fetching_casts,
  };
})
export default class Casts extends React.Component {
  componentWillMount() {
    const ID = this.props.id;
    this.props.dispatch(getCast(ID));
  }

  getCast(data) {
    var cast = [];
    var castCards = [];

    for (let i=0; i<data.length; i+=6)
      cast.push(data.slice(i, i+6));
    
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
    const cast = this.getCast(this.props.cast);

    if ( this.props.fetching ) {
      return (
        <div style={{ textAlign: 'center' }}>
          <Spin/>
        </div>
      );
    }

    return (
      <Row type="flex" justify="center" gutter={24}>
        { cast }
      </Row>
    );
  }
}