import React from 'react';

export default class NotFound extends React.Component {
  componentDidMount() {
    document.title = "MMDB - 404";
  }

  render() {
    return (
      <div>
        <h1>404</h1>
      </div>
    );
  }
}
