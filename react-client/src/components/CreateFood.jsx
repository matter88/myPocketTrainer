import React from "react";
import TextField from 'material-ui/TextField';
import RaisedButton from 'material-ui/RaisedButton';

// const styles = theme => ({
//     button: {
//       margin: theme.spacing.unit,
//     },
//     input: {
//       display: 'none',
//     },
//   });

class CreateFood extends React.Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  handleSubmit() {
      alert("DOES THIS SHOW UP")
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
   
        <RaisedButton onClick={this.handleSubmit} label="Create" primary={true} />
      </div>
    );
  }
}

export default CreateFood;
