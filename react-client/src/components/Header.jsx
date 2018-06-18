import React from "react";
import { Link } from "react-router-dom";
import { firebaseApp } from "../config/firebase.js";
import { connect } from "react-redux";
import { Nav, Button } from "react-bootstrap";
import { searchUSDA } from "../actions/searchActions.js";
import store from "../reducers/store.js";
import { FormGroup, FormControl } from "react-bootstrap";
import ResultsListUSDA from './ResultsListUSDA.jsx';

class Header extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      open: false,
      error: {
        message: ""
      },
      signedIn: true,
      searchTerm: ""
    };
    this.handleToggle = this.handleToggle.bind(this);
    this.handleClick = this.handleClick.bind(this);
    this.handleRequestClose = this.handleRequestClose.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.handleChange = this.handleChange.bind(this);
  }

  handleClick(event) {
    // This prevents ghost click.
    event.preventDefault();
    this.setState({
      open: true,
      anchorEl: event.currentTarget
    });
  }

  handleChange(event) {
    event.preventDefault();
    this.setState({
      searchTerm: event.target.value
    });
  }

  handleSubmit() {
    store.dispatch(searchUSDA(this.state.searchTerm));
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
    const { items } = this.props;
    let profile;
    let signIn;
    let signOut;
    let signUp;
    let dailySummary;
    if (items) {
      if (Object.keys(items).length) {
        console.log(items)
        return (
        <div>
          <ResultsListUSDA items={items.list.item}/>
        </div>
      )
      }
      
    } 
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
      <div>
        <div className="header-header">
          <Nav className="headerLink" bsStyle="pills">
            <Link className="headerLink" to="/">
              Home
            </Link>
            {profile}
            {signIn}
            {dailySummary}
            {signOut}
          </Nav>
          <span className="searchBar">
            
            <form>
              <FormGroup controlId="formBasicText">
                <FormControl
                  type="text"
                  value={this.state.value}
                  placeholder="What are we eating today?"
                  onChange={this.handleChange}
                />
                <FormControl.Feedback />
              </FormGroup>
            </form>
          </span>
          <span>
            <Button
              onClick={this.handleSubmit}
              onChange={this.handleChange}
              className="header-button1"
              bsStyle="primary"
              bsSize="small"
            >
              Search
            </Button>
          </span>
        </div>
        {/* <ResultsListUSDA/> */}
      </div>
    );
  }
}

const mapStateToProps = state => {
  const { email } = state.reducer;
  const { items } = state.headerSearchReducer;
  return {
    email,
    items
  };
};

export default connect(
  mapStateToProps,
  null
)(Header);
