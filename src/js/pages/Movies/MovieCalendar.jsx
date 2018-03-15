import { Row, Col, Tabs, Spin, Button, BackTop } from 'antd';
import { connect } from 'react-redux';
import React from 'react';

import { init, deleteExcept, fetch, reset } from '../../actions/movieCalendarAction';
import MovieHeader from '../../components/Calendar/MovieHeader';
import ShowsView from '../../components/Show/ShowsView';

@connect((store) => {
  return {
    movies: store.movie_calendar.movies,
    year: store.movie_calendar.year,
    skip: store.movie_calendar.skip,

    fetch_pages: store.movie_calendar.fetch_pages,
    fetched_all_movies: store.series_calendar.fetched_all_movies,
    
    fetching: store.movie_calendar.fetching,
  };
})
export default class MovieCalendar extends React.Component {
  componentWillMount() {
    this.addMovieYears();
    this.getMovies(this.props.year);
  }

  componentDidMount() {
    document.title = "Movies - Calendar";
  }

  componentWillUnmount() {
    this.props.dispatch(reset());
  }

  // Add movie years on to tab
  addMovieYears(year=this.props.year, stop=this.props.skip) {
    for (let i=0; i<stop; i++) {
      let tofetch = year - i;

      // prevent sending request for already fetched data
      if (!this.hasYear(tofetch.toString()))
        this.props.dispatch(init(tofetch));
    }
  }

  // Load more movie years while browsing
  loadMovieYears(year) {
    var lastIndex = this.props.movies.length - 1;
    var lastYear;

    try {
      lastYear = Object.keys(this.props.movies[lastIndex])[0];
      lastYear = parseInt(lastYear);
    } catch (err) {
      return;
    }

    // if year user browsing is near lastYear
    // fetch new else not
    if ( (year - lastYear) < 8 )
      this.addMovieYears(lastYear-1);
  }

  hasYear(year) {
    for (let i=0; i<this.props.movies.length; i++) {
      if (Object.keys(this.props.movies[i])[0] === year)
        return true;
    }
    return false;
  }

  getMovies(year, page=1) {
    const tofetch = this.props.fetch_pages;
    for (let i=0; i<=tofetch; i++)
      this.props.dispatch(fetch(year, page+i));
  }

  loadMoreMovies(year) {
    var index = this.props.movies.findIndex(x => Object.keys(x)[0] === year);
    var page = (this.props.movies[index][year].length / 20) + 1;
    this.getMovies(year, page);
  }

  getMovieTabs(movies) {
    // React Component
    const TabPane = Tabs.TabPane;

    // Store movie data in tabs by year
    var movie_tabs = [];

    // prepare movie tabs by year
    for (let i=0; i<movies.length; i++) {
      const year = Object.keys(movies[i])[0];

      // prepare movie cards for each year
      const content = <Row type="flex" justify="center">
        <Col span={24}>
          <ShowsView shows={ movies[i] } year={ year } path='calendar/' />
        </Col>

        <Col>
          { this.props.fetching ? (
            <Spin size="large" />
          ) : (
            <Button type="primary" onClick={() => this.loadMoreMovies(year)}
              style={{ visibility: this.props.fetched_all_movies }}>
              Load More
            </Button>
          )}
        </Col>
      </Row>

      movie_tabs.push(
        <TabPane tab={ year } key={ year + "" }> { content } </TabPane>
      )
    }

    return movie_tabs;
  }

  onTabClick(year) {
    year = parseInt(year)

    // delete movie data from other years
    // and get data of current year
    this.props.dispatch(deleteExcept(year));
    this.getMovies(year);

    // if user is near or reach the end of tabs
    // try to load more movie years
    this.loadMovieYears(year);
  }

  render() {
    // React Components
    const movieTabs = this.getMovieTabs(this.props.movies);

    return (
      <div>
        {/* Page title and search button */}
        <MovieHeader />

        {/* Movie tabs */}
        <Tabs
          tabPosition="horizontal"
          size="large"
          onTabClick={ this.onTabClick.bind(this) }
        >
          { movieTabs }
        </Tabs>

        {/* Button to go back to top */}
        <BackTop />
      </div>
    );
  }
}