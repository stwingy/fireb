import React, { Component } from 'react';
import LogIn from './logIn'
import Signin from './signin'
import { BrowserRouter,Route,Link,NavLink,Switch,Redirect } from 'react-router-dom';
class App extends Component {
  render() {
    return (
      <BrowserRouter>
           <div className="App">

 <Route exact path='/sign' component={Signin}/>
      </div>
      </BrowserRouter>
 
    );
  }
}

export default App;
