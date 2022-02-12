import React from 'react';
import {
    BrowserRouter as Router,
    Switch,
    Route
} from "react-router-dom";

import { AuthenticationPage } from '../components/authenticationpage/AuthenticationPage';
import { HomePage } from '../components/homepage/HomePage';

export const AppRouter = () => {
  return (
    <Router>
        <div>
            <Switch>
                <Route path="/" exact component={HomePage} />
                <Route path="/authentication" exact component={AuthenticationPage} />
            </Switch>
        </div>
    </Router>
  )
}
