import React from 'react';
import { MenuItem , ButtonToolbar, DropdownButton} from 'react-bootstrap';
import store from '../reducers/store.js'
import { setServingSize } from '../actions/index.js'
import { connect } from 'react-redux'
import { Table } from 'react-bootstrap'


class NdbnoResultsList extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      searchInput: '',
      usdaList: [],
      usdaResults: [],
      testState: '',
      ndbno: '',
      nutrients: [],
      itemName: "",
    }
    this.handleChange = this.handleChange.bind(this);
    this.handleChangeSelect = this.handleChangeSelect.bind(this)
  }

  handleChange(event) {
    store.dispatch(setServingSize(event.target.value))
  }

  handleChangeSelect(size) {
    store.dispatch(setServingSize(size))
  }

 

  render() {
    let size = this.props.size
    let measuresArr = this.props.nutrients[0].measures;
    let loneMeasure = measuresArr[0].label;
    measuresArr.length === 1 ? this.handleChangeSelect(loneMeasure) : null;
    let temp = this.props.nutrients[0].measures;
    let labelIndex;
    if (temp) {
        for (let i = 0; i < temp.length; i++) {
            let sizeObj = temp[i];

            if (size === sizeObj.label) {
                labelIndex = i;
            }
        }
    }
    console.log('label', labelIndex)
    return (

      
<div className="result-list">


   <div className="table-nutrients">
   <Table striped bordered condensed hover>
<thead>


    <th>Serving Size??</th>  
    <select onChange={this.handleChange} >
              {this.props.nutrients[0].measures.map((measure, index) =>
                <option key={index} value={measure.label}>{measure.label}</option>)}
          </select>
</thead>
<tbody>


  {labelIndex !== undefined ?
this.props.nutrients.map((nutrient, index) =>
<tr className="table" key={index}>
  <td>{nutrient.name === "Energy" ? "Calories" : nutrient.name}</td>
  <td>{nutrient.measures[labelIndex].value + "  "}{nutrient.unit === "kcal" ? "calories" : nutrient.unit}</td>
</tr>
) :
        <tr />

        }
</tbody>
</Table>
</div>
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