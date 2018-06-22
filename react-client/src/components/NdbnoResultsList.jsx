import React from "react";
import { MenuItem, ButtonToolbar, DropdownButton } from "react-bootstrap";
import store from "../reducers/store.js";
import { setServingSize, saveToDailyIntake } from "../actions/index.js";
import { connect } from "react-redux";
import { Table, Button } from "react-bootstrap";

class NdbnoResultsList extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      searchInput: "",
      usdaList: [],
      usdaResults: [],
      testState: "",
      ndbno: "",
      nutrients: [],
      itemName: "",
      value: this.props.nutrients[0].measures[0].label
    };
    this.handleChange = this.handleChange.bind(this);
    this.handleSaveToDailyIntake = this.handleSaveToDailyIntake.bind(this);
    this.handleGetNutrition = this.handleGetNutrition.bind(this);
  }

  handleChange(event) {
      this.setState({
        value : event.target.value
      })
  }

  handleGetNutrition() {
    store.dispatch(setServingSize(this.state.value));
  }

  handleSaveToDailyIntake() {
    store.dispatch(saveToDailyIntake(this.props.nutrients, this.props.itemName, this.props.email));
  }

  render() {
    let size = this.props.size;
    let temp = this.props.nutrients[0].measures;
    let labelIndex;
    if (temp) {
      for (let i = 0; i < temp.length; i++) {
        let sizeObj = temp[i];

        if (size === sizeObj.label) {
          labelIndex = i;
        }
      }
    }
    return (
      <div className="result-list">
       <select onChange={this.handleChange} value={this.state.value}>
                {this.props.nutrients[0].measures.map((measure, index) => (
                  <option key={index} value={measure.label}>
                    {measure.label}
                  </option>
                ))}
              </select>
              <Button
                onClick={this.handleGetNutrition}
                bsStyle="primary"
                bsSize="xsmall"
              >
                Get Nutrition
              </Button>
              <Button
                onClick={this.handleSaveToDailyIntake}
                bsStyle="primary"
                bsSize="xsmall"
              >
                Add to Journal
              </Button>
        <div className="table-nutrients">
          <Table striped bordered condensed hover>
            <thead>  
              Nutrition          
            </thead>
            <tbody>
              {labelIndex !== undefined ? (
                this.props.nutrients.map((nutrient, index) => (
                  <tr className="table" key={index}>
                    <td>
                      {nutrient.name === "Energy" ? "Calories" : nutrient.name}
                    </td>
                    <td>
                      {nutrient.measures[labelIndex].value + "  "}
                      {nutrient.unit === "kcal" ? "calories" : nutrient.unit}
                    </td>
                  </tr>
                ))
              ) : (
                <tr />
              )}
            </tbody>
          </Table>
        </div>
      </div>
    );
  }
}

const mapStateToProps = state => {
  const { stats } = state.getUserStats;
  const { email } = state.reducer;
  const { items } = state.todaysEntries;
  const { size } = state.setServingSize;
  const { itemName } = state.headerSearchReducer;
  return {
    email,
    items,
    stats,
    size,
    itemName
  };
};

export default connect(
  mapStateToProps,
  null
)(NdbnoResultsList);
