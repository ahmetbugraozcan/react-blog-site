import React, { Component } from "react";
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import logo from "./logo.svg";
import "./App.css";
import AuthService from "./services/AuthService";
import Signup from "./screens/Signup";
import Login from "./screens/Login";
import HomePage from "./screens/HomePage";

class App extends Component {

    render() {
        return (
            <Router>
                <Switch>
                <Route exact path="/">
                        <HomePage />
                    </Route>
                    <Route path="/signup">
                        <Signup />
                    </Route>
                    <Route path="/login">
                        <Login />
                    </Route>
                </Switch>
            </Router>
        );
    }
}

export default App;