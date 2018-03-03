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

export const cleanMovieData = (data) => {
  var results = [];

  for (let each of data) {
    // filter and remove invalid data
    if (!validate(each))
      continue;

    results.push({
      id: each.id,
      title: each.title,
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
