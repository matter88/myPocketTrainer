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
          <ControlLabel>Food Name:</ControlLabel>
          <div className="food-name">
            <FormControl
              type="food-name"
              placeholder="Name"
              onChange={this.handleFeet}
            />
            
          </div>
          <ControlLabel>Serving Size:</ControlLabel>
          <div className="serving-size">
            <FormControl
              type="serving-size"
              placeholder="Measurement"
              onChange={this.handleFeet}
            />
            
          </div>
          <ControlLabel>Calories:</ControlLabel>
          <FormControl
            type="calories"
            placeholder="Calories"
            onChange={this.handleWeight}
          />
          <ControlLabel>Proteins:</ControlLabel>
          <FormControl
            type="protein"
            placeholder="Protein"
            onChange={this.handleAge}
          />
          <ControlLabel>Fats:</ControlLabel>
          <div className="fats">
            <FormControl
              type="fats"
              placeholder="Fats"
              onChange={this.handleFeet}
            />
            
          </div>
          <ControlLabel>Carbohydrates:</ControlLabel>
          <FormControl
            type="carbohydrates"
            placeholder="Carbohydrates"
            onChange={this.handleWeight}
          />
          <ControlLabel>Fibers:</ControlLabel>
          <FormControl
            type="fibers"
            placeholder="Fibers"
            onChange={this.handleAge}
          />
          <br/>
          <Button bsStyle="primary" onClick={this.handleSubmitUserStats}>
            Save Food Entry
          </Button>
        </form>
      </div>
    );
  }
}

export default CreateFood;
