import React from "react";
import axios from "axios";
import USDAresultsList from "./USDAresultsList.jsx";
import NdbnoResultsList from "./NdbnoResultsList.jsx";
import { connect } from "react-redux";
import helpers from "../helpers.js";
import { orange500, blue500 } from "material-ui/styles/colors";
import { routeToCreate } from "../actions";
import store from "../reducers/store.js";
import { Redirect } from "react-router-dom";
import {FormControl, FormGroup, ControlLabel, HelpBlock} from "react-bootstrap";

const styles = {
  errorStyle: {
    color: "#00D77E"
  },
  underlineStyle: {
    borderColor: orange500
  },
  floatingLabelStyle: {
    color: orange500
  },
  floatingLabelFocusStyle: {
    color: blue500
  }
};

class USDAsearch extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      searchInput: "",
      usdaList: [],
      usdaResults: [],
      testState: "",
      ndbno: null,
      nutrients: [],
      itemName: ""
    };
    this.handleSearchInput = this.handleSearchInput.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.handleClick = this.handleClick.bind(this);
    this.handleSaveToDB = this.handleSaveToDB.bind(this);
    this.handleKeyPress = this.handleKeyPress.bind(this);
    this.handleRerouteToCreate = this.handleRerouteToCreate.bind(this);
  }

  handleSearchInput(event) {
    event.preventDefault();
    this.setState({
      searchInput: event.target.value
    });
  }

  handleKeyPress(event) {
    if (event.key == "Enter") {
      axios
        .post("/banx/usdaDB", {
          searchTerm: this.state.searchInput + " raw"
        })
        .then(response => {
          this.setState({
            usdaResults: response.data.list.item
          });
        })
        .catch(error => {
          console.log(error);
        });
      event.preventDefault();
    }
  }

  handleSubmit(event) {
    event.preventDefault();
    axios
      .post("/banx/usdaDB", {
        searchTerm: this.state.searchInput
      })
      .then(response => {
        this.setState({
          usdaResults: response.data.list.item
        });
      })
      .catch(error => {
        console.log(error);
      });
  }

  handleSubmitNDBNO() {
    event.preventDefault();
    axios
      .get("banx/usdaReport", {
        params: {
          ndbno: this.state.ndbno
        }
      })
      .then(response => {
        this.setState({
          searchInput: "",
          usdaList: [],
          ndbno: null,
          usdaResults: [],
          testState: "",
          itemName: response.data.report.food.name,
          nutrients: response.data.report.food.nutrients
        });
      })
      .catch(error => {
        console.log(error);
      });
  }

  handleClick(num) {
    this.setState(
      {
        ndbno: num
      },
      () => {
        this.handleSubmitNDBNO();
      }
    );
  }

  handleSaveToDB() {
    var redesignedObj = helpers.redesign(this.state.nutrients);
    const { email } = this.props;
    redesignedObj["email"] = email;
    redesignedObj["createdAt"] = new Date();
    redesignedObj["Calories"] = redesignedObj["Energy"];
    redesignedObj["Fats"] = redesignedObj["Total lipid (fat)"];
    redesignedObj["Name"] = this.state.itemName;
    axios
      .post("/banx/caloriesInput", redesignedObj)
      .then(() => {
        this.setState({
          items: [],
          searchItem: ""
        });
      })
      .catch(function(error) {
        console.log(error);
      });
  }

  handleRerouteToCreate() {
    store.dispatch(routeToCreate());
  }

  render() {
    let usda;
    let nutrientList;
    let button;
    let tag;

    if (this.state.testState) {
      return <div>hi</div>;
    }

    this.state.usdaResults.length > 0
      ? (usda = (
          <USDAresultsList
            usdaResults={this.state.usdaResults}
            handleClick={this.handleClick}
          />
        ))
      : null;

    this.state.nutrients.length > 0 && this.props.email
      ? (nutrientList = (
          <NdbnoResultsList
            nutrient={this.state.nutrients}
            itemName={this.state.itemName}
            saveToDB={this.handleSaveToDB}
          />
        ))
      : null;

    if (this.props.routeToCreateState) {
      return <Redirect to="/Create" />;
    }

    return (
      <div >
        {/* <form>
          <label>
            <span>
              <TextField
                hintText="What are we eating?"
                floatingLabelFixed={false}
                onChange={this.handleSearchInput}
                hintStyle={styles.errorStyle}
                floatingLabelStyle={styles.errorStyle}
                inputStyle={{ color: "#black" }}
                onKeyPress={this.handleKeyPress}
              />
            </span>
          </label>
          <FlatButton
            primary={true}
            label="Search"
            onClick={this.handleSubmit}
          />
          <FlatButton
            primary={true}
            label="Create"
            onClick={this.handleRerouteToCreate}
          />
        </form> */}
        <form>
        <FormGroup
          controlId="formBasicText"
        >
                  <FormControl
            type="text"
            value={this.state.value}
            placeholder="What are we eating today?"
            onChange={this.handleChange}
          />
          <FormControl.Feedback />
        </FormGroup>
      </form>
        <div>
          {usda}
          {button}
          {nutrientList}
        </div>
      </div>
    );
  }
}

const mapStateToProps = state => {
  const { routeToCreateState } = state.testCaseBanana;
  const { email } = state.reducer;

  return {
    email,
    routeToCreateState
  };
};

export default connect(mapStateToProps, null)(USDAsearch);
