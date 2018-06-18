import React from "react";
import { ProgressBar } from 'react-bootstrap';

const Progress = () => {
    return (
        <div>
  <ProgressBar active bsStyle="color: red" now={40} />
  <ProgressBar bsStyle="color: green" now={20} />

</div>
    )
}

export default Progress;