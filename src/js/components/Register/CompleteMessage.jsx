// Registration Complete Message
import { connect } from 'react-redux';
import React from 'react';

@connect((store) => {
  return {
    username: store.register.username,
  };
})
export default class CompleteMessage extends React.Component {
  render() {
    return (
      <div>
        <h6> Successfully created { this.props.username }.</h6>
        <a href="/"> Go to Home </a>
      </div>
    )
  }
}