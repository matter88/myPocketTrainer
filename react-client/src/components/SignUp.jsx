import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import AppBar from 'material-ui/AppBar';
import RaisedButton from 'material-ui/RaisedButton';
import TextField from 'material-ui/TextField';
import React from 'react';
import axios from 'axios';
import { Link, Redirect } from 'react-router-dom';
import { connect } from 'react-redux';
import { firebaseApp } from '../config/firebase.js';

class SignUp extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            email: null,
            password: '',
            emailSignIn: null,
            passwordSignIn: '',
            error: {
                message: ''
            },
        }
        this.changeEmailState = this.changeEmailState.bind(this);
        this.changePasswordState = this.changePasswordState.bind(this)
        this.changeEmailStateSignIn = this.changeEmailStateSignIn.bind(this);
        this.changePasswordStateSignIn = this.changePasswordStateSignIn.bind(this)
    }

    changeEmailStateSignIn(event) {
        this.setState({
            emailSignIn: event.target.value
        })
    }

    changePasswordStateSignIn(event) {
        this.setState({
            passwordSignIn: event.target.value
        })
    }

    signUp() {
        const { email, password } = this.state
        firebaseApp.auth().createUserWithEmailAndPassword(email, password)
        .catch((error) => {
            this.setState({
                error: error
            })
        })
    }

    changeEmailState(event) {
        this.setState({
            email: event.target.value
        })
    }

    changePasswordState(event) {
        this.setState({
            password: event.target.value
        })
    }

    signIn() {
        const { emailSignIn, passwordSignIn } = this.state
        firebaseApp.auth().signInWithEmailAndPassword(emailSignIn, passwordSignIn)
        .catch((error) => {
            this.setState({
                error: error
            })
          })
    }



    render() {
        console.log('signup props',this.props)
        const { email } = this.props;
        let redirect;
        if (email) {
            console.log("redirect invoked")
            redirect = <Redirect to='/Profile'/>
        }
        return(
            <div>
            {/* <div className = 'loginForm'>
              <div>
               <TextField
               inputStyle={{ color: '#00D77E' }}
                 hintText="Enter your email"
                 floatingLabelText="Email"
                 onChange={this.changeEmailStateSignIn}
                 />
               <br/>
                 <TextField
                 inputStyle={{ color: '#00D77E' }}
                   type="password"
                   hintText="Enter your Password"
                   floatingLabelText="Password"
                   onChange={this.changePasswordStateSignIn}
                   />
                 <br/>
                 <RaisedButton label="Sign In" primary={true}  onClick={() => this.signIn()}/>
                 <div>{this.state.error.message}</div>
                 <div><Link to={'/'}>Not registered? Sign up!</Link></div>
             </div>
          </div>
          <hr/> */}
        <div className = 'signupForm'>
         {redirect}
            <div>
             <TextField
               hintText="Enter your First Name"
               floatingLabelText="First Name"
               inputStyle={{ color: '#00D77E' }}

               />
             <br/>
             <TextField
               hintText="Enter your Last Name"
               floatingLabelText="Last Name"
               inputStyle={{ color: '#00D77E' }}

               />
             <br/>
             <TextField
               hintText="Enter your Email"
               type="email"
               floatingLabelText="Email"
               inputStyle={{ color: '#00D77E' }}

               onChange={this.changeEmailState}
               />
             <br/>
             <TextField
               type = "password"
               hintText="Enter your Password"
               floatingLabelText="Password"
               inputStyle={{ color: '#00D77E' }}

               onChange={this.changePasswordState}
               />
             <br/>

           <RaisedButton label="Sign Up" primary={true} onClick={() => this.signUp()}/>
           <div>{this.state.error.message}</div>
           <div><Link to={'/SignIn'}>Already a user? Sign in instead.</Link></div>
            </div>
        </div>
        </div>
        )
    }
}

const mapStateToProps = (state) => {
    console.log('sign up state', state)
    const { email } = state.reducer;
    return {
        email
    }
}

export default connect(mapStateToProps, null)(SignUp);
