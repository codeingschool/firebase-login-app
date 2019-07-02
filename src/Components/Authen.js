import React, { Component } from 'react'
import Firebase from "./Firebaseconfig"
var uuid = require('uuid-v4');


export default class Authen extends Component {

    constructor(props){
        super(props);

        this.state = {
            uid : uuid(),
            err : ""
        }
    }

    login=()=>{
        const email = this.refs.email.value;
        const pass = this.refs.password.value;
        console.log(email, pass);

        const auth = Firebase.auth();

        //for log in
        const promise = auth.signInWithEmailAndPassword(email,pass);

        
        
        // handle log in promises
        promise.then(()=>{
            var lout = document.getElementById("logout");
            lout.classList.remove("hide");
        })

        promise.catch((e)=>{
            var err = e.message;
            console.log(err)
        })
        
        var err = "Welcome our appication"
        this.setState({
            err:err
        })
    }

    signin=()=>{
        const email = this.refs.email.value;
        const pass = this.refs.password.value;
        console.log(email,pass);

        const auth = Firebase.auth()


        
        var actionCodeSettings = {
            // URL you want to redirect back to. The domain (www.example.com) for this
            // URL must be whitelisted in the Firebase Console.
            url: 'https://www.example.com/finishSignUp?cartId=1234',
            // This must be true.
            handleCodeInApp: true,
            iOS: {
            bundleId: 'com.example.ios'
            },
            android: {
            packageName: 'com.example.android',
            installApp: true,
            minimumVersion: '12'
            },
            dynamicLinkDomain: 'example.page.link'
        };
        Firebase.auth().sendSignInLinkToEmail(email, actionCodeSettings)
        .then(function() {
        // The link was successfully sent. Inform the user.
        // Save the email locally so you don't need to ask the user for it again
        // if they open the link on the same device.
        window.localStorage.setItem('emailForSignIn', email);
        })
        .catch(function(error) {
        // Some error occurred, you can inspect the code: error.code
        console.log(error)
        });


        // need to create a user

        const promise = auth.createUserWithEmailAndPassword(email,pass);

        promise.then(() =>{
            var err = "Welcome "+ email; // to show the user in poge
            // push data (email & password) in database
            Firebase.database().ref("users/" + this.state.uid).set({
               email : email,
               pass : pass 
            })
            
            this.setState({
                err : err
            })
        }).catch(e =>{
            var err = e.message;
            this.setState({
                err:err
            })
        })

    }


    logout=()=>{

        //logout
        Firebase.auth().signOut()

        var lout = document.getElementById("logout")
        var err = "Thanks for using our application"
        lout.classList.add("hide");
        this.setState({
            err:err
        })
    }

    render() {
        // console.log(Firebase);
        
        return (
            <div>
                <input type="email" placeholder="Enter your email" id="email" ref="email" required/><br/>
                <input type="password" placeholder="Enter your password" id="pass" ref="password" required/><br/>
                <p>{this.state.err}</p>
                <button onClick={this.login}>Log In</button>
                <button onClick={this.signin}>Sign In</button>
                <button onClick={this.logout} className="hide" id="logout">Log Out</button>
            </div>
        )
    }
}
