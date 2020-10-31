import * as actions from '../actionTypes/actionsTypes';

const initialState = {
    isLoading: false,
};

const PollReducer = (state = initialState, action) => {
    switch(action.type){
        case actions.Poll_Request:
            return{
                ...state,
                isLoading:true,
            };
        case actions.Poll_Success:
            return{
                ...state,
                isLoading:false,
                response: action.payload.response,
            };
        case actions.Poll_Error:
            return{
                ...state,
                isLoading:false,
                response:action.payload.error,
            };
        default:
            return state;
    }
};

export default PollReducer;