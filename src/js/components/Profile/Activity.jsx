import { Col, Row, Divider, Icon, Timeline } from 'antd';
import React from 'react';

export default class Activity extends React.Component {
  render() {
    return (
      <Row type="flex" justify="start">
        <Col
          xs={{ span: 24, offset: 0 }}
          sm={{ span: 24, offset: 0 }}
          md={{ span: 8, offset: 0 }}
          lg={{ span: 6, offset: 0 }}
          xl={{ span: 6, offset: 0 }}
        >
          <h6> About </h6>
          <Divider/>
          <p><b><Icon type="user"/> Gender: </b> Male </p>
          <p><b><Icon type="gift"/> Birthday: </b> It's a secret </p>
          <p><b><Icon type="environment"/> Location: </b> Mars </p>
          <p><b><Icon type="facebook"/> Facebook: </b> <a href="#">fb.com/abc </a></p>
        </Col>

        <Col
          xs={{ span: 24, offset: 0 }}
          sm={{ span: 24, offset: 0 }}
          md={{ span: 15, offset: 1 }}
          lg={{ span: 17, offset: 1 }}
          xl={{ span: 17, offset: 1 }}
        >
          <h6 style={{ paddingBottom: 10 }}> Activity Timeline </h6>
          <Timeline>
            <Timeline.Item color="green">
              <Row type="flex" justify="start">
                <Col span={2}>
                  <img src="https://image.tmdb.org/t/p/w500/lUFK7ElGCk9kVEryDJHICeNdmd1.jpg" width={70} height={100} />
                </Col>

                <Col span={21} style={{ paddingLeft: 15 }}>
                  <h6> Flash Season 2 </h6>
                  <p>Today</p>
                  <p><a href="#">newuser3</a> saved this to Watching</p>
                </Col>
              </Row>
            </Timeline.Item>

            <Timeline.Item color="purple">
              <p><a href="#">newuser3</a> updated profile</p>
            </Timeline.Item>

            <Timeline.Item color="blue">
              <Row type="flex" justify="start">
                <Col span={2}>
                  <img src="https://image.tmdb.org/t/p/w500/jUtFWNCJCflNTbvac4w6Qyzh43w.jpg" width={70} height={100} />
                </Col>

                <Col span={21} style={{ paddingLeft: 15 }}>
                  <h6> Tokyo Ghoul - 東京喰種トーキョーグール </h6>
                  <p>Yesterday</p>
                  <p><a href="#">newuser3</a> saved this to Complete</p>
                </Col>
              </Row>
            </Timeline.Item>
          </Timeline>
        </Col>
      </Row>
    );
  }
}