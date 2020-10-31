import * as actions from "../actionTypes/actionsTypes";
const initialstate = {
  isLoading: false,
  isLogin: false,
};

const Loginreducer = (state = initialstate, action) => {
  switch (action.type) {
    case actions.Login_Request:
      return {
        ...state,
        isLoading: true,
        isLogin: false,
      };

    case actions.Login_Sucess:
      return {
        ...state,
        isLogin: true,
        isLoading: false,

        response: action.payload.response,
      };

    case actions.Login_Error:
      return {
        ...state,
        isLoading: false,
        isLogin: false,
        error: action.payload.error,
      };
    default:
      return state;
  }
};

export default Loginreducer;
