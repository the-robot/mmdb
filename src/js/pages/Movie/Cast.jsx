
import { Row } from 'antd';
import React from 'react';

import CastCard from '../../components/Movie/CastCard';

export default class Cast extends React.Component {
  render() {
    const cast = this.props.cast;

    const castCards = cast.slice(0, 6).map(
      (person) => <CastCard key={ person.cast_id } 
                            name={ person.name }
                            character={ person.character }
                            picture={ person.profile_path } />)

    return (
      <Row type="flex" justify="center" gutter={24}>
        { castCards }
      </Row>
    );
  }
}