import React from "react";
import { Route, Routes  } from "react-router-dom";
import Profile from "./profile";
import Login from "./login";


function AccountsRoutes( ) {

    return (
        <>
            <Routes>

                <Route path=":login" element={<Login />} />
                <Route path=":profile" element={<Profile />} />


            </Routes>
        </>
    );
}

export default AccountsRoutes;