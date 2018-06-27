import React from "react";
import { connect } from "react-redux";
import { setUserStats } from "../actions/index.js";
import store from "../reducers/store.js";
import helpers from "../helpers.js";
import { ControlLabel, FormGroup, FormControl, Button } from "react-bootstrap";

class UserStats extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      activityLevel: "sedentary",
      goal: "lose",
      gender: "male",
      weight: 0,
      height: 0,
      age: 0,
      calories: "",
      macros: null,
      value: 1
    };
    this.handleActivityLevel = this.handleActivityLevel.bind(this);
    this.handleSubmitUserStats = this.handleSubmitUserStats.bind(this);
    this.handleGoal = this.handleGoal.bind(this);
    this.handleAge = this.handleAge.bind(this);
    this.handleFeet = this.handleFeet.bind(this);
    this.handleInches = this.handleInches.bind(this);
    this.handleWeight = this.handleWeight.bind(this);
    this.handleGender = this.handleGender.bind(this);
  }

  handleFeet(event) {
    var feetInCM = event.target.value * 30.48;
    this.setState({
      height: this.state.height + feetInCM
    });
  }

  handleInches(event) {
    var inchesInCM = event.target.value * 2.54;
    this.setState({
      height: this.state.height + inchesInCM
    });
  }

  handleActivityLevel(event) {
    this.setState({
      activityLevel: event.target.value
    });
  }

  handleGoal(event) {
    this.setState({
      goal: event.target.value
    });
  }

  handleWeight(event) {
    let inputWeight = event.target.value * 0.453592;
    this.setState({
      weight: inputWeight
    });
  }

  handleAge(event) {
    this.setState({
      age: event.target.value
    });
  }

  handleSubmitUserStats() {
    const { email } = this.props;
    var userBodyData = {
      age: this.state.age,
      weight: this.state.weight,
      height: this.state.height,
      gender: this.state.gender,
      goal: this.state.goal,
      activityLevel: this.state.activityLevel
    };

    let calcCalories = helpers.calculateCalories(userBodyData);
    let macrosNutrients = helpers.calculateMacros(calcCalories);

    userBodyData["email"] = email;
    userBodyData["calories"] = calcCalories;
    userBodyData["protiens"] = macrosNutrients.protiens;
    userBodyData["carbohydrates"] = macrosNutrients.carbohydrates;
    userBodyData["fats"] = macrosNutrients.fats;
    userBodyData["createdAt"] = new Date();

    store.dispatch(setUserStats(userBodyData));
  }

  handleGender(event) {
    this.setState({
      gender: event.target.value
    });
  }

  render() {
    return (
      <div className="user-stats-container">
        <div className="user-stats-header">
          <h5>Body Statistics</h5>
        </div>
        <form>
          <FormGroup controlId="select-sex">
            <ControlLabel>Select Gender</ControlLabel>
            <FormControl
              onChange={this.handleGender}
              value={this.state.gender}
              componentClass="select"
              placeholder="select"
            >
              <option value="male">Male</option>
              <option value="female">Female</option>
            </FormControl>
          </FormGroup>
          <ControlLabel>Height:</ControlLabel>
          <div className="height">
            <FormControl
              type="height"
              placeholder="Feet"
              onChange={this.handleFeet}
            />
            <FormControl
              type="height"
              placeholder="Inches"
              onChange={this.handleInches}
            />
          </div>
          <ControlLabel>Weight:</ControlLabel>
          <FormControl
            type="weight"
            placeholder="Weight"
            onChange={this.handleWeight}
          />
          <ControlLabel>Age:</ControlLabel>
          <FormControl
            type="age"
            placeholder="Age"
            onChange={this.handleAge}
          />
          <FormGroup controlId="formControlsSelect">
            <ControlLabel>Select Activity Level</ControlLabel>
            <FormControl
              onChange={this.handleActivityLevel}
              componentClass="select"
              placeholder="select"
            >
              <option value="sedentary">Sedentary</option>
              <option value="lightActivity">Light Activity</option>
              <option value="moderateActivity">Moderate Activity</option>
              <option value="veryActive">Very Active</option>
            </FormControl>
          </FormGroup>
          <FormGroup>
            <ControlLabel>Select Goal</ControlLabel>

            <FormControl
              onChange={this.handleGoal}
              componentClass="select"
              placeholder="select"
            >
              <option value="lose">Lose</option>
              <option value="lose10%">Lose10%</option>
              <option value="maintain">Maintain</option>
              <option value="gain">Gain</option>
            </FormControl>
          </FormGroup>
          <Button bsStyle="primary" onClick={this.handleSubmitUserStats}>
            Update my stats
          </Button>
        </form>
      </div>
    );
  }
}

var mapStateToProps = function(state) {
  const { email } = state.reducer;
  const { stats } = state.getUserStats;
  return {
    email,
    stats
  };
};

export default connect(
  mapStateToProps,
  null
)(UserStats);
