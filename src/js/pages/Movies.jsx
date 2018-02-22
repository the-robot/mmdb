import React from 'react';

export default class Movies extends React.Component {
  render() {
    return (
      <div>
        <h1> { this.props.match.params.year }</h1>
      </div>
    );
  }
}
