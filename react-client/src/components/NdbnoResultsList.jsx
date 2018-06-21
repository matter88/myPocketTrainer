import React from 'react';

import store from '../reducers/store.js'
import { setServingSize } from '../actions/index.js'
import { connect } from 'react-redux'
import { Table } from 'react-bootstrap'


class NdbnoResultsList extends React.Component {
  constructor(props) {
    super(props);
    this.setState = {
      searchInput: '',
      usdaList: [],
      usdaResults: [],
      testState: '',
      ndbno: null,
      nutrients: [],
      itemName: ""
    }
    this.handleChange = this.handleChange.bind(this)
  }

  handleChange(event) {
    store.dispatch(setServingSize(event.target.value))
  }

 

  render() {
    // let size = this.props.size
    // let temp = this.props.nutrients
    // let labelIndex;

    // for (let i = 0; i < temp.length; i++) {
    //   let sizeObj = temp[i];

    //   if (size === sizeObj.label) {
    //     labelIndex = i;
    //   }
    // }

    return (

    //   <Table style={{
    //     backgroundColor: 'white',
    //     border: 'white'
    //   }}>

    //     {this.props.nutrients.length === 0 ?

    //       <TableHeader displaySelectAll={false} adjustForCheckbox={false}>
    //         <TableRow className="table">
    //           <TableHeaderColumn></TableHeaderColumn>
    //         </TableRow>
    //       </TableHeader> :

    //       <TableHeader displaySelectAll={false} adjustForCheckbox={false}>
    //         <TableRow className="table">
    //           <TableHeaderColumn>
    //             {this.props.itemName}
    //             <select onChange={this.handleChange}>
    //               {this.props.nutrients[0].measures.map((measure, index) =>
    //                 <option key={index} value={measure.label}>{measure.label}</option>)}
    //             </select>
    //             <FloatingActionButton type="submit" value="add to my daily intake" onClick={() => { this.props.saveToDB() }}>
    //               <ContentAdd />
    //             </FloatingActionButton>
    //           </TableHeaderColumn>
    //         </TableRow>
    //       </TableHeader>}


    //     <TableBody displayRowCheckbox={false}>
    //       {labelIndex === undefined ?

    //         <TableRow /> :

    //         this.props.nutrient.map((nutri, index) =>
    //           <TableRow className="table" key={index}>
    //             <TableRowColumn>{nutri.name === "Energy" ? "Calories" : nutri.name}</TableRowColumn>
    //             <TableRowColumn>{nutri.measures[labelIndex].value + "  "}{nutri.unit === "kcal" ? "calories" : nutri.unit}</TableRowColumn>
    //           </TableRow>
    //         )}
    //     </TableBody>

    //   </Table>

      
<div className="result-list">
<Table striped bordered condensed hover>
<thead>
  <tr>
    <th>Which one?</th>
  </tr>
</thead>
<tbody>
  {this.props.nutrients.map((nutrient, index) => 
   ( <tr key={index}>
      <td>{nutrient.name}</td>
    </tr>)
  )}
</tbody>
</Table>
</div>
    )
  }
}

const mapStateToProps = (state) => {
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

export default connect(mapStateToProps, null)(NdbnoResultsList);