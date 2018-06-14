import React from "react";
import {
  Table,
  TableBody,
  TableHeader,
  TableHeaderColumn,
  TableRow,
  TableRowColumn
} from "material-ui/Table";

class USDAresultsList extends React.Component {
  constructor(props) {
    super(props);
  }
  render() {
    return (
      <Table
        className="table"
        style={{
          backgroundColor: "white",
          border: "white"
        }}
      >
        <TableHeader displaySelectAll={false} adjustForCheckbox={false}>
          <TableRow>
            <TableHeaderColumn
              style={{
                border: "white"
              }}
            />
          </TableRow>
        </TableHeader>

        <TableBody displayRowCheckbox={false}>
          {this.props.usdaResults.map((item, index) => (
            <TableRow className="table" key={index}>
              <TableRowColumn>
                <li
                  className="test3"
                  onClick={() => {
                    this.props.handleClick(item.ndbno);
                  }}
                >
                  {item.name}
                </li>
              </TableRowColumn>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    );
  }
}

export default USDAresultsList;
