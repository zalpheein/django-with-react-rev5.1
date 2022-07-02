import React from "react";
import { Route } from "react-router-dom";
import Profile from "./profile";
import Login from "./login";
import Signup from "./signup";


function Routes({ match }) {
    return (
       <>
        <Route exact path={match.url + "/profile"} component={Profile} />
        <Route exact path={match.url + "/login"} component={Login} />
        <Route exact path={match.url + "/signup"} component={Signup} /> {/* 회원가입 url */}
        
       </>
    );
}

export default Routes;
