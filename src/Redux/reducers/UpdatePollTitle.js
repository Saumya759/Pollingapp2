import * as actions from "../actionTypes/actionTypes";

const initialState = {
  isLoading: false,
};

const UpdateTitlereducer = (state = initialState, action) => {
  switch (action.type) {
    case actions.Update_PollTitleRequest:
      return {
        ...state,
        isLoading: true,
      };

    case actions.Update_PollTitleSuccess:
      return {
        ...state,
        isLoading: false,
        response: action.payload.response,
      };

    case actions.Update_PollTitleError:
      return {
        ...state,
        isLoading: false,
        error: action.payload.error,
      };
    default:
      return state;
  }
};

export default UpdateTitlereducer;