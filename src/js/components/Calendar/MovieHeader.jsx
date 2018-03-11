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
    if (query) {
      this.props.dispatch(search(query));
    }
  }

  getResultList() {
    var results = this.props.results;
    var list = [];

    // react component
    const { Meta } = Card;  

    // for (let i=0; i<results.length; i++) {
    //   list.push(
    //     <li> { results[i].title } - { results[i].original_title } </li>
    //   )
    // }
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
              <NavLink to={ "/calendar/movies/" + result.id }>
                <a href={ "#/calendar/movies/" + result.id }> { result.title } </a>
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
        <Col span={23}>
          <h1>Movies Calendar</h1>
        </Col>

        <Col span={1}>
          <Button shape="circle" icon="search" size="large"
            onClick={ this.showSearchBox.bind(this) } />
        </Col>

        {/* Search Box */}
        <Modal
          visible={ this.state.visible }
          style={{ top: 60 }}

          title="Search Movies"
          onCancel={ this.handleCancel }
          footer={ null }
        >
          {/* Search bar */}
          <Row type="flex" justify="start">
            <Col span={20}>
              <Input
                placeholder="Search Movies"
                value={ this.state.query }
                onChange={ this.onChange.bind(this) }
                onPressEnter={ this.search.bind(this) }
                />
            </Col>

            <Col span={4}>
              <Button loading={ this.props.fetching } onClick={ this.search.bind(this) }
                style={{ border: 0, width: '100%' }} >
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