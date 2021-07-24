import React, { Component } from 'react'
import { Router, Switch, Route } from 'react-router-dom';
import { createBrowserHistory } from 'history';
import Home from './components/Home';
import BuyerPersona from './components/BuyerPersona';
import Insights from './components/Insights';

export const history = createBrowserHistory();
export default class App extends Component {
    render() {
        return (
            <Router history={history}>
                <Switch>
                    <Route exact path="/" component={Home}></Route>
                    <Route path="/buyer-persona" component={BuyerPersona}></Route>
                    <Route path="/insights" component={Insights}></Route>
                </Switch>
            </Router>
        )
    }
}
