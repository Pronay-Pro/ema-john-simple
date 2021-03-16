import React, { useContext } from "react";
import { Redirect, Route } from "react-router";
import { userContext } from "../../App";

const PrivateRoute = ({children , ...rest}) => {
    const [logInUser , setLogInUser] = useContext(userContext)
  return (
    <div>
      <Route
        {...rest}
        render={({ location }) =>
         logInUser.email ? (
            children
          ) : (
            <Redirect
              to={{
                pathname: "/login",
                state: { from: location },
              }}
            />
          )
        }
      />
    </div>
  );
};

export default PrivateRoute;
