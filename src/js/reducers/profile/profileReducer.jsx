const INITIAL_STATE = {
  username: undefined,
  joined_date: undefined,
  name: undefined,
  avatar: undefined,
  description: undefined,
  gender: undefined,
  birthday: undefined,
  location: undefined,
  social_networks: {},

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
        joined_date: action.payload.joined_date,
        name: action.payload.name,
        avatar: action.payload.avatar,
        description: action.payload.description,
        gender: action.payload.gender,
        birthday: action.payload.birthday,
        location: action.payload.location,
        social_networks: action.payload.social_networks,

        fetched: true,
      }
    }

    case "PROFILE_DATA_UPDATED": {
      return {
        ...state,
         name: action.payload.name,
         avatar: action.payload.avatar,
         description: action.payload.description,
         gender: action.payload.gender,
         birthday: action.payload.birthday,
         location: action.payload.location,
         social_networks: action.payload.social_networks,
      }
    }

    case "RESET_PROFILE": {
      return INITIAL_STATE;
    }
  }

  return state;
}