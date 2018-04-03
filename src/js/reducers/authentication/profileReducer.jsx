const INITIAL_STATE = {
  username: undefined,
  name: undefined,
  avatar: undefined,
  description: undefined,

  fetched: false,
  error: null,
}

export default function reducer(state=INITIAL_STATE, action) {
  switch (action.type) {
    case "PROFILE_GET_REJECTED": {
      return {...state, error: action.payload}
    }

    case "PROFILE_GET_FULFILLED": {
      return {
        ...state,
        username: action.payload.username,
        name: action.payload.name,
        avatar: action.payload.avatar,
        description: action.payload.description,
        fetched: true,
      }
    }

    case "RESET_PROFILE": {
      return INITIAL_STATE;
    }
  }

  return state;
}