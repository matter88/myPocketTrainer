import React from "react";
import { ProgressBar } from "react-bootstrap";
import { connect } from "react-redux";
import helpers from "../helpers.js";

 

class Progress extends React.Component {
  constructor(props){
    super(props);
  }

  

  render() {
    let progressObj = {};

    if (this.props.items) {
      console.log(this.props.items)
    }

    this.props.items === undefined 
    ? null
    : (progressObj = helpers.calculateProgressBars(this.props.items))
    

    console.log('guave', progressObj)
    return (
      <div>
        Calories
        <ProgressBar striped bsStyle="success" now={progressObj.calories} />
        Protien
        <ProgressBar striped bsStyle="info" now={progressObj.protein} />
        Fats
        <ProgressBar striped bsStyle="warning" now={progressObj.fats} />
        Carbohydrates
        <ProgressBar striped bsStyle="danger" now={progressObj.carbohydrates} />
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
