import React from "react";
import { ProgressBar } from 'react-bootstrap';

const Progress = () => {
    return (
        <div>
       
           Calories
  <ProgressBar striped bsStyle="success" now={40} />
  Protien
  <ProgressBar striped bsStyle="info" now={20} />
  Fats
  <ProgressBar striped bsStyle="warning" now={60} />
  Carbohydrates
  <ProgressBar striped bsStyle="danger" now={80} />

      </div>
    )
}

export default Progress;