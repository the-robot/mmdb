// Movie General Informations
// such as title, rating, genre, summary

import { Row, Col, Button, Icon, Tag, Tooltip, Dropdown, Menu, Progress } from 'antd';
import React from 'react';

export default class MovieInfo extends React.Component {
  render() {
    const movie = this.props.movie;

    const genreTags = movie.genres.map(
      (genre, i) => <Tag key={ i }>{ genre }</Tag>
    );

    // Dropdown menu to add movie to plan and etc.
    const trackerMenu = (
      <Menu>
        <Menu.Item key="0">Watching</Menu.Item>
        <Menu.Item key="1">Planning</Menu.Item>
        <Menu.Item key="2">Completed</Menu.Item>
        <Menu.Item key="3">Dropped</Menu.Item>
        <Menu.Item key="4" style={{ color: 'red' }}>Remove from Library</Menu.Item>
      </Menu>
    );

    return (
      <Col span={16}>

        {/* Movie Title */}
        <Row type="flex" justify="start">
          <Col span={24}>
            <h2> { movie.title } </h2>
          </Col>
        </Row>

        {/* Rating, User tracker info, Watch trailer button */}
        <Row type="flex" justify="start" align="middle" gutter={16}
          style={{ marginBottom: 10 }}>

          {/* Rating */}
          <Col span={2}>
              <Progress type="dashboard" percent={ movie.rating }
              width={60} />
          </Col>
          <Col span={2} style={{ paddingLeft: 15 }}>
            <p>User Rating</p>
          </Col>

          {/* Add to user library */}
          <Col span={3} offset={1}>
            <Dropdown overlay={trackerMenu} trigger={['click']}>
              <a className="ant-dropdown-link" href="#">
                Tracker <Icon type="down" />
              </a>
            </Dropdown>
          </Col>

          {/* Watch trailer button */}
          <Col span={2}>
            <Tooltip placement="right" title="Watch Trailer">
              <Button type="primary" shape="circle" icon="caret-right" size="large" />
            </Tooltip>
          </Col>
        </Row>

        {/* Movie Language and Genres */}
        <Row type="flex" justify="start" align="middle" gutter={16}
          style={{ marginBottom: 10 }}>
          <Col span={6}>
            Language: { movie.language }
          </Col>

          <Col span={18}>
            { genreTags }
          </Col>
        </Row>

        {/* Release Date and Movie Runtime */}
        <Row type="flex" justify="start" align="middle" gutter={16}
          style={{ marginBottom: 25 }}>
        
          <Col span={7}>
            Release Date: { movie.release_date }
          </Col>

          <Col span={5}>
            Runtime: { movie.runtime }
          </Col>
        </Row>

        {/* Movie Summary */}
        <Row type="flex" justify="start">
          <Col span={24}>
            <h6><b>Movie Summary</b></h6>
          </Col>

          <Col span={24}>
            { movie.summary }
          </Col>
        </Row>
      </Col>
    );
  }
}