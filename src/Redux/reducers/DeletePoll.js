import * as actions from "../actionTypes/actionTypes";

const initialState = {
  isLoading: false,
};

const DeletePollreducer = (state = initialState, action) => {
  switch (action.type) {
    case actions.Delete_PollRequest:
      return {
        ...state,
        isLoading: true,
      };

    case actions.Delete_PollSuccess:
      return {
        ...state,
        isLoading: false,
        response: action.payload.response,
      };

    case actions.Delete_PollError:
      return {
        ...state,
        isLoading: false,
        error: action.payload.error,
      };

    default:
      return state;
  }
};

export default DeletePollreducer;