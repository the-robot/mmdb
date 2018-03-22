import React from 'react';

export default class NotFound extends React.Component {
  componentDidMount() {
    document.title = "MMDB - 404 - A Unicorn";
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
