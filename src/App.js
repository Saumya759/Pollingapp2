import React from "react";
import Registration from "./Components/Registration/RegistrationForm";
import Login from "./Components/Login/Login";
import Dashboard from './Components/Dashboard/Dashboard';
import AddPoll from './Components/AddPoll/AddPoll';
import EditPoll from './Components/EditPoll/EditPoll';
import GuestDashboar from './Components/GuestDashboard/GuestDashboard';
import PrivateRouting from './PrivateRouting';
import { HashRouter, Route, Switch } from "react-router-dom";
import "./App.css";


const App = ()=>{
  return (
    <HashRouter>
      <Switch>
        <Route exact path="/" component={Login} >{
          // localStorage.getItem("token") ? <Dashboard /> : <Redirect to="/" />
        }</Route>
        {/* <Route exact path="/login" component={Login} /> */}
        <Route path="/registration" component={Registration} />
        <PrivateRouting path="/admindashboard" component={Dashboard} />
        <PrivateRouting path="/addpoll" component={AddPoll} />
        <PrivateRouting path="/editpoll/:id"component={EditPoll}/>
        <Route path="/pollpage"component={GuestDashboar}/>
      </Switch>
    </HashRouter>
  );
}

export default App;