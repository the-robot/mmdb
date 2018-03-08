import { List, Avatar, Card } from 'antd';
import { connect } from 'react-redux';
import React from 'react';


import { getCast } from '../../../actions/series/castAction';

@connect((store) => {
  return {
    cast: store.series.cast,
  };
})
export default class Casts extends React.Component {
  componentWillMount() {
    const ID = this.props.id;
    const SEASON = this.props.season;

    this.props.dispatch(getCast(ID, SEASON));
  }

  render() {
    const casts = this.props.cast;
    
    const { Meta } = Card;  

    return(
      <List
        itemLayout="horizontal"
        dataSource={ casts }
        renderItem={cast => (
          <List.Item>
            <List.Item.Meta
              avatar={<Avatar style={{ width: 120, height: 175 }} 
                shape="square" src={ cast.profile_path } />
              }
              title={<a href="#">{ cast.name }</a>}
              description={ cast.character }
            />
          </List.Item>
        )}
      />
    )
  }
}