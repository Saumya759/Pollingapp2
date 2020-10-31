import { takeLatest, put, call } from "redux-saga/effects";
import * as actions from "../Redux/actionTypes/actionTypes";

import {
  RegistrationSuccess,
  RegistrationError,
} from "../Redux/createAction/createAction";
import axios from "axios";

export default function* registrationSaga(action) {
  try {
    let username = action.payload.username;
    let password = action.payload.password;
    let option = action.payload.option;

    // yield put(RegistationRequest);
    const response = yield call(
      axios.get,
      `${process.env.REACT_APP_BASE_URL}add_user?username=${username}&password=${password}&role=${option}`
    );

    // yield put(RegistationRequest({ isLoading: true }));
    const data = response.data;
  
    if (data.error === 0) {
      yield put(RegistrationSuccess({ registation: true, response: data }));
    } else {
      yield put(RegistrationError({ registation: false, error: data }));
    }
  } catch (error) {
    yield put(RegistrationError({ registation: false, error: error }));
  }
}

export function* registrationRequest() {
  yield takeLatest(actions.Registation_Request, registrationSaga);
}