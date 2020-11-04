import { combineReducers } from "redux";
import PollListreducer from "./PollListreducer";
import Registrationreducer from "./Registrationreducer";
import Loginreducer from "./Loginreducer";
import CreateNewPollreducer from "./AddNewPollreducer";
import UpdateTitlereducer from "./UpdatePollTitle";
import DeletePollreducer from "./DeletePoll";
import DeleteOptionreducer from "./DeleteOption";
import AddNewOptionreducer from "./AddNewOption";
import PollReducer from './PollReducer';

const rootReducer = combineReducers({
  Registrationstatus: Registrationreducer,
  Loginstatus: Loginreducer,
  PollListstatus: PollListreducer,
  CreateNewPollstatus: CreateNewPollreducer,
  UpdateTitlestatus: UpdateTitlereducer,
  DeletePollstatus: DeletePollreducer,
  DeleteOptionstatus: DeleteOptionreducer,
  AddNewOptionstatus: AddNewOptionreducer,
  PollStatus:PollReducer,
});

export default rootReducer;