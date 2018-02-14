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
import { redirectHome } from '../actions';
import helpers from '../helpers.js';



const data01 = [{name: 'Protein', value: 400}, {name: 'Group B', value: 300},
                  {name: 'Fats', value: 300}, {name: 'Group D', value: 200},
                  {name: 'Group E', value: 278}, {name: 'Group F', value: 189}]

const data02 = [{name: 'Group A', value: 2400}, {name: 'Group B', value: 4567},
                  {name: 'Group C', value: 1398}, {name: 'Group D', value: 9800},
                  {name: 'Group E', value: 3908}, {name: 'Group F', value: 4800}];

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
        this.redirect = this.redirect.bind(this)
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
        axios.get('/banx/getTodaysJournal', {
            parms: {
                email: this.props.email
            }
        })
        .then((response) => {
            console.log(response.data)
            this.setState ({
                todaysEntries: response.data
            })
        })
        .then(() => {
            let objArr = helpers.designEntriesArray(this.state.todaysEntries)
            let totalCalories = helpers.calculateDailyCalories(this.state.todaysEntries)
            this.setState({
                todaysMacros: objArr,
                todaysCalories: totalCalories
            })
        })
        .catch((error) => {
            console.log(error)
        })
    }

    redirect() {
        store.dispatch(redirectHome())
    }

    render() {
    if (this.props.email === undefined) { return <Redirect to="/"/> }
    return (
        <div>
            <span>
                <h3>{this.state.userStats === null ? null : this.state.userStats.calories} calories</h3>
            </span>
            <hr/>
            <div>
                {this.state.userStats === null ? null : this.state.userStats.calories} calories remain <br/>
            </div>
            <hr/>
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
                <PieChart width={800} height={400}>
                <Pie isAnimationActive={false} dataKey="value" data={this.state.todaysMacros} cx={200} cy={200} outerRadius={80} fill="#8884d8" label/>
                <Pie data={data02} dataKey="value" cx={500} cy={200} innerRadius={40} outerRadius={80} fill="#82ca9d"/>
                <Tooltip/>
                </PieChart>
            </div>
            <hr/>
        </div>
    )}
}
    
const mapStateToProps = (state) => {
    const { email } = state.reducer
    return { email }
}

export default connect(mapStateToProps, null)(DailySummary);
  