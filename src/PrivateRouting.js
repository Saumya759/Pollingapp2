import React from "react";
import { Route, Redirect } from "react-router-dom";

const PrivateRouting = ({ component: Component, path, ...rest }) => {
  return (
    <Route
      path={path}
      {...rest}
      render={(props) =>
        localStorage.getItem("userType") ? (
          <Component {...props} />
        ) : (
          <Redirect to="/" />
        )
      }
    />
  );
};

export default PrivateRouting;