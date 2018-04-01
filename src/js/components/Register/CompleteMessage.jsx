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
        <h6> { this.props.username } is successfully created. <br/>
          You can now login with your username and password.</h6>
        
        <div style={{ paddingTop: 24 }}>
          <h5><a href="/"> Go to Home </a></h5>
        </div>
      </div>
    )
  }
}