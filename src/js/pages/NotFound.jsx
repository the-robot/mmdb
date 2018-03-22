import { connect } from 'react-redux';
import React from 'react';

@connect((store) => {
  return {
    sidebar: store.layout_visibility.sidebar,
    header_visibility: store.layout_visibility.header
  }
})
export default class NotFound extends React.Component {
  componentWillMount() {
    // Hide Sidebar and Header in 404
    this.props.dispatch({type: 'LAYOUT_SIDEBAR_HIDDEN'});
    this.props.dispatch({type: 'LAYOUT_HEADER_HIDDEN'});
  }

  componentDidMount() {
    document.title = "MMDB - 404";
  }

  componentWillUnmount() {
    // Show Sidebar and Header back on exit
    this.props.dispatch({type: 'LAYOUT_SIDEBAR_VISIBLE'});
    this.props.dispatch({type: 'LAYOUT_HEADER_VISIBLE'});
  }

  render() {
    return (
      <div style={{ textAlign: 'center' }}>
        <h2><b>404 - A Unicorn</b></h2>
        <img src="../../images/404.png" width={300} height={300}
          style={{ padding: 20 }} />

        <h6>
          A unicorn has just slain you. <br/>
          But how? Unicorns don't exist. <br/>
          Like the page you requested doesn't.
        </h6>

        <p><a href="/"> Back to Home </a></p>
      </div>
    );
  }
}
