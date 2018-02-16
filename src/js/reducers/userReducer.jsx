export default function reducer(state={
    user: {
      username: null,
      name: null,
      usertype: null,
    },
    trying: false,
    fetched: false,
    error: null,
  }, action) {

    switch (action.type) {
      case "LOGIN_USER": {
        return {...state, fetching: true};
      }

      case "LOGIN_USER_REJECTED": {
        return {...state, fetching: false, error: action.payload};
      }
      
      case "LOGIN_USER_FULFILLED": {
        return {
          ...state,
          fetching: false,
          fetched: true,
          user: action.payload,
        }
      }
    }
    return state;
}
