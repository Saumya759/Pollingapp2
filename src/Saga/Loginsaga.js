import { takeLatest, put, call } from "redux-saga/effects";

import { LoginSuccess, LoginError } from "../Redux/createAction/createAction";
import * as actions from "../Redux/actionTypes/actionTypes";
import axios from "axios";
import jwt from "jsonwebtoken";

export function* loginSaga(action) {
  try {
    let username = action.payload.username;
    let password = action.payload.password;
    let response = yield call(
      axios.get,
      `${process.env.REACT_APP_BASE_URL}login?username=${username}&password=${password}`
    );
    let data = response.data;
    if (data.error === 0) {
      localStorage.setItem("token", data.token);
      let user = jwt.verify(data.token, "jwt_tok");
      yield put(LoginSuccess({ response: { data: data, role: user.role } }));
    } else {
      yield put(LoginError({ error: data }));
    }
  } catch (error) {
    yield put(LoginError({ error: error }));
  }
}

export function* loginRequest() {
  yield takeLatest(actions.Login_Request, loginSaga);
}