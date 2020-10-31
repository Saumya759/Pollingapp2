import { fork, all } from "redux-saga/effects";
import { registrationRequest } from "./Registrationsaga";
import { loginRequest } from "./Loginsaga";
import { PollListRequest } from "./PollListsaga";
import { CreatePollRequest } from "./AddNewPollSaga";
import { UpdateTitleRequest } from "./TitleUpdateSaga";
import { DeletePollRequest } from "./DeletePollSaga";
import { DeleteOptionRequest } from "./DeleteOptionSaga";
import { AddNewOptionRequest } from "./AddNewOptionSaga";
import { PollRequest } from './PollSaga';

function* watchAllSaga() {
  {
    yield all([
      fork(registrationRequest),
      fork(loginRequest),
      fork(PollListRequest),
      fork(CreatePollRequest),
      fork(UpdateTitleRequest),
      fork(DeletePollRequest),
      fork(DeleteOptionRequest),
      fork(AddNewOptionRequest),
      fork(PollRequest),
    ]);
  }
}

export default watchAllSaga;
