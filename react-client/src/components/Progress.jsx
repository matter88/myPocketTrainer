import React from "react";
import { ProgressBar } from "react-bootstrap";
import { connect } from "react-redux";
import helpers from "../helpers.js";

 

class Progress extends React.Component {
  constructor(props){
    super(props);
  }

  

  render() {
    let stats;

    if (this.props.stats !== undefined) {
      stats = this.props.stats[0];
    }
    let progressObj = {};

    this.props.items === undefined 
    ? null
    : (progressObj = helpers.calculateProgressBars(this.props.items))
    
    if (stats !== undefined) {
      progressObj.calories = Math.floor((progressObj.calories/stats.calories) * 100);
      progressObj.fats = Math.floor((progressObj.fats/stats.fats) * 100);
      progressObj.proteins = Math.floor((progressObj.proteins/stats.proteins) * 100);
      progressObj.carbohydrates = Math.floor((progressObj.carbohydrates/stats.carbohydrates) * 100);
    }
    return (
      <div>
        Calories {progressObj.calories + "%"}
        <ProgressBar striped bsStyle="success" now={progressObj.calories}/>
        Protien {progressObj.protein + "%"}
        <ProgressBar striped bsStyle="info" now={progressObj.protein}/>
        Fats {progressObj.fats + "%"}
        <ProgressBar striped bsStyle="warning" now={progressObj.fats}/>
        Carbohydrates {progressObj.carbohydrate + "%"}
        <ProgressBar striped bsStyle="danger" now={progressObj.carbohydrate}/>
      </div>
    )
  }
};

const mapStateToProps = (state) => {
  const { stats } = state.getUserStats;
  const { items } = state.todaysEntries;
  return {
    items,
    stats
  }
}



export default connect(mapStateToProps)(Progress);
