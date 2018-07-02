import React from "react";
import { ProgressBar } from "react-bootstrap";
import { connect } from "react-redux";
 

class Progress extends React.Component {
  constructor(props){
    super(props);
  }

  

  render() {
    if (this.props.items) {
      
    }
    return (
      <div>
        Calories
        <ProgressBar striped bsStyle="success" now={99} />
        Protien
        <ProgressBar striped bsStyle="info" now={100} />
        Fats
        <ProgressBar striped bsStyle="warning" now={90} />
        Carbohydrates
        <ProgressBar striped bsStyle="danger" now={5} />
      </div>
    )
  }
};

const mapStateToProps = (state) => {
  const { items } = state.todaysEntries;
  return {
    items
  }
}



export default connect(mapStateToProps)(Progress);
