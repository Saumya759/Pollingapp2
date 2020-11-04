import * as actions from "../Redux/actionTypes/actionTypes";
import {
  UpdatePollTitleSuccess,
  UpdatePollTitleError,
  ListPollRequest,
} from "../Redux/createAction/createAction";
import axios from "axios";
import { takeLatest, call, put } from "redux-saga/effects";

export function* UpdateTitleSaga(action) {
  let title = action.payload.Title;
  let id = action.payload.id;
  
  let response = yield call(
    axios.get,
    `${process.env.REACT_APP_BASE_URL}update_poll_title?id=${id}&title=${title}`
  );
  let data = response.data;

  if (data.error == 0) {
    yield put(ListPollRequest());
    yield put(UpdatePollTitleSuccess({ response: data }));
  } else {
    yield put(UpdatePollTitleError({ error: data }));
  }
}

export function* UpdateTitleRequest() {
  yield takeLatest(actions.Update_PollTitleRequest, UpdateTitleSaga);
}