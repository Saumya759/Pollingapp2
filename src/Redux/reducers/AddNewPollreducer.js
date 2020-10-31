import * as actions from "../actionTypes/actionsTypes";

const initialstate = {
  isLoading: false,
};

const CreateNewPollreducer = (state = initialstate, action) => {
  switch (action.type) {
    case actions.Create_NewPollRequest:
      return {
        ...state,
        isLoading: true,
      };

    case actions.Create_NewPollSuccess:
      return {
        ...state,
        isLoading: false,
        response: action.payload.response,
      };

    case actions.Create_NewPollError:
      return {
        ...state,
        isLoading: false,
        error: action.payload.error,
      };

    default:
      return state;
  }
};

export default CreateNewPollreducer;