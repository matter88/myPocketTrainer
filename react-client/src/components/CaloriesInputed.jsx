import React from 'react';
import helpers from '../helpers.js';

import { connect } from 'react-redux';

const CaloriesInputed = (props) => {
    return (
        <span>
            {props.items === undefined ? 
                2000 : 
                helpers.calculateDailyCalories(props.items) + "   =   "}
                 
        </span>
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

export default connect (mapStateToProps, null)(CaloriesInputed);