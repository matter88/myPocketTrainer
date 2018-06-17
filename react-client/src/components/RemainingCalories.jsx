import React from 'react';
import helpers from '../helpers.js';
import { connect } from 'react-redux';

const RemainingCalories = (props) => {
    return (
        <h3>
            {props.stats === undefined ? null : props.stats[0].calories - helpers.calculateDailyCalories(props.items) + "  calories remain"}
        </h3>
    )
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

export default connect(mapStateToProps,null)(RemainingCalories);