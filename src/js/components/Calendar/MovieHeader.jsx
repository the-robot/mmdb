import { Row, Col, Button, Modal, Input, List, Card, Avatar } from 'antd';
import { NavLink } from 'react-router-dom';
import { connect } from 'react-redux';
import React from 'react';

import { searchMovies as search, searchClear as clear } from '../../actions/showSearchAction';

@connect((store) => {
  return {
    results: store.show_search.results,
    fetching: store.show_search.fetching,
  };
})
export default class MovieHeader extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      visible: false,
      query: '',
    }
  }

  componentWillUnmount() {
    this.props.dispatch(clear())
  }

  showSearchBox() {
    this.setState({
      visible: true,
    })
  }

  handleCancel = (e) => {
    this.setState({
      visible: false,
    });
  }

  // store what user have entered into state
  onChange(e) {
    this.setState({ query: e.target.value });
  }

  search() {
    var query = this.state.query;
    if (query && !this.props.fetching) {
      this.props.dispatch(clear());
      this.props.dispatch(search(query));
    }
  }

  getResultList() {
    const { Meta } = Card;  
    var results = this.props.results;

    return <List
      itemLayout="horizontal"
      dataSource={ results }
      renderItem={result => (
        <List.Item>
          <List.Item.Meta
            avatar={<Avatar style={{ width: 60, height: 90 }} 
              shape="square" src={ result.poster } />
            }
            title={
              <NavLink to={ "/movies/calendar/" + result.id }>
                <a href={ "#/movies/calendar/" + result.id }> { result.title } </a>
              </NavLink>
            }
            description={
              <div>
                <p style={{ fontSize: 10 }}><b>{ result.original_title }</b></p>
                <p>{ result.release_date }</p>
              </div>
            }
          />
        </List.Item>
      )}
    />;
  }

  render() {
    const results = this.getResultList();

    return(
      <Row type="flex" justify="start" align="middle">
        <Col
          xs={{ span: 16 }} 
          sm={{ span: 14 }}
          md={{ span: 10 }}
          lg={{ span: 8 }}
          xl={{ span: 6 }}
        >
          <h4>Movies Calendar</h4>
        </Col>

        <Col
          xs={{ span: 1, offset: 5 }} 
          sm={{ span: 1, offset: 7 }}
          md={{ span: 1, offset: 12 }}
          lg={{ span: 1, offset: 15 }}
          xl={{ span: 1, offset: 17 }}
        >
          <Button shape="circle" icon="search" size="large"
            onClick={ this.showSearchBox.bind(this) } />
        </Col>

        {/* Search Box */}
        <Modal
          visible={ this.state.visible }
          style={{ top: 60 }}
          width={ 540 }

          title="Search Movies"
          onCancel={ this.handleCancel }
          footer={ null }
        >
          {/* Search bar */}
          <Row type="flex" justify="start">
            <Col span={20}>
              <Input
                value={ this.state.query }
                onChange={ this.onChange.bind(this) }
                onPressEnter={ this.search.bind(this) }
                />
            </Col>

            <Col span={4}>
              <Button loading={ this.props.fetching } onClick={ this.search.bind(this) }
                style={{ border: 0 }} >
                Search
              </Button>
            </Col>
          </Row>

          {/* Results */}
          { results }
        </Modal>
      </Row>
    )
  }
}