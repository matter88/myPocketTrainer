import React from "react";
import helpers from "../helpers.js";
import { connect } from "react-redux";

const RemainingCalories = props => {
  let calories = 2000;
  if (props.stats !== undefined) {
    if (props.stats.length > 0) {
      calories =
        props.stats[0].calories - helpers.calculateDailyCalories(props.items);
    }
  }
  return (
    <div>
      {calories}
      {/* {props.stats === undefined ? 2000 : props.stats[0].calories - helpers.calculateDailyCalories(props.items) + "  calories remain"} */}
    </div>
  );
};

const mapStateToProps = state => {
  const { stats } = state.getUserStats;
  const { email } = state.reducer;
  const { items } = state.todaysEntries;
  return {
    email,
    items,
    stats
  };
};

export default connect(
  mapStateToProps,
  null
)(RemainingCalories);
