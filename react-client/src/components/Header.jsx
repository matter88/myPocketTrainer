import React from "react";
import { Link } from "react-router-dom";
import { firebaseApp } from "../config/firebase.js";
import { connect } from "react-redux";
import { Nav, Button } from "react-bootstrap";
import { searchUSDA, submitNDBNO } from "../actions/searchActions.js";
import store from "../reducers/store.js";
import { FormGroup, FormControl } from "react-bootstrap";
import ResultsListUSDA from "./ResultsListUSDA.jsx";
import NdbnoResultsList from "./NdbnoResultsList.jsx";

class Header extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      open: false,
      signedIn: true,
      searchTerm: "",
      ndbno: "",
      itemName: "",
      nutrients: []
    };
    this.handleClick = this.handleClick.bind(this);
    this.handleRequestClose = this.handleRequestClose.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.handleChange = this.handleChange.bind(this);
    this.handleResultListClick = this.handleResultListClick.bind(this);
    this.handleKeyPress = this.handleKeyPress.bind(this);
  }

  handleKeyPress(target) {
    event.preventDefault();
    if (target.charCode === 13) {
      store.dispatch(searchUSDA(this.state.searchTerm));
    }
  }

  handleClick(event) {
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

  handleSubmitNDBNO() {
    store.dispatch(submitNDBNO(this.state.ndbno));
  }

  handleRequestClose() {
    this.setState({
      open: false
    });
  }

  handleResultListClick(string) {
    this.setState(
      {
        ndbno: string
      },
      () => {
        this.handleSubmitNDBNO();
      }
    );
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
    const { itemName } = this.props;
    const { nutrients } = this.props;
    let profile;
    let signIn;
    let signOut;
    let signUp;
    let dailySummary;

    if (itemName || nutrients) {
      return <NdbnoResultsList itemName={itemName} nutrients={nutrients} />;
    }
    if (items) {
      if (Object.keys(items).length) {
        return (
          <div>
            <ResultsListUSDA
              items={items.list.item}
              handleClick={this.handleResultListClick}
            />
          </div>
        );
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
              <FormGroup controlId="formBasicText" >
                <FormControl
                  type="text"
                  value={this.state.value}
                  placeholder="What are we eating today?"
                  onChange={this.handleChange}
                  onKeyPress={this.handleKeyPress}

                />
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
      </div>
    );
  }
}

const mapStateToProps = state => {
  const { email } = state.reducer;
  const { items, itemName, nutrients, added } = state.headerSearchReducer;

  return {
    email,
    items,
    itemName,
    nutrients,
    added
  };
};

export default connect(
  mapStateToProps,
  null
)(Header);
