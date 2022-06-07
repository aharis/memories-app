import React from "react";
import Home from "./components/Home";
import { BrowserRouter, Switch, Route, Redirect } from "react-router-dom";
import Signup from "./user/signup/Signup";
import Signin from "./user/signin/Signin";
import PrivateRoute from "./user/PrivateRoute";
import Navbar from "./components/Navbar/Navbar";
import { Container } from "@material-ui/core";
import PostDetails from "./components/PostDetails/PostDetails";

const App = () => {
    const user = JSON.parse(localStorage.getItem('profile'))
    return (
        <BrowserRouter>
            <Container maxWidth="xl">
                <Navbar />
                <Switch>
                    {/* <Route path='/' exact component={() => <Redirect to='/signin' />} /> */}
                    <Route  path='/signin' exact component={() => ( !user ? <Signin /> : <Redirect to='/' /> )} />
                    <Route  path='/signup' exact component={Signup} />
                    
                    <Route  path='/' exact component={Home} />
                    <Route path='/posts/:id' exact component={() => ( !user ? <Signin /> : <PostDetails /> )} />
                </Switch>
            </Container>
        </BrowserRouter>
    );
}

export default App;