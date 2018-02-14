import React from 'react';
import axios from 'axios';
import USDAresultsList from './USDAresultsList.jsx';
import NdbnoResultsList from './NdbnoResultsList.jsx';
import TextField from 'material-ui/TextField';
import FloatingActionButton from 'material-ui/FloatingActionButton';
import ContentAdd from 'material-ui/svg-icons/content/add';
import { connect } from 'react-redux'
import helpers from '../helpers.js';

class USDAsearch extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            searchInput: '',
            usdaList: [],
            usdaResults: [],
            testState: '',
            ndbno: null,
            nutrients: [],
            itemName: ""
        }
        this.handleSearchInput = this.handleSearchInput.bind(this)
        this.handleSubmit = this.handleSubmit.bind(this)
        this.handleClick = this.handleClick.bind(this)
        this.handleSaveToDB = this.handleSaveToDB.bind(this)
    }

handleSearchInput(event) {
    event.preventDefault();
    this.setState({
        searchInput: event.target.value
    })
}

handleSubmit(event) {
    console.log('handle submit invoked')
    event.preventDefault()
    axios.post('/banx/usdaDB', {
        searchTerm: this.state.searchInput,
      })
    .then((response) => {
        console.log(response.data)
        this.setState({
            usdaResults : response.data.list.item
        })
    })
    .catch((error) => {
    console.log(error);
    });
}

handleSubmitNDBNO() {
    event.preventDefault()
    axios.get('banx/usdaReport', {
        params: {
            ndbno : this.state.ndbno
        }
    })
    .then((response) =>{
        console.log('clientside', response.data.report.food.name)
        this.setState({
            searchInput: '',
            usdaList: [],
            ndbno: null,
            usdaResults: [],
            testState: '',
            itemName: response.data.report.food.name,
            nutrients: response.data.report.food.nutrients
        })
    })
    .catch((error) => {
        console.log(error)
    })

}

handleClick(num) {
    this.setState({
        ndbno: num
    }, () => {
        this.handleSubmitNDBNO();
    })
}

handleSaveToDB() {
    var redesignedObj = helpers.redesign(this.state.nutrients)
    const { email } = this.props
    redesignedObj['email'] = email;
    redesignedObj['createdAt']= new Date();
    redesignedObj['Calories'] = redesignedObj['Energy']
    redesignedObj['Fats'] = redesignedObj["Total lipid (fat)"]
    redesignedObj['Name'] = this.state.itemName
    console.log('redesigned obj', redesignedObj)
    axios.post('/banx/caloriesInput', redesignedObj)
    .then(() => {
      this.setState({
        items: [],
        searchItem: ""
      })
    })
    .catch(function (error) {
      console.log(error);
    });
  }

    render() {
        let usda;
        let nutrientList;
        let button;

        if (this.state.testState) {
            return <div>hi</div>
        } 

        this.state.usdaResults.length > 0 ?
        usda = <USDAresultsList
        usdaResults={this.state.usdaResults}
        handleClick={this.handleClick}
        /> :
        <div/>

        this.state.nutrients.length > 0 && this.props.email ?
        nutrientList =  <NdbnoResultsList
        nutrient={this.state.nutrients}
        itemName={this.state.itemName}
        /> : null  

        nutrientList === undefined ? 
        null :
        button = <FloatingActionButton type="submit" value="add to my daily intake" onClick={this.handleSaveToDB}>
                    <ContentAdd />
                 </FloatingActionButton>  
    
    return (
        <div className="mainCenter">
        <form>
            <label>
            <span>
            <TextField
            hintText="What are we eating?"
            floatingLabelText="Macro Search"
            floatingLabelFixed={true}
            value={this.state.searchInput}
            onChange={this.handleSearchInput}
            />
            </span>
         
            </label>
            <input type="submit" value="Submit" onClick={this.handleSubmit} />
        </form>

        {usda}
        {button}
        {nutrientList}
        </div>
    )}
}

const mapStateToProps = (state) => {
    const { email } = state.reducer;
    return {
        email
    }
}

export default connect(mapStateToProps, null)(USDAsearch);
