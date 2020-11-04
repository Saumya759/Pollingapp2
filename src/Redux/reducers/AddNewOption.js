import * as actions from "../actionTypes/actionTypes";

let initialState = {
  isLoading: false,
};

const AddNewOptionreducer = (state = initialState, action) => {
  switch (action.type) {
    case actions.AddNew_OptionRequest:
      return {
        ...state,
        isLoading: true,
      };
    case actions.AddNew_OptionSuccess:
      return {
        ...state,
        isLoading: false,
        response: action.payload.response,
      };
    case actions.AddNew_OptionError:
      return {
        ...state,
        isLoading: false,
        error: action.payload.error,
      };
    default:
      return state;
  }
};
export default AddNewOptionreducer;