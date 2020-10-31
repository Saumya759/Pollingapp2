import * as actions from "../actionTypes/actionsTypes";
const initialstate = {
  isLoading: false,
  isRegistered: false,
};

const Registrationreducer = (state = initialstate, action) => {
  switch (action.type) {
    case actions.Registation_Request:
      return {
        ...state,
        isLoading: true,
      };

    case actions.Registation_Success:
      return {
        ...state,
        isRegistered: true,
        isLoading: false,
        response: action.payload.response,
      };

    case actions.Registation_Error:
      return {
        ...state,
        isRegistered: false,
        isLoading: false,
        error: action.payload.error,
      };

    default:
      return state;
  }
};

export default Registrationreducer;