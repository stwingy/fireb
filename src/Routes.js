import React, { Component } from 'react';
import Signin from './signin'
import Home from './components/Home'
import Stuff from './Stuff'
import {Route,Link,NavLink,Switch,Redirect } from 'react-router-dom';
class Routes extends Component {
    render() {
        console.log(this.props)
        return (
           <Switch>
               <Route path="/sign-in" exact component={Signin}/>
               <Route path="/stuff" exact component={Stuff}/>
               <Route path="/" exact component={Home}/>
           </Switch>
        );
    }
}

export default Routes;