import jwtDecode from 'jwt-decode'

const INIT_STATE = {
  token: undefined,
  
  loggedin: false,
  loading: false,
  errors: {},
}

export default function reducer(state=INIT_STATE, action) {
  switch (action.type) {
    case "AUTH_GET_TOKEN": {
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
        token: action.payload.token,
      }
    }

    case "AUTH_TOKEN_REFRESH_FULFILLED": {
      return {
        ...state,
        token: action.payload.token,
      }
    }

    case "AUTH_TOKEN_REFRESH_REJECTED": {
      return {
        ...state,
        errors: action.payload.response || {'non_field_errors': action.payload.statusText},
      }
    }

    case "AUTH_GET_TOKEN_REJECTED": {
      return {
        ...state,
        loading: false,
        errors: action.payload.response || {'non_field_errors': action.payload.statusText},
      }
    }

    case "AUTH_DEL_TOKEN": {
      return INIT_STATE;
    }
  }

  return state;
}