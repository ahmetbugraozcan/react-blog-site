import React, { Component } from "react";
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import "./styles/App.css";
import { inject, observer } from "mobx-react";
import Signup from "./screens/Signup";
import Login from "./screens/Login";
import HomePage from "./screens/HomePage";
import Navbar from "./components/modal/Navbar";
import AuthService from "./services/AuthService";
import BlogDetails from "./screens/BlogDetails";
import UserDetails from "./screens/UserDetails";
import AddBlog from "./screens/AddBlog";


@inject("UserStore")
@observer
class App extends Component {
    constructor(props) {
        super(props);
        var currentUser =  AuthService.getCurrentUser();
        if (currentUser != undefined) {
            this.props.UserStore.setUser(currentUser);
        } 

    }

    render() {
        return (
            <Router>
                <div className="App">
                    <Navbar />
                    <div className="content">
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
                            <Route exact path="/blog/:id">
                                <BlogDetails />
                            </Route> 
                            <Route exact path="/user/:id">
                                <UserDetails />
                            </Route> 
                            <Route path="/add-blog">
                                <AddBlog />
                            </Route>
                        </Switch>
                    </div>
                </div>
            </Router>
        );
    }
}

export default App;