import React from 'react';
import {
    Table,
    TableBody,
    TableHeader,
    TableHeaderColumn,
    TableRow,
    TableRowColumn,
  } from 'material-ui/Table';

const TodaysEntries = (props) => {
    return(
        <div>
            <Table>
         {props.todaysEntries.length === 0 ?  
    
            <TableHeader displaySelectAll={false} adjustForCheckbox={false}>
              <TableRow>
                <TableHeaderColumn></TableHeaderColumn>
              </TableRow>
            </TableHeader> : 
            <TableHeader displaySelectAll={false} adjustForCheckbox={false}>
              <TableRow>
                <TableHeaderColumn>Todays Entries</TableHeaderColumn>
              </TableRow>
            </TableHeader>
        }
        <TableBody displayRowCheckbox={false}>
        {props.todaysEntries.map((nutri, index) =>
            <TableRow key={index}>
            <TableRowColumn>{nutri.Name}</TableRowColumn>
          </TableRow>
        )}
        </TableBody>
      </Table>
        </div>

    )
}

export default TodaysEntries;