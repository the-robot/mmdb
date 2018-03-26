import jwtDecode from 'jwt-decode'

const INIT_STATE = {
  access: undefined,
  refresh: undefined,
  
  loggedin: false,
  loading: false,
  errors: {},
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

        access: {
          token: action.payload.access,
          ...jwtDecode(action.payload.access)
        },

        refresh: {
          token: action.payload.refresh,
          ...jwtDecode(action.payload.refresh)
        },
      }
    }

    case "AUTH_REFRESH_TOKEN_FULFILLED": {
      return {
        ...state,

        access: {
          token: action.payload.access,
          ...jwtDecode(action.payload.access)
        },
      }
    }

    case "AUTH_REFRESH_TOKEN_REJECTED": {
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