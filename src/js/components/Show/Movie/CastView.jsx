import { Row } from 'antd';
import React from 'react';

import CastCard from './CastCard';

export default class CastView extends React.Component {
  getCastCards(cast) {
    var castCards = [];

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
    const cast = this.getCastCards(this.props.cast);

    return (
      <Row type="flex" justify="center" gutter={24}>
        { cast }
      </Row>
    );
  }
}