import React from 'react';
import {
    Table,
    TableBody,
    TableHeader,
    TableHeaderColumn,
    TableRow,
    TableRowColumn,
  } from 'material-ui/Table';
  import store from '../reducers/store.js'
  import { setServingSize } from '../actions/index.js'
  import { connect } from 'react-redux'



class NdbnoResultsList extends React.Component {
  constructor(props) {
    super(props);

    this.handleChange = this.handleChange.bind(this)
  }

  handleChange(event) {
    console.log('handleChange test ndbno list', event.target.value)
    store.dispatch(setServingSize(event.target.value))
  }

  render() {
    let size = this.props.size
    let temp = this.props.nutrient[0].measures
    let labelIndex;

    for (let i = 0; i < temp.length; i++) {
      let sizeObj = temp[i];

      if (size === sizeObj.label) {
        labelIndex = i;
      }
    }

    return (
      
      <Table style={{backgroundColor:'gray',}} 
      >
       {this.props.nutrient.length === 0 ?  
  
          <TableHeader displaySelectAll={false} adjustForCheckbox={false}>
            <TableRow>
              <TableHeaderColumn></TableHeaderColumn>
            </TableRow>
          </TableHeader> : 
          <TableHeader displaySelectAll={false} adjustForCheckbox={false}>
            <TableRow style={{backgroundColor:'gray',}}>
              <TableHeaderColumn>{this.props.itemName}
              <select  onChange={this.handleChange}>{this.props.nutrient[0].measures.map((measure, index) => 
                <option key={index} value={measure.label}>{measure.label}</option>
              )}

</select>
              </TableHeaderColumn>
            </TableRow>
          </TableHeader>
      }
      <TableBody displayRowCheckbox={false}>
      {labelIndex === undefined ? <TableRow/> :
      this.props.nutrient.map((nutri, index) =>
        <TableRow key={index}>
        <TableRowColumn>{nutri.name === "Energy" ? "Calories" : nutri.name}</TableRowColumn>
        {console.log('insider render strawbery', nutri.measures[labelIndex])}
        <TableRowColumn>{nutri.measures[labelIndex].value + "  "}{nutri.unit === "kcal" ? "calories" : nutri.unit}</TableRowColumn>
      </TableRow>
    )}
      }
      {console.log('right before nutrient mapping', this.props.nutrient)}
      
      </TableBody>
    </Table>
  )
  }
} 

const mapStateToProps = (state) => {
  console.log('ndbno results list inside map state to props', state)
    const { stats } = state.getUserStats
    const { email } = state.reducer
    const { items } = state.todaysEntries
    const { size } = state.setServingSize
    return { 
        email,
        items,
        stats,
        size
    }
}

export default connect (mapStateToProps,  null)(NdbnoResultsList);