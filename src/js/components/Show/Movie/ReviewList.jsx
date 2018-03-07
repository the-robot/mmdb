import { List, Modal } from 'antd';
import React from 'react';

import CastCard from './CastCard';

export default class ReviewList extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      author: null,
      content: null,
      modalVisible: false,
    }
  }

  showModal = () => {
    this.setState({
      modalVisible: true,
    });
  }
  
  handleCancel = (e) => {
    this.setState({
      modalVisible: false,
    });
  }

  getReviewList(reviews) {
    var reviewList = [];

    for (let i=0; i<reviews.length; i++) {
      reviewList.push(
        <li> { reviews[i].author } </li>
      );
    }

    return reviewList;
  }

  showReviewModal(author, content) {
    this.setState({
      author: author,
      content: content,
      modalVisible: true,
    })
  }

  render() {
    const reviews = this.props.reviews;

    return (
      <div>
        <List
          itemLayout="horizontal"
          dataSource={ reviews }
          renderItem={review => (
            <List.Item>
              <List.Item.Meta
                title={<a href={ review.url } target="_blank">{ review.author }</a>}
                description={ 
                  <div>
                    <p style={{ maxHeight: 65, overflow: 'hidden' }}> 
                      { review.content }
                    </p>

                    <a onClick={() => 
                      this.showReviewModal(review.author, review.content)
                    }>
                      More
                    </a>
                  </div>
                }
              />
            </List.Item>
          )}
        />
      
        <Modal
          title={ "Review by " + this.state.author }
          visible={ this.state.modalVisible }
          onCancel={ this.handleCancel }
          footer={ null }
          width={ 600 }
        >
          <p style={{ maxHeight: 300, overflow: 'auto', textAlign: 'justify',
                      paddingLeft: 10, paddingRight: 10 }}>
            { this.state.content }
          </p>
        </Modal>
      </div>
    );
  }
}