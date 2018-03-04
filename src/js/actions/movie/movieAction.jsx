import axios from "axios";

import getTmdbAPIKey from '../../api';

export const fetch = (id) => {
  return (dispatch) => {
    dispatch({type: "FETCH_MOVIE"});

    const domain = 'https://api.themoviedb.org/3/movie/';
    const url = domain + id + '?api_key=' + getTmdbAPIKey();

    axios.get(url)
      .then((response) => {
        dispatch({
          type: "FETCH_MOVIE_FULFILLED",
          payload: clean(response.data)
        });
      })

      .catch((err) => {
        dispatch({type: "FETCH_MOVIE_REJECTED", payload: err});
      })
  }
}

export const reset = () => {
  return (dispatch) => {
    dispatch({type: 'RESET_MOVIE_DATA'});
  }
}

function clean(data) {
  const POSTER_PATH = 'https://image.tmdb.org/t/p/w300_and_h450_bestv2';

  var result = {
    id: data.id,
    title: data.title,
    release_date: getDate(data.release_date),
    status: data.status,
    language: getLanguages(data.spoken_languages),
    runtime: getTime(data.runtime),
    pg: (data.adult ? 'PG18' : 'PG13'),
    homepage: data.homepage,
    summary: data.overview,
    rating: percentage(data.vote_average, 10),
    genres: getGenres(data.genres),
    poster: POSTER_PATH + data.poster_path,
  };

  return result;
}

function getLanguages(languages) {
  var langs = '';

  // remove empty items
  for (let lang of languages) {
    if (lang['name'].length === 0)
      languages.splice(languages.indexOf(lang), 1);
  }

  // convert into string
  for (let lang of languages) {
    // if last element, do not add comma
    if (languages.indexOf(lang) === languages.length - 1) {
      langs += lang['name'];
      break;
    }

    langs += lang['name'] + ', ';
  }

  return langs;
}

function getDate(date) {
  const months = ["January", "February", "March", "April", "May", "June",
    "July", "August", "September", "October", "November", "December"
  ];

  date = date.split("-");
  
  var year = date[0];
  var month = months[parseInt(date[1]) - 1];
  var day = date[2];

  return month + " " + day + " " + year;
}

function getTime(minute) {
  var hour = Math.floor(minute / 60);
  var min = minute % 60;

  if (hour === 0 && min === 0) {
    return 'N/A';
  }

  return hour + "h " + min + "min";
}

function percentage(number, max) {
  return Math.ceil((number * 100) / max);
}

function getGenres(data) {
  var genres = [];

  for (let i=0; i<data.length; i++)
    genres.push(data[i]['name']);

  return genres;
}