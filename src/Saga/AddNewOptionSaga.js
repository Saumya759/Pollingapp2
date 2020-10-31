import * as actions from "../Redux/actionTypes/actionsTypes";
import {
  AddNewOptionSuccess,
  AddNewOptionError,
  ListPollRequest,
} from "../Redux/createAction/createAction";

import axios from "axios";
import { takeLatest, put, call } from "redux-saga/effects";

export function* AddNewOptionSaga(action) {
  let id = action.payload.id;
  let option = action.payload.option;

  let response = yield call(
    axios.get,
    `${process.env.REACT_APP_BASE_URL}add_new_option?id=${id}&option_text=${option}`
  );
  let data = response.data;
  if (data.error === 0) {
    yield put(AddNewOptionSuccess({ response: data }));
    yield put(ListPollRequest());
  } else {
    yield put(AddNewOptionError({ error: data.error }));
  }
}

export function* AddNewOptionRequest() {
  yield takeLatest(actions.AddNew_OptionRequest, AddNewOptionSaga);
}