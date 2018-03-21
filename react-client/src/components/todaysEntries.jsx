import React from 'react';
import {
Table,
TableBody,
TableHeader,
TableHeaderColumn,
TableRow,
TableRowColumn,
TableFooter
} from 'material-ui/Table';
import ActionDelete from 'material-ui/svg-icons/action/delete';
import RaisedButton from 'material-ui/RaisedButton';
import { connect } from 'react-redux';
import axios from 'axios';
import store from '../reducers/store.js';
import { deleteEntry } from '../actions';



const style = {
margin: 12,
};

class TodaysEntries extends React.Component {
  constructor(props) {
  super(props);
  this.state = {
    selectedRows: [],
  }
  
  this.onRowSelection = this.onRowSelection.bind(this)
  this.handleDelete = this.handleDelete.bind(this)
}

onRowSelection(selectedRows) {
  if (selectedRows.length === 0) { // due to a bug in material-ui
    setTimeout(() => { this.setState({ selectedRows: this.state.selectedRows }) }, 100);
    return;
  };

  this.setState({ selectedRows });
}

handleDelete() {
  let selectedRows = this.state.selectedRows
  
  for (let i = 0; i < selectedRows.length; i++) {
  
    let ele = selectedRows[i];
    let objId = this.props.items[ele]["_id"]

    store.dispatch(deleteEntry(objId))
  }
}

render() {
  let test;

  if (this.props.items) {
    test = 
    
    <TableFooter adjustForCheckbox={true}>
      <TableRow>
      <TableRowColumn colSpan="5" style={{textAlign: 'right'}}>
      <RaisedButton
    primary={true}
    label="DELETE"
    labelPosition="after"
    icon={<ActionDelete/>}
    onClick={this.handleDelete}
    />
    </TableRowColumn>
    </TableRow>
    </TableFooter>
  } else {
    test = null;
  }
  return(
    <div>
      {this.props.items === undefined ? 
      null :  
      <Table
      className="table"
      multiSelectable={true}
      style={style} 
      onRowSelection={this.onRowSelection}
      fixedHeader={true}
      selectable={true}
      >
      
      {this.props.items.length === 0 ?  

      null : 
      <TableHeader >
        <TableRow>
          <TableHeaderColumn >Select All Entries / Unselect All Entries</TableHeaderColumn>
        </TableRow>
      </TableHeader>
      }
      <TableBody deselectOnClickaway={false} >
      {this.props.items.map((nutri, index) =>
      <TableRow 
      className="table"
      key={index}
      selected={this.state.selectedRows.indexOf(index) !== -1}
      >
      <TableRowColumn           
      >
      {nutri.Name}
      </TableRowColumn>
      </TableRow>
      )}
      </TableBody>
  
        {test}
  

    </Table>
    }
    </div>
  )}    
}

const mapStateToProps = (state) => {
  const { stats } = state.getUserStats
  const { email } = state.reducer
  const { items } = state.todaysEntries
  return { 
    email,
    items,
    stats
  }
}

export default connect(mapStateToProps, null)(TodaysEntries);