import React from "react";
import { Link, Redirect } from "react-router-dom";
import { firebaseApp } from "../config/firebase.js";
import { connect } from "react-redux";
import USDAsearch from "./USDAsearch.jsx";
import { Nav } from "react-bootstrap";

class Header extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      open: false,
      error: {
        message: ""
      },
      signedIn: true
    };
    this.handleToggle = this.handleToggle.bind(this);
    this.handleClick = this.handleClick.bind(this);
    this.handleRequestClose = this.handleRequestClose.bind(this);
  }

  handleClick(event) {
    // This prevents ghost click.
    event.preventDefault();

    this.setState({
      open: true,
      anchorEl: event.currentTarget
    });
  }

  handleToggle() {
    this.setState({ open: !this.state.open });
  }

  handleRequestClose() {
    this.setState({
      open: false
    });
  }

  signOut() {
    firebaseApp
      .auth()
      .signOut()
      .catch(function(error) {
        this.setState({
          error: error
        });
      })
      .then(() => {
        this.setState({
          signedIn: false
        });
      });
  }

  render() {
    const { email } = this.props;
    let profile;
    let signIn;
    let signOut;
    let signUp;
    let dailySummary;
    if (!email) {
      signUp = (
        <Link className="headerLink" to="/SignUp">
          Sign Up
        </Link>
      );
      signIn = (
        <Link className="headerLink" to="/SignIn">
          Login
        </Link>
      );
    } else {
      signOut = (
        <Link className="headerLink" to="/" onClick={() => this.signOut()}>
          SignOut
        </Link>
      );
      dailySummary = (
        <Link className="headerLink" to="/Journal">
          Journal
        </Link>
      );
      profile = (
        <Link className="headerLink" to="/Profile">
          Profile
        </Link>
      );
    }

    return (
      <div className="test">
      <div>
         <Nav className="headerLink" bsStyle="pills" activeKey={1}>
        <Link className="headerLink" to="/">
          Home
        </Link>
        {profile}
        {signIn}
        {dailySummary}
        {signOut}
        <div>
      <USDAsearch className="searchBar" />
      </div>
      </Nav>
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
)(Header);
