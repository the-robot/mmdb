import { Row, List } from 'antd';
import InfiniteScroll from 'react-infinite-scroller';
import React from 'react';

import CastCard from '../../components/Movie/CastCard';
import { getCast } from '../../actions/movie/castAction';

export default class Cast extends React.Component {
  divideCasts(array) {
    // divide the casts informations into two dimentional array
    // with 6 casts per each array
    var data = [];

    for (let i=0; i<array.length; i+=6) {
      data.push(array.slice(i, i+6));
    }

    return data;
  }

  getCastCards(cast) {
    // convert the cast data into CastCard react component
    var castCards = [];

    for (let i=0; i<cast.length; i++) {
      let temp = cast[i].map(
        (person) => <CastCard key={ person.cast_id } 
                              name={ person.name }
                              character={ person.character }
                              picture={ person.profile_path } />);
      
      castCards.push(temp);
    }

    return castCards;
  }

  render() {
    const cast = this.divideCasts(this.props.cast);
    const castCards = this.getCastCards(cast);

    return (
      <List
        itemLayout="vertical"
        dataSource={ castCards }
        renderItem={item => (
          <List.Item>
            <Row type="flex" justify="center" gutter={24}>
              { item }
            </Row>
          </List.Item>
        )} 
      />
    );
  }
}