import React from 'react';
import { connect } from 'react-redux';

const SetCalories = (props) => {
    return ( 
        <span>
            {console.log('setcalories', props.stats)}
            {props.stats === undefined ? 2000 : props.stats[0].calories}  {"      -  "}
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

export default connect(mapStateToProps,null)(SetCalories);