import * as actions from "../actionTypes/actionTypes";

let initialState = {
  isLoading: false,
};

const DeleteOptionreducer = (state = initialState, action) => {
  switch (action.type) {
    case actions.Delete_OptionRequest:
      return {
        ...state,
        isLoading: true,
      };
    case actions.Delete_OptionSuccess:
      return {
        ...state,
        isLoading: false,
        error: action.payload.error,
      };
    case actions.Delete_OptionError:
      return {
        ...state,
        isLoading: false,
        response: action.payload.response,
      };
    default:
      return state;
  }
};
export default DeleteOptionreducer;