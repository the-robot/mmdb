import React from 'react';

export default class Register extends React.Component {
  componentDidMount() {
    document.title = "MMDB - Registration";
  }

  render() {
    return (
      <div style={{ textAlign: 'center' }}>
        <h1> Registration </h1>
      </div>
    );
  }
}
