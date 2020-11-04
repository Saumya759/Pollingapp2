import * as actions from '../Redux/actionTypes/actionTypes';
import { ListPollRequest, PollSuccess, PollError } from '../Redux/createAction/createAction';
import axios from 'axios';
import { takeLatest, put, call } from 'redux-saga/effects';

export function* PollSaga(action) {
    const id = action.payload.id;
    const text = action.payload.option;
    const token = action.payload.token;
    let header = {
        "Content-Type": "application/json",
        access_token: `${token}`,
    }
    let response = yield call(
        axios.get,
        `${process.env.REACT_APP_BASE_URL}do_vote?id=${id}&option_text=${text}`,
        { headers: header }
    );
    let data = response.data;
    if (data.error === 0) {
        yield put(PollSuccess({ response: data }));
        yield put(ListPollRequest());
    } else {
        yield put(PollError({ error: data }));
    }
}

export function* PollRequest(){
    yield takeLatest(actions.Poll_Request, PollSaga);
}