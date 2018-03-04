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

export const cleanCalendarData = (data, year, limit) => {
  var results = {};
  results[year] = [];

  for (let each of data) {
    // filter and remove invalid data
    if (!validate(each))
      continue;

    // break if already array length reach limit
    if (results[year].length === limit)
      break;

    results[year].push({
      id: each.id,
      // Movies use 'title' & Series use 'name'
      title: (each.title != undefined ? each.title : each.name),
      release_date: each.release_date,
      language: each.original_language,
      summary: each.overview,
      rating: each.vote_average,
      poster: POSTER_PATH + each.poster_path,
      backcover: BACKCOVER_PATH + each.backdrop_path,
    });
  }

  return results;
}

export const cleanShowData = (data) => {
  var results = [];

  for (let each of data) {
    // filter and remove invalid data
    if (!validate(each))
      continue;

    results.push({
      id: each.id,
      // Movies uses 'title' & Series use 'name'
      title: (each.title != undefined ? each.title : each.name),
      release_date: each.release_date,
      language: each.original_language,
      summary: each.overview,
      rating: each.vote_average,
      poster: POSTER_PATH + each.poster_path,
      backcover: BACKCOVER_PATH + each.backdrop_path,
    });
  }

  return results;
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
