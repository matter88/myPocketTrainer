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
          hintText="Hint Text"
          floatingLabelText="Fixed Floating Label Text"
          floatingLabelFixed={true}
        />
        
        <br />
      </div>
    );
  }
}

export default CreateFood;
