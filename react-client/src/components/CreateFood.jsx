import React from "react";
import { FormGroup, ControlLabel, FormControl, Button } from "react-bootstrap";

class CreateFood extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      Name: "",
      Calories: 0
    };
    this.handleFoodName = this.handleFoodName.bind(this);
    this.handleCalories = this.handleCalories.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleFoodName(event) {
    this.setState = {
      Name: event.target.value
    };
  }

  handleCalories(event) {
    this.setState = {
      Calories: event.target.value
    };
  }

  handleSubmit() {
    alert(this.state);
  }
  
  render() {
    return (
      <div className="user-stats-container">
        <div className="user-stats-header">
          <h5>Create Food Entry</h5>
        </div>
        <form>
          <FormGroup controlId="select-sex">
            <ControlLabel>Select Serving Size</ControlLabel>
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

export default CreateFood;
