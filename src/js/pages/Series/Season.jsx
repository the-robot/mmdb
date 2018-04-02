import { Row, Col, Tabs, Icon, Button, Rate, List } from 'antd';
import { connect } from 'react-redux';
import React from 'react';
import withSizes from 'react-sizes';

import { fetch } from '../../actions/series/seasonAction';
import { reset } from '../../actions/series/seriesAction';

import Loading from '../../components/Show/Series/Loading';
import Casts from '../../components/Show/Series/Casts';

@withSizes(({ width }) => ({
  isTablet: width < 768,
  isLargeTablet: width < 992,
}))
@connect((store) => {
  return {
    seasons : store.series.seasons,

    // states
    fetching: store.series.fetching,
  };
})
export default class Seasons extends React.Component {
  componentWillMount() {
    const ID = this.props.match.params.id;
    const SEASON = this.props.match.params.season;

    this.props.dispatch(fetch(ID, SEASON));
  }

  componentWillUnmount() {
    this.props.dispatch(reset());
  }

  goBack() {
    window.history.back();
  }

  render() {
    const TabPane = Tabs.TabPane;
    const tabPosition = (this.props.isTablet ? 'top' : 'right');
    const tabSize = (this.props.isTablet ? 'small' : 'default');

    // in small screen, poster and series info will be in different rows
    // so put space between them
    const smallscreenTopPadding = (this.props.isLargeTablet ? 25 : 0)

    // if screen size is large table or less, don't show episode preview image
    var episodeImageWidth = 280;
    if ( this.props.isLargeTablet )
      episodeImageWidth = 0;


    const ID = this.props.match.params.id;
    const SEASON = this.props.match.params.season;
    const season = (this.props.seasons.length !== 0 ? this.props.seasons[0] : []);

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

        <Tabs defaultActiveKey="1" tabPosition={ tabPosition } size={ tabSize }>
          {/* Season overview */}
          <TabPane tab={<span><Icon type="info-circle" />Overview</span>} key="1">
            <Row type="flex" justify="start">
              <Col 
                xs={{ span: 22, offset: 2 }} 
                sm={{ span: 20, offset: 4 }}
                md={{ span: 19, offset: 5 }}
                lg={{ span: 11, offset: 0 }}
                xl={{ span: 8, offset: 0 }}
              >
                <img src={ season.poster } alt="poster" width={300} height={450} />
              </Col>

              <Col 
                xs={{ span: 24, offset: 0 }} 
                sm={{ span: 24, offset: 0 }}
                md={{ span: 24, offset: 0 }}
                lg={{ span: 13, offset: 0 }}
                xl={{ span: 16, offset: 0 }}

                style={{ paddingTop: smallscreenTopPadding }}
              >
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
                    <img width={ episodeImageWidth } alt="preview" 
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
            <Casts id={ ID } season={ SEASON } />
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