const INIT_STATE = {
  registration_step: 0,  // stages of registration process

  // token require for profile setup and store temporarily
  // remove after successfully setup profile
  token: undefined,
  
  sending: false,
  error: null,
}

export default function reducer(state=INIT_STATE, action) {

  switch (action.type) {
    case "REGISTRATION_SENDING": {
      return {...state, sending: true}
    }

    case "REGISTRATION_SIGNUP_SUCCESS": {
      return {
        ...state,
        sending: false,
        registration_step: state.registration_step + 1,
      }
    }

    case "REGISTRATION_SAVE_TOKEN": {
      return {
        ...state,
        token: action.payload.token,
      }
    }

    case "REGISTRATION_REMOVE_TOKEN": {
      return {
        ...state,
        token: undefined,
      }
    }

    case "REGISTRATION_SIGNUP_REJECTED": {
      return {
        ...state,
        sending: false,
        error: action.payload,
      }
    }

    case "REGISTRATION_PROFILE_SETUP_SUCCESS": {
      return {
        ...state,
        sending: false,
        registration_step: state.registration_step + 1,
      }
    }

    case "REGISTRATION_PROFILE_SETUP_REJECTED": {
      return {
        ...state,
        sending: false,
        error: action.payload,
      }
    }

    case "RESET_REGISTRATION": {
      return INIT_STATE;
    }
  }

  return state;
}