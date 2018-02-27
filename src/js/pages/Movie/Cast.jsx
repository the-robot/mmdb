import { Row, List } from 'antd';
import React from 'react';

import CastCard from '../../components/Movie/CastCard';
import { getCast } from '../../actions/movie/castAction';

export default class Cast extends React.Component {
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
                              picture={ person.profile_path } />);
      
      castCards.push(temp);
    }

    return castCards;
  }

  render() {
    const cast = this.getCastCards(this.props.cast);

    return (
      <List
        itemLayout="vertical"
        dataSource={ cast }
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