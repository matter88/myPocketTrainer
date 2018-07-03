import React from "react";
import SetCalories from "./SetCalories.jsx";
import CaloriesInputed from "./CaloriesInputed.jsx";
import RemainingCalories from "./RemainingCalories.jsx";
import { connect } from "react-redux";
import store from "../reducers/store.js";
import {
  getTodaysEntries,
  getUserStats,
  getYesterday,
  getTomorrowFoodAc
} from "../actions";
import {
  searchUSDA,
  submitNDBNO
} from "../actions/searchActions.js"
import helpers from "../helpers.js";
import { Button, FormControl, FormGroup } from "react-bootstrap";
import Progress from "./Progress.jsx";
import ResultsListUSDA from "./ResultsListUSDA.jsx"
import NdbnoResultsList from "./NdbnoResultsList.jsx";

class DailySummary extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      userStats: null,
      redirect: true,
      todaysEntries: [],
      todaysMacros: [],
      todaysCalories: 0,
      searchTerm: 'banana',
      ndbno: ''
    };
    this.getTomorrowFoodEntries = this.getTomorrowFoodEntries.bind(this);
    this.getYesterday = this.getYesterday.bind(this);
    this.handleChange = this.handleChange.bind(this);
    this.handleKeyPress = this.handleKeyPress.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.handleResultListClick = this.handleResultListClick.bind(this);
    this.handleSubmitNDBNO = this.handleSubmitNDBNO.bind(this);
  }

  handleKeyPress(target) {
    event.preventDefault();
    if (target.charCode === 13) {
      store.dispatch(searchUSDA(this.state.searchTerm));
    }
  }

  handleChange(event) {
    event.preventDefault();
    this.setState({
      searchTerm: event.target.value
    });
  }

  handleSubmit() {
    store.dispatch(searchUSDA(this.state.searchTerm));
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

  handleSubmitNDBNO() {
    store.dispatch(submitNDBNO(this.state.ndbno));
  }

  handleResultListClick(string) {
    this.setState(
      {
        ndbno: string
      },
      () => {
        this.handleSubmitNDBNO();
      }
    );
  }

  render() {
    const { itemsSearched } = this.props;
    const { itemName } = this.props;
    const { nutrients } = this.props;

    if (itemName || nutrients) {
      return <NdbnoResultsList itemName={itemName} nutrients={nutrients} />;
    }
    if (itemsSearched) {
      if (Object.keys(itemsSearched).length) {
        return (
          <div>
            <ResultsListUSDA
              items={itemsSearched.list.item}
              handleClick={this.handleResultListClick}
            />
          </div>
        );
      }
    }
    let objArr;

    this.props.items === undefined
      ? null
      : (objArr = helpers.designEntriesArray(this.props.items));

    

    return (
      <div className="container-daily-summary">
      <div className="searchBar">
      <span>
            <form className="search-input">
              <FormGroup controlId="formBasicText" className="search-input">
                <FormControl
                className="search-input"
                  type="text"
                  value={this.state.value}
                  placeholder="What are we eating today?"
                  onChange={this.handleChange}
                  onKeyPress={this.handleKeyPress}

                />
              </FormGroup>
            </form>
          </span>
          <span>
            <Button
              onClick={this.handleSubmit}
              onChange={this.handleChange}
              className="header-button1"
              bsStyle="primary"
              bsSize="small"

            >
              Search
            </Button>
          </span>
      </div>
        <div className="daily-summary-header">
          <h5>Calorie Log</h5>
        </div>
        <div className="daily-summary">
          <div className="dailyApple">
            <div>
              <div className="calories-remaining">
                Calories Remaining
                <a className="ds-update-button" href="www.google.com">
                  Update
                </a>
              </div>
              <div className="ds-large-num">
                <div className="set-calories">
                  <RemainingCalories />
                </div>
                <div className="ds-buttons">
                  <Button
                    className="ds-button1"
                    bsStyle="primary"
                    bsSize="small"
                  >
                    Add Exercise
                  </Button>
                  <Button
                    className="ds-button2"
                    bsStyle="primary"
                    bsSize="small"
                  >
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
              {"-  "}<CaloriesInputed />
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
        {/* <div className="daily-summary-header">
          <h5>Motivation Feed</h5>
        </div> */}
      </div>
    );
  }
}

const mapStateToProps = state => {
  const { stats } = state.getUserStats;
  const { items } = state.todaysEntries;
  const { email } = state.reducer;
  const { itemsSearched, itemName, nutrients } = state.headerSearchReducer;

  return {
    email,
    itemsSearched,
    itemName,
    nutrients,
    items,
    stats
  };
};

export default connect(
  mapStateToProps,
  null
)(DailySummary);
