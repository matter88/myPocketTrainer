import React from "react";
import { connect } from "react-redux";
import { firebaseApp } from "../config/firebase.js";
import { Link, Redirect } from "react-router-dom";
import { FormControl, Button } from "react-bootstrap";

class SignIn extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      email: "",
      password: "",
      error: {
        message: ""
      }
    };
    this.changeEmailState = this.changeEmailState.bind(this);
    this.changePasswordState = this.changePasswordState.bind(this);
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
    const { email, password } = this.state;
    firebaseApp
      .auth()
      .signInWithEmailAndPassword(email, password)
      .catch(error => {
        this.setState({
          error: error
        });
      });
  }

  render() {
    const { email } = this.props;
    if (email) {
      return <Redirect to={"/Journal"} />;
    }
    return (
      <div className="login-form">
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
        <Button onClick={() => this.signIn()} bsStyle="primary" bsSize="small">
          Log in
        </Button>
        <br />
        {/* <RaisedButton label="Sign In" primary={true} } /> */}
        <div>{this.state.error.message}</div>
        <div>
          <Link to={"/signUp"}>Not registered? Sign up!</Link>
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
)(SignIn);
