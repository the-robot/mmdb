import { Row, Col, Tabs, Icon, Button, List, Rate, Card, Avatar } from 'antd';
import { connect } from 'react-redux';
import React from 'react';

import { fetch } from '../../actions/series/seasonAction';
import { getCast } from '../../actions/series/castAction';
import { reset } from '../../actions/series/seriesAction';

import Loading from './Loading';

@connect((store) => {
  return {
    seasons : store.series.seasons,
    cast: store.series.cast,

    // states
    fetching: store.series.fetching,
  };
})
export default class Seasons extends React.Component {
  componentWillMount() {
    const ID = this.props.match.params.id;
    const SEASON = this.props.match.params.season;

    this.props.dispatch(fetch(ID, SEASON));
    this.props.dispatch(getCast(ID, SEASON));
  }

  componentWillUnmount() {
    this.props.dispatch(reset());
  }

  goBack() {
    window.history.back();
  }

  render() {
    const season = (this.props.seasons.length !== 0 ? this.props.seasons[0] : []);
    const casts = this.props.cast;

    const { Meta } = Card;    
    const TabPane = Tabs.TabPane;

    // if fetching return loading screen
    if ( this.props.fetching ) {
      return (
        <Loading />
      );
    }

    return (
      <div>
        <Row type="flex" justify="start" style={{ marginBottom: 20 }}>
          <Button type="primary" icon="left" onClick={ this.goBack.bind(this) }>
            Back
          </Button>
        </Row>

        <Tabs defaultActiveKey="1" tabPosition="right">
          {/* Season overview */}
          <TabPane tab={<span><Icon type="info-circle" />Overview</span>} key="1">
            <Row type="flex" justify="start">
              <Col span={8}>
                <img src={ season.poster } alt="poster"/>
              </Col>

              <Col offset={1} span={14}>
                <h4>{ season.title }</h4>
                <h5>{ season.air_date }</h5>
                <h6 style={{ marginTop: 25 }}>Plot Summary</h6>

                { season.summary !== "" ? (    
                    <p style={{ textAlign: 'justify' }}>{ season.summary }</p>
                  ) : (
                    <p>No plot summary.</p>
                  )
                } 
              </Col>
            </Row>
          </TabPane>

          {/* List of episodes */}
          <TabPane tab={<span><Icon type="bars" />Episodes</span>} key="2">
            <List
              itemLayout="vertical"
              size="large"
              dataSource={ season.episodes }
              renderItem={episode => (
                <List.Item
                  key={ episode.episode_number }
                  extra={
                    <img width={280} alt="preview" 
                    src={ episode.still_path }/>
                  }
                >
                  <List.Item.Meta
                    title={ episode.episode_number + ". " + episode.name }
                    description={
                      <div>
                        <p>{ getDate(episode.air_date) }</p>
                        <Rate allowHalf disabled
                          defaultValue={ getRating(episode.vote_average) }/>
                      </div>}
                  />
                  <p style={{ textAlign: 'justify' }}>
                    { episode.overview }
                  </p>
                </List.Item>
              )}
            />
          </TabPane>

          {/* Cast list */}
          <TabPane tab={<span><Icon type="star" />Casts</span>} key="3">
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
          </TabPane>

          {/*
          <TabPane tab={<span><Icon type="message" />Reviews</span>} key="4">
            Tab 4 - Reviews
          </TabPane>
          */}
        </Tabs>
      </div>
    )
  }
}


const getRating = (rating) => {
  console.log(rating / 2.0);
  return rating / 2.0; // to get rating in 0-5 scale
}

const getDate = (date) => {
  const months = ["January", "February", "March", "April", "May", "June",
    "July", "August", "September", "October", "November", "December"
  ];

  date = date.split("-");
  
  var year = date[0];
  var month = months[parseInt(date[1]) - 1];
  var day = date[2];

  return month + " " + day + ", " + year;
}