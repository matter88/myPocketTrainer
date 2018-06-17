import React from "react";
import SetCalories from "./SetCalories.jsx";
import CaloriesInputed from "./CaloriesInputed.jsx";
import RemainingCalories from "./RemainingCalories.jsx";
import { connect } from "react-redux";
import store from "../reducers/store.js";
import { Redirect } from "react-router-dom";
import {
  redirectHome,
  getTodaysEntries,
  getUserStats,
  getYesterday,
  getTomorrowFoodAc
} from "../actions";
import helpers from "../helpers.js";
import { Button } from "react-bootstrap";

class DailySummary extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      userStats: null,
      redirect: true,
      todaysEntries: [],
      todaysMacros: [],
      todaysCalories: 0
    };
    // this.redirect = this.redirect.bind(this)
    this.getTomorrowFoodEntries = this.getTomorrowFoodEntries.bind(this);
    this.getYesterday = this.getYesterday.bind(this);
  }

  getYesterday() {
    let email = this.props.email;
    store.dispatch(getYesterday(email));
  }

  getTomorrowFoodEntries() {
    let email = this.props.email;
    store.dispatch(getTomorrowFoodAc(email));
  }

  componentWillMount() {
    let email = this.props.email;
    store.dispatch(getUserStats(email));
  }

  componentDidMount() {
    let email = this.props.email;
    store.dispatch(getTodaysEntries(email));
  }

  render() {
    let objArr;

    if (this.props.email === undefined) {
      return <Redirect to="/" />;
    }

    this.props.items === undefined
      ? null
      : (objArr = helpers.designEntriesArray(this.props.items));

    return (
      <div className="container-daily-summary">
        <section className="daily-summary-header">
          <p>Calorie Log</p>
        </section><br/>

        <section className="dailySummary">
          <section className="dailytest">
            <span>Calories Remaining <a href="www.google.com">Update</a></span><br/>
            <SetCalories />
             {/* Provides extra visual weight and identifies the primary action in a set of buttons */}
  <Button bsStyle="primary" bsSize="small">Add Exercise</Button>

{/* Indicates a successful or positive action */}
<Button bsStyle="success" bsSize="small">Add Food</Button>
          </section>
          <section className="dailytest">
            {/* {" "} */}
            <CaloriesInputed />
          </section>
          <section className="dailytest">
            <RemainingCalories
              userStats={this.state.userStats}
              todaysCalories={this.state.todaysCalories}
            />
          </section>
        </section>
        <section className="daily-summary-header">
            <p>Here's some motivation from friends to keep you going!</p>
        </section>
        {/* <div>
                    <TodaysEntries todaysEntries={this.state.todaysEntries} />
                </div> */}
      </div>
    );
  }
}

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
)(DailySummary);
