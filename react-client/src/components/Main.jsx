import React from 'react';
import { Switch, Route } from 'react-router-dom';
import SignIn from './SignIn.jsx';
import SignUp from './SignUp.jsx';
import Profile from './UserStats.jsx';
import Journal from './DailySummary.jsx';
import USDAsearch from './USDAsearch.jsx';
import CreateFood from './CreateFood.jsx';

const Main = () => (
    <main>
        <Switch>
            <Route path='/SignUp' component={SignUp} />
            <Route path='/SignIn' component={SignIn} />
            <Route exact path='/' component={USDAsearch} />
            <Route path='/Profile' component={Profile} />
            <Route path='/Journal' component={Journal} />
            <Route path='/Create' component={CreateFood} />
        </Switch>
    </main>
)

export default Main;