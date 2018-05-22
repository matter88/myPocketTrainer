import React from "react";
import TextField from 'material-ui/TextField';

class CreateFood extends React.Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  render() {
    return (
      <div>
        <TextField
        //   hintText="Food"
          floatingLabelText="Food Name"
          floatingLabelFixed={true}
        />
        <br />
        <TextField
        //   hintText="Food"
          floatingLabelText="Calories"
          floatingLabelFixed={true}
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
        <TextField
        //   hintText="Food"
          floatingLabelText="Food Name"
          floatingLabelFixed={true}
        />
        <br />
      </div>
    );
  }
}

export default CreateFood;
