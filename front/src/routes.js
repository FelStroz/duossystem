import React from "react";
import {
    BrowserRouter as Router,
    Switch,
    Route,
    Redirect
} from "react-router-dom";
import AdminPage from './pages/Admin';

export default function Routes() {
    return (
        <Router>
            <Switch>
                <Redirect exact from="/" to="/admin" />
                <Route path="/admin">
                    <AdminPage/>
                </Route>
                <Route path="/">
                    Não encontrado 404
                </Route>
            </Switch>
        </Router>
    )
}
