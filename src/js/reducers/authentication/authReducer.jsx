const INIT_STATE = {
  loggedin: false,
  token: null,

  loading: false,
  error: null,
}

export default function reducer(state=INIT_STATE, action) {
  switch (action.type) {
    case "ATUH_GET_TOKEN": {
      return {
        ...state,
        loading: true,
      }
    }

    case "AUTH_GET_TOKEN_FULFILLED": {
      return {
        ...state,
        loggedin: true,
        loading: false,
        token: action.payload,
      }
    }

    case "AUTH_GET_TOKEN_REJECTED": {
      return {
        ...state,
        loading: false,
        error: action.payload,
      }
    }

    case "AUTH_DEL_TOKEN": {
      return INIT_STATE;
    }
  }

  return state;
}