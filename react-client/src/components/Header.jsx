import React from "react";
import { Link, Redirect } from "react-router-dom";
import AppBar from "material-ui/AppBar";
import { firebaseApp } from "../config/firebase.js";
import { connect } from "react-redux";
import MenuItem from "material-ui/MenuItem";
import Drawer from "material-ui/Drawer";

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
        console.log(this.state);
        this.setState({
          signedIn: false
        });
      });
  }

  render() {
    const { email } = this.props;
    let signUp, profile;
    let signIn;
    let signOut;
    let redirect;
    let dailySummary;
    if (!email) {
      signUp = 
       
          <Link to="/SignUp">Sign Up</Link>
       
      ;
      signIn = 
        
          <Link to="/SignIn">Login</Link>
        
      ;
    } else {
      signOut = <li onClick={() => this.signOut()}>SignOut</li>;
      dailySummary = 
          <Link to="/Journal">Journal</Link>
    
      ;
      profile = 
   
          <Link to="/Profile">Profile</Link>

      ;
    }

    return (
      <header>
        <nav>
        
            
              <Link to="/">Home</Link>
           
            {signIn}
            {dailySummary}
            {profile}
           
            <Link to="/Create">Create</Link>
          
           
              <Link to="/roster">Roster</Link>
           
           
              <Link to="/schedule">Schedule</Link>
        
            
            {signOut}
            
          
        </nav>
      </header>
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
