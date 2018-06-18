import React from "react";
import { Table } from "react-bootstrap";

class ResultsListUSDA extends React.Component {
  constructor(props) {
    super(props);
  }
  render() {
    return (
      // <Table
      //   className="table"
      //   style={{
      //     backgroundColor: "white",
      //     border: "white"
      //   }}
      // >
      //   <TableHeader displaySelectAll={false} adjustForCheckbox={false}>
      //     <TableRow>
      //       <TableHeaderColumn
      //         style={{
      //           border: "white"
      //         }}
      //       />
      //     </TableRow>
      //   </TableHeader>

      //   <TableBody displayRowCheckbox={false}>
      //     {this.props.items.map((item, index) => (
      //       <TableRow className="table" key={index}>
      //         <TableRowColumn>
      //           <li
      //             className="test3"
      //             onClick={() => {
      //               this.props.handleClick(item.ndbno);
      //             }}
      //           >
      //             {item.name}
      //           </li>
      //         </TableRowColumn>
      //       </TableRow>
      //     ))}
      //   </TableBody>
      // </Table>
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
            <td>{item.name}</td>
          </tr>)
        )}
      </tbody>
    </Table>
    </div>
    );
  }
}

export default ResultsListUSDA;