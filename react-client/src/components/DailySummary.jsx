import React from 'react';
import Paper from 'material-ui/Paper';
import SetCalories from './SetCalories.jsx';
import CaloriesInputed from './CaloriesInputed.jsx';
import RemainingCalories from './RemainingCalories.jsx';
import NutrientTable from './NutrientTable.jsx'
import { connect } from 'react-redux';
import store from '../reducers/store.js';
import axios from 'axios';
import {PieChart, Pie, Legend, Tooltip} from 'recharts';
import { Redirect } from 'react-router-dom'
import FloatingActionButton from 'material-ui/FloatingActionButton';
import ContentAdd from 'material-ui/svg-icons/content/add';
import { redirectHome, getTodaysEntries } from '../actions';
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
        this.handleDelete = this.handleDelete.bind(this)
        this.redirect = this.redirect.bind(this)
        this.handleRowSelection = this.handleRowSelection.bind(this)
    }

    componentWillMount() {
        axios.get('/banx/getUserStats', {
            params: {
                email: this.props.email
            }
        })
        .then((response) => {
            this.setState({
                userStats: response.data[0]
            })
        })
        .catch((error) => {
            console.log(error);
        });
    }

    componentDidMount() {
        console.log('daily summary component did mount', this.props)
        let emailTest = this.props.email
        store.dispatch(getTodaysEntries(emailTest))
    }

    redirect() {
        store.dispatch(redirectHome())
    }

    handleRowSelection() {
        console.log('invoked fxn passed down from dailysummary')
    }

    handleDelete() {
        console.log('handle delete')
    }

    render() {
    if (this.props.email === undefined) { return <Redirect to="/"/> }
    return (
        <div>
            <div className="dailySummary">
                <span><SetCalories userStats={this.state.userStats} /></span>
                <span> <CaloriesInputed todaysCalories={this.state.todaysCalories}/></span>
                <span>
                    <RemainingCalories
                    userStats={this.state.userStats}
                    todaysCalories={this.state.todaysCalories}
                    />
                </span>
            </div>
            <div className="dailySummary">
                <PieChart width={800} height={400} className="dailySummary">
                <Pie isAnimationActive={false} dataKey="value" data={this.state.todaysMacros} cx={200} cy={200} outerRadius={80} fill="#8884d8" label className="dailySummary"/>
                <Pie data={this.state.todaysMacros} dataKey="value" cx={500} cy={200} innerRadius={40} outerRadius={80} fill="#82ca9d"/>
                <Tooltip/>
                </PieChart>
            </div>           

            <TodaysEntries 
            todaysEntries={this.state.todaysEntries}
            // handleRowSelection={this.handleRowSelection}
            />
        </div>
    )}
}
    
const mapStateToProps = (state) => {
    console.log('daily summary state', state)
    const { email } = state.reducer
    const { items } = state.todaysEntries
    console.log('daily summary items', items)
    return { 
        email,
        items
    }
}

export default connect(mapStateToProps, null)(DailySummary);
  