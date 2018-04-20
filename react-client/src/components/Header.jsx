import React from 'react';
import { Link, Redirect } from 'react-router-dom';
import { createStore } from 'redux';
import AppBar from 'material-ui/AppBar';
import { firebaseApp } from '../config/firebase.js';
import { connect } from 'react-redux';
import Popover from 'material-ui/Popover';
import Menu from 'material-ui/Menu';
import RaisedButton from 'material-ui/RaisedButton';
import MenuItem from 'material-ui/MenuItem';
import Drawer from 'material-ui/Drawer';
import { logUser, logUserOUT } from '../actions/index.js';
import reducer from '../reducers';

class Header extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      open: false,
      error: {
        message: ''
      },
      signedIn: true
    }
    this.handleToggle = this.handleToggle.bind(this)
    this.handleClick = this.handleClick.bind(this)
    this.handleRequestClose = this.handleRequestClose.bind(this)
  }



  handleClick(event) {
    // This prevents ghost click.
    event.preventDefault();

    this.setState({
      open: true,
      anchorEl: event.currentTarget,
    });
  };

  handleToggle() {
    this.setState({ open: !this.state.open });
  }

  handleRequestClose() {
    this.setState({
      open: false,
    });
  };

  signOut() {
    firebaseApp.auth().signOut()
      .catch(function (error) {
        this.setState({
          error: error
        })
      })
      .then(() => {
        console.log(this.state)
        this.setState({
          signedIn: false
        })

      })
  }

  render() {
    const { email } = this.props;
    let signUp, profile;
    let signIn;
    let signOut;
    let redirect;
    let dailySummary;
    if (!email) {
      signUp = <MenuItem onClick={this.handleRequestClose}><Link to='/SignUp'>Sign Up</Link></MenuItem>
      signIn = <MenuItem onClick={this.handleRequestClose}><Link to='/SignIn'>Login</Link></MenuItem>
    } else {
      signOut = <MenuItem onClick={() => this.signOut()}>SignOut</MenuItem>
      dailySummary = <MenuItem onClick={this.handleRequestClose}><Link to='/Journal'>Journal</Link></MenuItem>
      profile = <MenuItem onClick={this.handleRequestClose}><Link to='/Profile'>Profile</Link></MenuItem>

    }



    return (
      <header >

        <AppBar  className="appBar" title="MacroTracker" onClick={this.handleToggle} >
          <Drawer
            docked={false}
            width={200}
            open={this.state.open}
            onRequestChange={(open) => this.setState({ open })}
          >
            <MenuItem onClick={this.handleRequestClose}><Link to='/'>Home</Link></MenuItem>
            {signIn}
            {dailySummary}
            {profile}
            {signOut}
          </Drawer>

        </AppBar>

      </header>
    )
  }
}

const mapStateToProps = (state) => {
  const { email } = state.reducer;
  return {
    email
  }
}


export default connect(mapStateToProps, null)(Header);