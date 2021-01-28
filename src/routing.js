import React from 'react';
import {Switch, Route, BrowserRouter} from "react-router-dom";
import Authentication from "./components/authentication";

// pages
import Dashboard from "./pages/dashboard";
import Luna from "./pages/luna";
import Viewer from "./pages/viewer";


export default () => (
    <BrowserRouter>
        <Authentication>
            <Switch>
                <Route path="/dashboard">
                    <div className="App">
                        <Dashboard/>
                    </div>
                </Route>
                <Route path="/luna">
                    <div className="App">
                        <Luna/>
                    </div>
                </Route>
                <Route path="/connect">
                    <Viewer/>
                </Route>
            </Switch>
        </Authentication>
    </BrowserRouter>
)