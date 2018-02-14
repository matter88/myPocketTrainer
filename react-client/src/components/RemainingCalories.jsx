import React from 'react';

const RemainingCalories = (props) => {
    return (
        <h3>
            {props.userStats === null ? null : props.userStats.calories - props.todaysCalories + "  remaing calories"}
        </h3>
    )
}

export default RemainingCalories;