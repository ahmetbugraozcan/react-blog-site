import React, { Component } from "react";
import {BrowserRouter as Router, Route, Switch} from 'react-router-dom';
import logo from "./logo.svg";
import "./App.css";
import AuthService from "./services/AuthService";

class App extends Component {
    constructor(props) {
        super(props);
        this.state = { apiResponse: "" };
    }

    render() {
        return (
            <div className="App">
                <header className="App-header">
                    <img src={logo} className="App-logo" alt="logo" />
                    <h1 className="App-title">Welcome to React</h1>
                    <button onClick={()=>{
                        AuthService.callAPI('/').then((res)=>{
                            console.log(res);
                            this.setState({apiResponse: res});
                        });
                        }}>Login Page</button>
                </header>
                <p className="App-intro">{this.state.apiResponse}</p>
            </div>
        );
    }
}

export default App;