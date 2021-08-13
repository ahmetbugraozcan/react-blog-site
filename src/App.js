import React, { Component } from "react";
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import logo from "./logo.svg";
import "./App.css";
import AuthService from "./services/AuthService";
import { inject, observer } from "mobx-react";
import Signup from "./screens/Signup";
import Login from "./screens/Login";
import HomePage from "./screens/HomePage";
import Navbar from "./components/modal/Navbar";


@inject("UserStore")
@observer
class App extends Component {
    render() {
        return (
            <Router>
                <div className="App">
                    <Navbar />
                    <div className="content">
                        <Switch>
                            <Route exact path="/">
                                <HomePage username={'aaa'} />
                            </Route>
                            <Route path="/signup">
                                <Signup />
                            </Route>
                            <Route path="/login">
                                <Login />
                            </Route>
                        </Switch>
                    </div>
                </div>
            </Router>
        );
    }
}

export default App;