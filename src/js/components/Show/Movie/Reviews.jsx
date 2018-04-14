import { List, Modal, Button, Spin } from 'antd';
import { Markdown } from 'react-showdown';
import { connect } from 'react-redux';
import React from 'react';

import { getReviews } from '../../../actions/movies/movie/reviewsAction';

@connect((store) => {
  return {
    reviews: store.movie.reviews,
    fetching: store.movie.fetching_reviews,
  };
})
export default class Reviews extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      author: null,
      content: null,
      modalVisible: false,
    }
  }

  componentWillMount() {
    const ID = this.props.id;
    this.props.dispatch(getReviews(ID, this.props.reviews.next));
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

  showReviewModal(author, content) {
    this.setState({
      author: author,
      content: content,
      modalVisible: true,
    })
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

  loadReviews() {
    const ID = this.props.id;
    const NEXT = this.props.reviews.next;

    this.props.dispatch(getReviews(ID, NEXT));
  }

  markdownToHTML(md) {
    return <Markdown markup={ md } />
  }

  render() {
    const reviews = this.props.reviews.results;

    if ( this.props.fetching ) {
      return (
        <div style={{ textAlign: 'center' }}>
          <Spin/>
        </div>
      );
    }

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
                    <p style={{ maxHeight: 85, overflow: 'hidden' }}> 
                      { this.markdownToHTML(review.content) }
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
            { this.markdownToHTML(this.state.content) }
          </p>
        </Modal>

        { this.props.reviews.next !== null &&
          <div style={{ textAlign: 'center' }}>
            <Button style={{ border: 0 }}
              onClick={ this.loadReviews.bind(this) }
            >
              Load More
            </Button>
          </div>
        }

        <div style={{ textAlign: 'right', marginTop: 15, fontSize: 12 }}>
          <p> Reviews from
            <a href="https://www.themoviedb.org/" target="_blank"> The Movie Database </a>
          </p>
        </div>
      </div>
    );
  }
}