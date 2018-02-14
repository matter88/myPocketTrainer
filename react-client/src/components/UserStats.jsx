import React from 'react';
import { connect } from 'react-redux';
import axios from 'axios';
import Landing from './Landing.jsx';
import SetCalories from './SetCalories.jsx';
import DailySummary from './DailySummary.jsx';
import { setUserStats } from '../actions/index.js';
import store from '../reducers/store.js';
import { Redirect } from 'react-router-dom'

const styles = {
  customWidth: {
    width: 200,
  },
};

class UserStats extends React.Component {
    constructor(props){
        super(props);
        this.state = {
            activityLevel: "sedentary",
            goal: "Lose",
            gender: "Male",
            weight: 0,
            height: 0,
            age: 0,
            calories: "",
            macros: null
        }
        this.handleActivityLevel = this.handleActivityLevel.bind(this)
        this.handleGender = this.handleGender.bind(this)
        this.handleSubmitUserStats = this.handleSubmitUserStats.bind(this)
        this.handleGoal = this.handleGoal.bind(this)
        this.handleAge = this.handleAge.bind(this)
        this.handleFeet = this.handleFeet.bind(this)
        this.handleInches = this.handleInches.bind(this)
        this.handleWeight = this.handleWeight.bind(this)
        this.handleInputChange = this.handleInputChange.bind(this)
    }

    handleFeet(event) {
        var feetInCM = event.target.value * 30.48
        console.log('feetInCM',feetInCM)
        this.setState({
            height: this.state.height + feetInCM
        })
    }

    handleInches(event) {
        var inchesInCM = event.target.value * 2.54
        this.setState({
            height: this.state.height + inchesInCM
        })
    }

   handleActivityLevel(event) {
        this.setState({
            activityLevel: event.target.value
        })
    }

    handleGender(event, index, value2) {
        this.setState({
            value2
        })
    }

    handleGoal(event) {
        this.setState({
            goal: event.target.value
        })
    }

    handleWeight(event) {
        let inputWeight = event.target.value  * 0.453592
        this.setState({
            weight: inputWeight
        })
    }

    handleAge(event) {
        this.setState({
            age: event.target.value
        })
    }

    calculateCalories(obj){
        let restingEnergy = null;
        let TDEE = null;
        let totalTDEE = null;


        if (obj.gender === "male") {
            restingEnergy = 10 * this.state.weight + 6.25 * this.state.height - 5 * this.state.age + 5
        } else if (obj.gender === "female") {
            restingEnergy = 10 * this.state.weight + 6.25 * this.state.height - 5 * this.state.age - 161
        }

        if (obj.activityLevel === "sedentary" ) {
            TDEE = restingEnergy * 1.2;
        } else if (obj.activityLevel === "lightActivity") {
            TDEE = restingEnergy * 1.375;
        } else if (obj.activityLevel === "moderateActivity") {
            TDEE = restingEnergy * 1.55;
        } else if (obj.activityLevel === "veryActive") {
            TDEE = restingEnergy * 1.725;
        }

        if (obj.goal === "lose") {
            totalTDEE = TDEE - ( TDEE * .20 )
        } else if (obj.goal === "lose10%") {
            totalTDEE = TDEE - ( TDEE * .10 )
        } else if (obj.goal === "gain") {
            totalTDEE = TDEE + ( TDEE * .20)
        }

        console.log('calculate calories: ', totalTDEE )
        return Math.round(totalTDEE);
        
    }

    handleSubmitUserStats(event) {
        event.preventDefault()
        let calcCalories;
        let macrosNutrients;
        const { email } = this.props
        var userBodyData = {
            age: this.state.age,
            weight: this.state.weight,
            height: this.state.height,
            gender: this.state.gender,
            goal: this.state.goal,
            activityLevel: this.state.activityLevel
          }
          
        calcCalories = this.calculateCalories(userBodyData);  
        macrosNutrients = this.calculateMacros(calcCalories)
        
        userBodyData["email"] = email;
        userBodyData["calories"] = calcCalories;
        userBodyData["protiens"] = macrosNutrients.protiens;
        userBodyData["carbohydrates"] = macrosNutrients.carbohydrates;
        userBodyData["fats"] = macrosNutrients.fats
        userBodyData['createdAt']= new Date();

       
  
        store.dispatch(setUserStats(userBodyData))


        axios.post('banx/userStats', userBodyData)
          .then((response)=>{
              console.log(response.data)
            this.setState({
                calories: calcCalories,
                macros: macrosNutrients
            })
          })
          .catch((error)=> {
            console.log(error);
          });
    }

    calculateMacros(calories) {
        var obj = {};
        obj["protiens"] = calories / 4;
        obj["carbohydrates"] = calories / 4;
        obj["fats"] = calories / 9;

        return obj;
    }

    handleInputChange(event) {
        const target = event.target;
        const value = target.type === 'checkbox' ? target.checked : target.value;
        const name = target.name;
    
        this.setState({
          gender: name
        });
      }

    render() {
        if (this.state.macros) {
            return <Redirect to="/Journal"/>
        }
        if (this.props.email === undefined) {
            return <Redirect to="/"/>
        }
        return (
            <div className = "profile">
               <h2>Profile</h2>
                <form>
                <label>
                Age:
                <input name="age" type="number" onChange={this.handleAge} />
                </label>
                <label>
                Weight:
                <input name="weight" type="number" onChange={this.handleWeight} />
                </label>
                <br />
                <label>
                Feet:
                <input name="feet" type="number" onChange={this.handleFeet} />
                </label>
                <label>
                Inches:
                <input  name="inches" type="number" onChange={this.handleInches} />
                </label>
                <label>
                Female:
                <input name="female" type="checkbox" checked={this.state.female} onChange={this.handleInputChange} />
                </label>
                <label>
                Male:
                <input name="male" type="checkbox" checked={this.state.male} onChange={this.handleInputChange} />
                </label>
                <br/>
                <label>
                Activity Level:
                <select value={this.state.value} onChange={this.handleActivityLevel}>
                    <option value="sedentary">Sedentary</option>
                    <option value="lightActivity">Light Activity</option>
                    <option value="moderateActivity">Moderate Activity</option>
                    <option value="veryActive">Very Active</option>
                </select>
                </label>
                <br/>
                <label>
                Goal:
                <select value={this.state.value} onChange={this.handleGoal}>
                    <option value="lose">Lose</option>
                    <option value="lose10%">Lose 10%</option>
                    <option value="maintain">Maintain</option>
                    <option value="gain">Gain</option>
                </select>
                </label>
                <br/>
                <input type="submit" value="Submit" onClick={this.handleSubmitUserStats} />
                
                </form> 
            </div>
        )
    }
}



var mapStateToProps = function(state) {
    const { email } = state.reducer
    return {
        email
    }
}

export default connect(mapStateToProps, null)(UserStats);
