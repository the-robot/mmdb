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

export default validate;