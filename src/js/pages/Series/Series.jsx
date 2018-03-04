import React from 'react';

export default class Series extends React.Component {
  render() {
    const id = this.props.match.params.id;

    return (
      <h1> { id } </h1>
    );
  }
}
