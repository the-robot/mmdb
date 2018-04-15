// Registration Complete Message
import { connect } from 'react-redux';
import React from 'react';

import { reset } from '../../actions/authentication/registerAction';

@connect((store) => {
  return {
  };
})
export default class CompleteMessage extends React.Component {
  componentWillUnmount() {
    this.props.dispatch(reset());
  }

  render() {
    return (
      <div>
        <h6> Account is successfully created. <br/>
          You can now login with your username and password.</h6>
        
        <div style={{ paddingTop: 24 }}>
          <h5><a href="/"> Go to Home </a></h5>
        </div>
      </div>
    )
  }
}