import React from 'react';

const SetCalories = (props) => {
    return (
     
        <span>
            {props.userStats === null ? 2000 : props.userStats.calories}  {"   calories   -  "}
        </span>
    )
}

export default SetCalories;