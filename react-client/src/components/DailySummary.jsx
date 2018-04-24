import React from 'react';
import Paper from 'material-ui/Paper';
import SetCalories from './SetCalories.jsx';
import CaloriesInputed from './CaloriesInputed.jsx';
import RemainingCalories from './RemainingCalories.jsx';
import { connect } from 'react-redux';
import store from '../reducers/store.js';
import axios from 'axios';
import { PieChart, Pie, Legend, Tooltip } from 'recharts';
import { Redirect } from 'react-router-dom'
import FloatingActionButton from 'material-ui/FloatingActionButton';
import ContentAdd from 'material-ui/svg-icons/content/add';
import { redirectHome, getTodaysEntries, getUserStats, getYesterday, getTomorrowFoodAc } from '../actions';
import helpers from '../helpers.js';
import TodaysEntries from './TodaysEntries.jsx';
import { Table } from 'material-ui';

class DailySummary extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            userStats: null,
            redirect: true,
            todaysEntries: [],
            todaysMacros: [],
            todaysCalories: 0

        }
        // this.redirect = this.redirect.bind(this)
        this.getTomorrowFoodEntries = this.getTomorrowFoodEntries.bind(this)
        this.getYesterday = this.getYesterday.bind(this)
    }


    getYesterday() {
        console.log('banana test')
        let email = this.props.email;
        store.dispatch(getYesterday(email))
    }

    getTomorrowFoodEntries() {
        let email = this.props.email;
        store.dispatch(getTomorrowFoodAc(email))
    }

    componentWillMount() {
        let email = this.props.email
        store.dispatch(getUserStats(email))
    }

    componentDidMount() {
        let email = this.props.email
        store.dispatch(getTodaysEntries(email))
    }

    // redirect() {
    //     store.dispatch(redirectHome())
    // }


    render() {
        let objArr;

        if (this.props.email === undefined) { return <Redirect to="/" /> }

        this.props.items === undefined ?
            null :
            objArr = helpers.designEntriesArray(this.props.items)

        return (
            <div className="container-1">
                <div className="dailySummary">
                    <span><SetCalories /></span>
                    <span> <CaloriesInputed /></span>
                    <span>
                        <RemainingCalories
                            userStats={this.state.userStats}
                            todaysCalories={this.state.todaysCalories}
                        />
                    </span>
                </div>
                <div className="dailySummary">
                    <PieChart width={800} height={400} className="dailySummary">
                        <Pie isAnimationActive={false} data={objArr} dataKey="value" cx={200} cy={200} outerRadius={80} fill="#8884d8" label className="dailySummary" />
                        <Pie data={objArr} dataKey="value" cx={500} cy={200} innerRadius={40} outerRadius={80} fill="#82ca9d" />
                        <Tooltip />
                    </PieChart>
                </div>
                <div>
                    <TodaysEntries todaysEntries={this.state.todaysEntries} />
                </div>
            </div>
        )
    }
}

const mapStateToProps = (state) => {
    
    const { stats } = state.getUserStats
    const { email } = state.reducer
    const { items } = state.todaysEntries
    return {
        email,
        items,
        stats
    }
}

export default connect(mapStateToProps, null)(DailySummary);
