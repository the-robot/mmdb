import { Row, Col, Input, Card } from 'antd';
import React from 'react';

import MovieCard from '../components/Calendar/MovieCard';

export default class Calendar extends React.Component {
  render() {
    const Search = Input.Search;

    const movies = [
      {
        title: 'Murder on the Orient Express',
        poster: 'https://image.tmdb.org/t/p/w342/iBlfxlw8qwtUS0R8YjIU7JtM6LM.jpg',
        summary: 'Genius Belgian detective Hercule Poirot investigates the murder of an American tycoon aboard the Orient Express train.',
        rating: '6.8 / 10',
      },
      {
        title: 'The Shape of Water',
        poster: 'https://image.tmdb.org/t/p/w342/iLYLADGA5oKGM92Ns1j9CDgk3iI.jpg',
        summary: 'An other-worldly story, set against the backdrop of Cold War era America circa 1962, where a mute janitor working at a lab falls in love with an amphibious man being held captive there and devises a plan to help him escape.',
        rating: '6.5 / 10',
      },
      {
        title: 'Star Wars: The Last Jedi',
        poster: 'https://image.tmdb.org/t/p/w342/kOVEVeg59E0wsnXmF9nrh6OmWII.jpg',
        summary: 'Rey develops her newly discovered abilities with the guidance of Luke Skywalker, who is unsettled by the strength of her powers. Meanwhile, the Resistance prepares to do battle with the First Order.',
        rating: '6.8 / 10',
      },
      {
        title: 'It',
        poster: 'https://image.tmdb.org/t/p/w342/9E2y5Q7WlCVNEhP5GiVTjhEhx1o.jpg',
        summary: 'In a small town in Maine, seven children known as The Losers Club come face to face with life problems, bullies and a monster that takes the shape of a clown called Pennywise.',
        rating: '5.4 / 10',
      },
      {
        title: 'Justice League',
        poster: 'https://image.tmdb.org/t/p/w342/9rtrRGeRnL0JKtu9IMBWsmlmmZz.jpg',
        summary: 'Fueled by his restored faith in humanity and inspired by Superman\'s selfless act, Bruce Wayne and Diana Prince assemble a team of metahumans consisting of Barry Allen, Arthur Curry, and Victor Stone to face the catastrophic threat of Steppenwolf and the Parademons who are on the hunt for three Mother Boxes on Earth.',
        rating: '5.8 / 10',
      },
    ].map(movieInfo => <MovieCard movieInfo={ movieInfo }/>);

    return (
      <div>
        <Row gutter={16}>
          <Col>
            <h1>Movie Calendar</h1>
          </Col>
        </Row>

        <Row gutter={16} style={{ textAlign: 'right' }}>
          <Col>
            <Search
              placeholder="search movie"
              style={{ width: 300 }}
              onSearch={value => console.log(value)}
              enterButton
            />
          </Col>
        </Row>

        <Row gutter={16} >
          <Row>
            <Col><h3>2017</h3></Col>
          </Row>

          <Row gutter={16} style={{ textAlign: 'center' }} type="flex" justify="space-around">
            { movies }
          </Row>
        </Row>
      </div>
    );
  }
}
