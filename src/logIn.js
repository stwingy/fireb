import React, { Component } from 'react';
import {firebase,googleAuth} from './firebase'
class logIn extends Component {
    state={
        status:false
    }
    componentDidMount(){
        firebase.auth().onAuthStateChanged((user)=>{
            this.setState(
                {status: user?false:true}
            )
        })
    }
    signIn=()=>{
firebase.auth().signInWithPopup(googleAuth)
    }
    signOut=()=>{
        firebase.auth().signOut()
    }
    render() {
        return (
            <div>
   {
       this.state.status ?
       <button onClick ={this.signIn}>Login</button>:
       <button onClick ={this.signOut}>LogOut</button>   
   }

             
          
            </div>
        );
    }
}

export default logIn;