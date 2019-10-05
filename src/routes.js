import React from 'react';
import { BrowserRouter, Route, Switch } from 'react-router-dom';

import Login from './pages/login';
import Dashboard from './pages/dashboard';
import Spot from './pages/spot';

export default function Router(){
    return (
        <>
        <BrowserRouter>
            <Switch>
                <Route path='/' exact component={Login} />
                <Route path='/dashboard' component={Dashboard} />
                <Route path='/spot' component={Spot} />
            </Switch>
        </BrowserRouter>
        </>
    );
}