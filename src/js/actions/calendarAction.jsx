import axios from "axios";

import getTmdbAPIKey from '../api';

export function fetchMovies(year) {
  return function(dispatch) {
    dispatch({type: "FETCH_MOVIES"});

    const domain = 'https://api.themoviedb.org/3/discover/movie?primary_release_year=';
    const url = domain + year + '&api_key=' + getTmdbAPIKey();

    console.log(url);

    axios.get(url)
      .then((response) => {
        cleanData(response.data.results);
        //dispatch({type: "FETCH_MOVIES_FULFILLED", payload: cleanData(response.data.results)})
      })
      .catch((err) => {
        //dispatch({type: "FETCH_MOVIES_REJECTED", payload: err})
      })

    // MOCK DATA
    const results = [
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
    ];

    const mockData = {results}
    console.log(mockData);

    dispatch({type: 'FETCH_MOVIES_FULFILLED', payload: mockData});
  }
}

function cleanData(results) {
  var data = {results: []};

  for (var i=0; i<results.length; i++) {
    data.results = data.results.concat([{
      id: results[i].id,
      title: results[i],title,
      release_date: results[i].release_date,
      language: results[i].original_language,
      summary: results[i].overview,
      rating: results[i].vote_average,
    }]);
  }

  console.log(data);

  /*
  var i;
  for (i=0; i<data.length; i++) {
    cleanedData.push({
      id: data[i].id,
      title: data[i],title,
      release_date: data[i].release_date,
      language: data[i].original_language,
      summary: data[i].overview,
      rating: data[i].vote_average,
    });
  }

  return {results: cleanedData};
  */
}