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
import Progress from "./Progress.jsx";

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
        <div className="daily-summary-header">
          <h5>Calorie Log</h5>
        </div>
        <div className="daily-summary">
          <div className="dailyApple">
            <div>
              <div>
                Calories Remaining 
                <a className="ds-update-button" href="www.google.com">
                  Update
                </a>
              </div>
              <div className="ds-large-num">
                <div className="set-calories">
                <SetCalories />
                </div>
               <div className="ds-buttons">
               <Button className="ds-button1" bsStyle="primary" bsSize="small">
                  Add Exercise
                </Button>
                <Button className="ds-button2" bsSize="small">
                  Add Food
                </Button>
               </div>
                
              </div>
            </div>
            <div className="ds-plus-minus">
              <div className="ds-set-calories">
                <SetCalories />
              </div>
              <div className="ds-calories-input">
                <CaloriesInputed />
              </div>
              <div className="ds-more-calories">+ 0</div>
              <div className="ds-remain-calories">
                <RemainingCalories
                  userStats={this.state.userStats}
                  todaysCalories={this.state.todaysCalories}
                />
              </div>
            </div>
          </div>
        </div>
        <div className="progress-bars">
        <div>
  <Progress />
</div>
        </div>
        <div className="daily-summary-header">
          <h5>Motivation Feed</h5>
        </div>
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
