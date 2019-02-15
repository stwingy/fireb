import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import {Provider} from 'react-redux'
import {createStore,applyMiddleware} from 'redux';
//import promiseMiddleware from 'redux-promise';
import reducers from './reducers'   
import thunk from 'redux-thunk'
import {firebase} from './firebase'
import Routes from './Routes'
import Header from './Header'
import Home from './components/Home'
import About from './components/About'
import Menu from './components/Menu'
import Contact from './components/Contact'
import { BrowserRouter,Route } from 'react-router-dom';

const store = createStore(reducers,applyMiddleware(thunk))
const App=(props)=>{
    console.log(props.user)
    return(
        
       
        
<BrowserRouter>
<div>
<Header/>
<Route path="/home" exact component={Home}/>
<Route path="/aboutus" exact component={About}/>
<Route path="/menu" exact component={Menu}/>
<Route path="/contactus" exact component={Contact}/>
{/* <Routes {...props}/> */}
</div>
</BrowserRouter>


    )
}


firebase.auth().onAuthStateChanged((user)=>{
    const currentUser=null
    if(user){
        //console.log(user)
        
    }
    ReactDOM.render(
        <Provider store={store}>
    <App user={{...user}}/>
    </Provider>
    , document.getElementById('root'));
})
       


// firebase.auth().onAuthStateChanged((user)=>{
//     if(user){
        
//         ReactDOM.render(<div><App user={user} /></div>, document.getElementById('root'));
//     }
