import React from "react";
import { Table } from "react-bootstrap";

class ResultsListUSDA extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
     
      <div className="result-list">
    
      <Table striped bordered condensed hover>
      <thead>
        <tr>
          <th>Which one?</th>
        </tr>
      </thead>
      <tbody>
        {this.props.items.map((item, index) => 
         ( <tr key={index}>
            <td onClick={() => {
                    this.props.handleClick(item.ndbno);
                  }}>{item.name}</td>
          </tr>)
        )}
      </tbody>
    </Table>
    </div>
    );
  }
}

export default ResultsListUSDA;