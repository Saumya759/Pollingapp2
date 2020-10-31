import * as actions from "../Redux/actionTypes/actionsTypes";
import { takeLatest, call, put } from "redux-saga/effects";
import axios from "axios";
import {
  ListPollSuccess,
  ListPollError,
} from "../Redux/createAction/createAction";
export function* Listsaga(action) {
  try {
    let response = yield call(
      axios.get,
      "${process.env.REACT_APP_BASE_URL}list_polls"
    );

    if (response) {
      yield put(ListPollSuccess({ response: response.data.data }));
    } else {
      yield put(ListPollError({ error: response.error }));
    }
  } catch (error) {
    yield put(ListPollError({ error: error }));
  }
}

export function* PollListRequest() {
  yield takeLatest(actions.List_PollRequest, Listsaga);
}