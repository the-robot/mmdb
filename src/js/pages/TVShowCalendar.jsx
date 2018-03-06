import { Row, Col, Input, Button, BackTop, Spin } from 'antd';
import { connect } from 'react-redux';
import React from 'react';

import { fetchSeries as fetch, reset } from '../actions/calendarAction';
import ShowsView from '../components/Show/ShowsView';

@connect((store) => {
  return {
    series: store.calendar.series,
    year: store.calendar.year,
    skip: store.calendar.skip,
    fetching: store.calendar.fetching,
  };
})
export default class TVShowCalendar extends React.Component {
  componentWillMount() {
    this.getSeries();
  }

  componentDidMount() {
    document.title = "Calendar - TV Shows";
  }

  // componentWillUnmount() {
  //   this.props.dispatch(reset());
  // }

  getSeries(year=this.props.year, stop=this.props.skip) {
    for (let i=0; i<stop; i++) {
      let tofetch = year - i;

      // prevent sending request for already fetched data
      if (!this.isFetched(tofetch.toString()))
        this.props.dispatch(fetch(tofetch, 1, 4));
    }
  }

  isFetched(year) {
    for (let i=0; i<this.props.series.length; i++) {
      if (Object.keys(this.props.series[i])[0] === year)
        return true;
    }
    return false;
  }

  getNewSeries() {
    // get last fetched series year
    var lastIndex = this.props.series.length - 1;
    var lastYear;

    try {
      lastYear = Object.keys(this.props.series[lastIndex])[0];
      lastYear = parseInt(lastYear);
    } catch (err) {
      return;
    }

    this.getSeries(lastYear-1);
  }

  render() {
    const Search = Input.Search;
    const series = this.props.series;

    return (
      <div>
        <Row type="flex" justify="start">
          <Col>
            <h1>TV Shows Calendar</h1>
          </Col>
        </Row>

        <Row type="flex" justify="end" >
          <Col>
            <Search
              placeholder="search tv series"
              style={{ width: 300 }}
              onSearch={value => console.log(value)}
              enterButton
            />
          </Col>
        </Row>

        <ShowsView shows={ series } path='series/' />

        <Row type="flex" justify="center">
          <Col>
            { this.props.fetching ? (
              <Spin size="large" />
            ) : (
              <Button type="primary" onClick={this.getNewSeries.bind(this)} >Load More</Button>
            )}
          </Col>
        </Row>

        {/* Button to go back to top */}
        <BackTop />
      </div>
    );
  }
}