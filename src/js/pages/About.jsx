import React from 'react';

export default class About extends React.Component {
  componentDidMount() {
    document.title = "About MMDB";
  }

  render() {
    return (
      <div>
        <h1>About</h1>
      </div>
    );
  }
}
