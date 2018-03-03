import React from 'react';
import {
    Table,
    TableBody,
    TableHeader,
    TableHeaderColumn,
    TableRow,
    TableRowColumn,
  } from 'material-ui/Table';



const NdbnoResultsList = (props) => {
  console.log('inside ndbno results list', props.nutrient[0].measures)
    return (
      
        <Table>
         {props.nutrient.length === 0 ?  
    
            <TableHeader displaySelectAll={false} adjustForCheckbox={false}>
              <TableRow>
                <TableHeaderColumn></TableHeaderColumn>
              </TableRow>
            </TableHeader> : 
            <TableHeader displaySelectAll={false} adjustForCheckbox={false}>
              <TableRow>
                <TableHeaderColumn>{props.itemName}
                <select>{props.nutrient[0].measures.map((measure, index) => 
                  <option key={index} value={measure.label}>{measure.label}</option>
                )}
  
</select>
                </TableHeaderColumn>
              </TableRow>
            </TableHeader>
        }
        <TableBody displayRowCheckbox={false}>
        {props.nutrient.map((nutri, index) =>
            <TableRow key={index}>
            <TableRowColumn>{nutri.name === "Energy" ? "Calories" : nutri.name}</TableRowColumn>
            <TableRowColumn>{nutri.value + "  "}{nutri.unit === "kcal" ? "calories" : nutri.unit}</TableRowColumn>
          </TableRow>
        )}
        </TableBody>
      </Table>
    )
}

export default NdbnoResultsList;