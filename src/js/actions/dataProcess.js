const POSTER_SIZES = [
  "w92",
  "w154",
  "w185",
  "w342",
  "w500",
  "w780",
  "original"
]

const BACKCOVER_SIZES = [
  "w300",
  "w780",
  "w1280",
  "original"
]

const POSTER_PATH = 'https://image.tmdb.org/t/p/' + POSTER_SIZES[3];
const BACKCOVER_PATH = 'https://image.tmdb.org/t/p/' + BACKCOVER_SIZES[3];

export const cleanShowData = (data) => {
  var results = [];

  for (let each of data) {
    results.push({
      id: each.id,
      // Movies uses 'title' & Series use 'name'
      title: (each.title != undefined ? each.title : each.name),
      release_date: each.release_date,
      language: each.original_language,
      summary: each.overview,
      rating: each.vote_average,
      poster: (each.poster_path !== null ? POSTER_PATH + each.poster_path : null),
      backcover: BACKCOVER_PATH + each.backdrop_path,
    });
  }

  return results;
}

export const cleanSeasonData = (data) => {
  const POSTER_PATH = 'https://image.tmdb.org/t/p/w300_and_h450_bestv2';

  // return nothing, if data is invalid
  if (data.poster_path === null || data.title === null)
    return {};

  var result = {
    id: data.id,
    season_number: data.season_number,
    title: data.name,
    air_date: (data.air_date != null ? getDate(data.air_date) : ''),
    summary: data.overview,
    poster: POSTER_PATH + data.poster_path,
    episodes: cleanEpisodeData(data.episodes),
  };

  return result;
}

export const getLanguages = (languages) => {
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

export const getDate = (date) => {
  const months = ["January", "February", "March", "April", "May", "June",
    "July", "August", "September", "October", "November", "December"
  ];

  date = date.split("-");
  
  var year = date[0];
  var month = months[parseInt(date[1]) - 1];
  var day = date[2];

  return month + " " + day + " " + year;
}

export const getTime = (minute) => {
  var hour = Math.floor(minute / 60);
  var min = minute % 60;

  if (hour === 0 && min === 0) {
    return 'N/A';
  }

  return hour + "h " + min + "min";
}

export const toPercentage = (number, max) => {
  return Math.ceil((number * 100) / max);
}

export const getGenres = (data) => {
  var genres = [];

  for (let i=0; i<data.length; i++)
    genres.push(data[i]['name']);

  return genres;
}


const validate = (data) => {
  // if movie data does not have summary or poster image
  // consider as invalid
  if (data.poster_path === null)
    return false

  if (data.overview === '')
    return false

  // valid
  return true
}

// clean individual episode data
const cleanEpisodeData = (episodes) => {
  const STILL_PATH = 'https://image.tmdb.org/t/p/w300';

  for (let i=0; i<episodes.length; i++) {
    episodes[i].still_path = ( episodes[i].still_path !== null ?
        STILL_PATH + episodes[i].still_path :
        '../../images/white_image.jpg'
    );
  }

  return episodes;
}