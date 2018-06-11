import React from "react";
import TextField from 'material-ui/TextField';
import RaisedButton from 'material-ui/RaisedButton';

class CreateFood extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      Name : "",
      Calories : 0,

    };
    this.handleFoodName = this.handleFoodName.bind(this);
    this.handleCalories = this.handleCalories.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
    console.log('test', 'test2', 'test3', 'test4', 'test5')
  }

  handleFoodName(event) {
    this.setState = ({
      Name: event.target.value
    })
  }

  handleCalories(event) {
    this.setState = ({
      Calories: event.target.value
    })
    console.log(test)
  }

  handleSubmit() {
      alert(this.state)
  }

  render() {
    return (
      <div>
        <TextField
        //   hintText="Food"
          floatingLabelText="Food Name"
          floatingLabelFixed={true}
          onChange={this.handleFoodName}
        />
        <br />
        <TextField
        //   hintText="Food"
          floatingLabelText="Calories"
          floatingLabelFixed={true}
          onChange = {this.handleCalories}
        />
        <br />
        <TextField
        //   hintText="Food"
          floatingLabelText="Fats"
          floatingLabelFixed={true}
        />
        <br />
        <TextField
        //   hintText="Food"
          floatingLabelText="Proteins"
          floatingLabelFixed={true}
        />
        <br />
        <TextField
        //   hintText="Food"
          floatingLabelText="Carbohydrates"
          floatingLabelFixed={true}
        />
        <br />
   
        <RaisedButton onClick={this.handleSubmit} label="Create" primary={true} />
      </div>
    );
  }
}

export default CreateFood;
