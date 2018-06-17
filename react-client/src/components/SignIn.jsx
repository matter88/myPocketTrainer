import RaisedButton from 'material-ui/RaisedButton';
import TextField from 'material-ui/TextField';
import React from 'react';
import { connect } from 'react-redux'
import { firebaseApp } from '../config/firebase.js';
import { Link, Redirect } from 'react-router-dom'

class SignIn extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            email: '',
            password: '',
            error: {
                message: ''
            },
        }
        this.changeEmailState = this.changeEmailState.bind(this)
        this.changePasswordState = this.changePasswordState.bind(this)
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
        const { email, password } = this.state
        firebaseApp.auth().signInWithEmailAndPassword(email, password)
            .catch((error) => {
                this.setState({
                    error: error
                })
            })
    }

    render() {
        const { email } = this.props
        if (email) {
            return (
                <Redirect to={'/Journal'} />
            )
        }
        return (
            <div className='loginForm'>

                <TextField
                    inputStyle={{ color: '#00D77E' }}
                    hintText="Enter your email"
                    floatingLabelText="Email"
                    onChange={this.changeEmailState}
                />
                <br />
                <TextField
                    inputStyle={{ color: '#00D77E' }}
                    type="password"
                    hintText="Enter your Password"
                    floatingLabelText="Password"
                    onChange={this.changePasswordState}
                />
                <br />
                <RaisedButton label="Sign In" primary={true} onClick={() => this.signIn()} />
                <div>{this.state.error.message}</div>
                <div><Link to={'/signUp'}>Not registered? Sign up!</Link></div>

            </div>
        )
    }
}


const mapStateToProps = (state) => {
    console.log('sign in', state.reducer)
    const { email } = state.reducer
    return {
        email
    }
}

export default connect(mapStateToProps, null)(SignIn);
