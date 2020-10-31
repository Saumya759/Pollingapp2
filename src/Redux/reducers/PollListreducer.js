import * as actions from "../actionTypes/actionTypes";
const initialState = {
  isPollfetched: false,
  isLoading: false,
  isError: false,
  poll: [],
};

const PollListreducer = (state = initialState, action) => {
  switch (action.type) {
    case actions.List_PollRequest:
      return {
        ...state,
        isLoading: true,
      };

    case actions.List_PollSuccess:
      return {
        ...state,
        isLoading: false,
        isPollfetched: true,
        poll: action.payload.response,
      };

    case actions.List_PollError:
      return {
        ...state,
        isPollfetched: false,
        isError: true,
        isLoading: false,
        response: action.payload.response,
      };
    default:
      return state;
  }
};

export default PollListreducer;