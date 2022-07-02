import React from "react";
import { Route } from "react-router-dom";
import Profile from "./profile";
import Login from "./login";


function Routes({ match }) {
    return (
       <>
        <Route exact path={match.url + "/profile"} component={Profile} />
        <Route exact path={match.url + "/login"} component={Login} />
       </>
    );
}

export default Routes;
