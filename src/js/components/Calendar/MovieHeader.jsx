import { Row, Col, Button, Modal, Input } from 'antd';
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

    for (let i=0; i<results.length; i++) {
      list.push(
        <li> { results[i].title } - { results[i].original_title } </li>
      )
    }

    return list;
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
          width={ 600 }

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