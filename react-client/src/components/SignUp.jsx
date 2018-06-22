import React from "react";
import { Redirect } from "react-router-dom";
import { firebaseApp } from "../config/firebase.js";
import { FormControl, Button } from "react-bootstrap";
import { connect } from "react-redux";
import { Link } from "react-router-dom";

class SignUp extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      email: null,
      password: "",
      emailSignIn: null,
      passwordSignIn: "",
      error: {
        message: ""
      }
    };
    this.changeEmailState = this.changeEmailState.bind(this);
    this.changePasswordState = this.changePasswordState.bind(this);
    this.changeEmailStateSignIn = this.changeEmailStateSignIn.bind(this);
    this.changePasswordStateSignIn = this.changePasswordStateSignIn.bind(this);
  }

  changeEmailStateSignIn(event) {
    this.setState({
      emailSignIn: event.target.value
    });
  }

  changePasswordStateSignIn(event) {
    this.setState({
      passwordSignIn: event.target.value
    });
  }

  signUp() {
    const { email, password } = this.state;
    firebaseApp
      .auth()
      .createUserWithEmailAndPassword(email, password)
      .catch(error => {
        this.setState({
          error: error
        });
      });
  }

  changeEmailState(event) {
    this.setState({
      email: event.target.value
    });
  }

  changePasswordState(event) {
    this.setState({
      password: event.target.value
    });
  }

  signIn() {
    const { emailSignIn, passwordSignIn } = this.state;
    firebaseApp
      .auth()
      .signInWithEmailAndPassword(emailSignIn, passwordSignIn)
      .catch(error => {
        this.setState({
          error: error
        });
      });
  }

  render() {
    console.log("signup props", this.props);
    const { email } = this.props;
    let redirect;
    if (email) {
      console.log("redirect invoked");
      redirect = <Redirect to="/Profile" />;
    }
    return (
      <div className="signupForm">
        {redirect}
        <div className="sign-up">
          <FormControl
            type="first-name"
            // value={this.state.value}
            placeholder="First Name"
            // onChange={this.handleChange}
            onChange={this.changeEmailState}
          />
          <FormControl
            type="last-name"
            // value={this.state.value}
            placeholder="Last Name"
            // onChange={this.handleChange}
            onChange={this.changePasswordState}
          />
          <FormControl
            type="email"
            // value={this.state.value}
            placeholder="Email"
            // onChange={this.handleChange}
            onChange={this.changeEmailState}
          />
          <FormControl
            type="password"
            // value={this.state.value}
            placeholder="Password"
            // onChange={this.handleChange}
            onChange={this.changePasswordState}
          />
          <Button
            bsStyle="primary"
            bsSize="small"
            onClick={() => this.signUp()}
          >
            Sign Up
          </Button>
          <div>{this.state.error.message}</div>
          <div>
            <Link to={"/SignIn"}>Already a user? Sign in instead.</Link>
          </div>
        </div>
      </div>
    );
  }
}

const mapStateToProps = state => {
  const { email } = state.reducer;
  return {
    email
  };
};

export default connect(
  mapStateToProps,
  null
)(SignUp);
