import * as actions from "../Redux/actionTypes/actionsTypes";
import {
  DeleteOptionSuccess,
  DeleteOptionError,
  ListPollRequest,
} from "../Redux/createAction/createAction";
import axios from "axios";
import { takeLatest, put, call } from "redux-saga/effects";

export function* DeleteOptionSaga(action) {
  let id = action.payload.id;
  let text = action.payload.text;

  let response = yield call(
    axios.get,
    `${process.env.REACT_APP_BASE_URL}delete_poll_option?id=${id}&option_text=${text}`
  );

  const data = response.data;

  if (data.error == 0) {
    yield put(ListPollRequest());
    yield put(DeleteOptionSuccess({ response: data }));
  } else {
    yield put(DeleteOptionError({ error: data.error }));
  }
}

export function* DeleteOptionRequest() {
  yield takeLatest(actions.Delete_OptionRequest, DeleteOptionSaga);
}