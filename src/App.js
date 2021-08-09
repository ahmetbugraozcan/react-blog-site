import React, { Component } from "react";
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import logo from "./logo.svg";
import "./App.css";
import AuthService from "./services/AuthService";
import Signup from "./screens/signup";

class App extends Component {
    constructor(props) {
        super(props);
        this.state = { apiResponse: "" };
    }

    render() {
        return (
            <Signup/>
            // <Router>
            //     <div className="content">
            //         <Switch>

            //             <Route exact path="/">
            //                 <Home />
            //             </Route>

            //             <Route path="/create">
            //                 <Create />
            //             </Route>

            //             <Route path="/blogs/:id">
            //                 <BlogDetails />
            //             </Route>

            //             <Route path="*">
            //                 <NotFound />
            //             </Route>
                        
            //         </Switch>
            //     </div>
            // </Router>
        );
    }
}

export default App;