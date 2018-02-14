import React from 'react';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import $ from 'jquery';
import USDAsearch from './USDAsearch.jsx';
import DailySummary from './DailySummary.jsx'
import { connect } from 'react-redux';
import axios from 'axios'
import Paper from 'material-ui/Paper';
import Header from './Header.jsx';
import { Redirect } from 'react-router-dom';


import {
  BrowserRouter as Router,
  Route,
  Link
} from 'react-router-dom'

class Landing extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      items: [],
      searchItem : "",
      caloriesLeft : null,
      allFoods : []
    }
    this.handleGetAllEntriesFromDB = this.handleGetAllEntriesFromDB.bind(this)
    this.handleGetFromDB = this.handleGetFromDB

  }

  handleGetAllEntriesFromDB() {
    console.log('handle get from db here')
    axios.get('/banx/getAllEntries')
    .then((response) => {
      console.log('clientside all entries',response)
      this.setState({
        allFoods: response.data,
        items: [],
        searchItem : "",
        caloriesLeft : null,
      })
    })
    .catch(function (error) {
      console.log(error);
    });
  }


  render () {
    let list;

    this.state.allFoods ? 
    list = this.state.allFoods.map((entry, index) =>
      <li key={index} className="listItem">{entry.searchItem}  {"    "} {entry.calories}
    </li>) : null 


    return ( 
    <div className="mainCenter">
     <USDAsearch/>
        {/* {list} */}
    </div>
    )
  }
}

const mapStateToProps = function(state) {
    const { email } = state;
    return {
        email
    }
}

export default connect(mapStateToProps, null)(Landing);
