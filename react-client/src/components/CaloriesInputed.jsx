import React from 'react';

const CaloriesInputed = (props) => {
    return (
        <span>
            {props.todaysCalories === null ? 2000 : props.todaysCalories + "   =   "}
        </span>
    )
}

export default CaloriesInputed;