import { Row, Col, Tabs, Input, Spin, Button, BackTop } from 'antd';
import { connect } from 'react-redux';
import React from 'react';

import { init, deleteExcept, fetch, reset } from '../actions/seriesCalendarAction';
import ShowsView from '../components/Show/ShowsView';

@connect((store) => {
  return {
    series: store.series_calendar.series,
    year: store.series_calendar.year,
    skip: store.series_calendar.skip,

    fetch_pages: store.series_calendar.fetch_pages,
    fetched_all_series: store.series_calendar.fetched_all_series,

    // states
    fetching: store.series_calendar.fetching,
  };
})
export default class SeriesCalendar extends React.Component {
  componentWillMount() {
    this.addSeriesYears();
    this.getSeries(this.props.year);
  }

  componentDidMount() {
    document.title = "Calendar - TV Series";
  }

  componentWillUnmount() {
    this.props.dispatch(reset());
  }

  // Add tv series years on to tab
  addSeriesYears(year=this.props.year, stop=this.props.skip) {
    for (let i=0; i<stop; i++) {
      let tofetch = year - i;

      // prevent sending request for already fetched data
      if (!this.hasYear(tofetch.toString()))
        this.props.dispatch(init(tofetch));
    }
  }

  // Load more tv series years while browsing
  loadSeriesYear(year) {
    var lastIndex = this.props.series.length - 1;
    var lastYear;

    try {
      lastYear = Object.keys(this.props.series[lastIndex])[0];
      lastYear = parseInt(lastYear);
    } catch (err) {
      return;
    }

    // if year user browsing is near lastYear
    // fetch new else not
    if ((year - lastYear) < 8)
      this.addSeriesYears(lastYear-1);
  }

  hasYear(year) {
    for (let i=0; i<this.props.series.length; i++) {
      if (Object.keys(this.props.series[i])[0] === year)
        return true;
    }
    return false;
  }

  getSeries(year, page=1) {
    const tofetch = this.props.fetch_pages;
    for (let i=0; i<=tofetch; i++)
      this.props.dispatch(fetch(year, page+i));
  }

  loadMoreSeries(year) {
    var index = this.props.series.findIndex(x => Object.keys(x)[0] === year);
    var page = (this.props.series[index][year].length / 20) + 1;
    this.getSeries(year, page);
  }

  getSeriesTabs(series) {
    // React Component
    const TabPane = Tabs.TabPane;

    // Store tv series data in tabs by year
    var series_tabs = [];

    // prepare tv series tabs by year
    for (let i=0; i<series.length; i++) {
      const year = Object.keys(series[i])[0];

      // prepare tv series cards for each year
      const content = <Row type="flex" justify="center">
        <Col span={24}>
          <ShowsView shows={ series[i] } year={ year } path='series/' />
        </Col>

        <Col>
          { this.props.fetching ? (
            <Spin size="large" />
          ) : (
            <Button type="primary" onClick={() => this.loadMoreSeries(year)}
              style={{ visibility: this.props.fetched_all_series }}>
              Load More
            </Button>
          )}
        </Col>
      </Row>

      series_tabs.push(
        <TabPane tab={ year } key={ year + "" }> { content } </TabPane>
      )
    }

    return series_tabs;
  }

  onTabClick(year) {
    year = parseInt(year)

    // delete tv series data from other years
    // and get data of current year
    this.props.dispatch(deleteExcept(year));
    this.getSeries(year);

    // if user is near or reach the end of tabs
    // try to load more tv series years
    this.loadSeriesYear(year);
}

  render() {
    // React Components
    const seriesTabs = this.getSeriesTabs(this.props.series);

    return (
      <div>
        <Row type="flex" justify="start" align="middle">
          <Col span={18}>
            <h1>TV Series Calendar</h1>
          </Col>

          <Col span={6}>
            <Input.Search
              placeholder="search series"
              style={{ width: 270 }}
              onSearch={value => console.log(value)}
              enterButton
            />
          </Col>
        </Row>

        <Tabs
          tabPosition="horizontal"
          size="large"
          onTabClick={ this.onTabClick.bind(this) }
        >
          { seriesTabs }
        </Tabs>

        {/* Button to go back to top */}
        <BackTop />
      </div>
    );
  }
}