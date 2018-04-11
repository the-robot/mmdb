const INIT_STATE = {
  token: undefined,
  expire: undefined,

  loggedin: false,
  loading: false,
  errors: {},

  // store basic user information
  user_fetched: false,
  username: undefined,
  name: undefined,
  avatar: undefined,
}

// token expiration is set of 30 days in backend
const TOKEN_EXPIRE_DAYS = 30;

const getExpireDate = (days=TOKEN_EXPIRE_DAYS) => {
  let date = new Date();
  date.setDate(date.getDate() + days);
  return date.getTime();
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
        expire: getExpireDate(),
      }
    }

    case "AUTH_TOKEN_REFRESH_FULFILLED": {
      return {
        ...state,
        token: action.payload.token,
        expire: getExpireDate(),
      }
    }

    case "AUTH_GET_USER_INFO_FULFILLED": {
      return {
        ...state,
        user_fetched: true,
        username: action.payload.username,
        name: action.payload.name,
        avatar: action.payload.avatar,
      }
    }

    case "AUTH_UPDATE_USER_INFO_FULFILLED": {
      return {
        ...state,
        name: action.payload.name,
        avatar: action.payload.avatar,
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

    case "AUTH_GET_USER_INFO_REJECTED": {
      return {
        ...state,
        errors: action.payload,
      }
    }

    case "AUTH_DEL_TOKEN": {
      return INIT_STATE;
    }
  }

  return state;
}