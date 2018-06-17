import React from 'react';
import { connect } from 'react-redux';
import axios from 'axios';
import { setUserStats } from '../actions/index.js';
import store from '../reducers/store.js';
import { Redirect } from 'react-router-dom'
import { 
    FieldGroup, 
    Checkbox,   
    Radio,
    ControlLabel,
    FormGroup,
    FormControl,
    Button
    } from "react-bootstrap";
import { TextField,MenuItem, SelectField, FlatButton } from 'material-ui';

class UserStats extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            activityLevel: "sedentary",
            goal: "lose",
            gender: "Male",
            weight: 0,
            height: 0,
            age: 0,
            calories: "",
            macros: null,
            value: 1
        }
        // this.handleActivityLevel = this.handleActivityLevel.bind(this)
        // this.handleGender = this.handleGender.bind(this)
        // this.handleSubmitUserStats = this.handleSubmitUserStats.bind(this)
        // this.handleGoal = this.handleGoal.bind(this)
        // this.handleAge = this.handleAge.bind(this)
        // this.handleFeet = this.handleFeet.bind(this)
        // this.handleInches = this.handleInches.bind(this)
        // this.handleWeight = this.handleWeight.bind(this)
        // this.handleInputChange = this.handleInputChange.bind(this)
    }

    // handleFeet(event) {
    //     var feetInCM = event.target.value * 30.48
    //     this.setState({
    //         height: this.state.height + feetInCM
    //     })
    // }

    // handleInches(event) {
    //     var inchesInCM = event.target.value * 2.54
    //     this.setState({
    //         height: this.state.height + inchesInCM
    //     })
    // }

    // handleActivityLevel(event, index, value) {
    //     this.setState({
    //         activityLevel: value
    //     })
    // }

    // handleGender(event, index, value2) {
    //     this.setState({
    //         value2
    //     })
    // }

    // handleGoal(event, index, value) {
    //     this.setState({
    //         goal: value
    //     })
    // }

    // handleWeight(event) {
    //     let inputWeight = event.target.value * 0.453592
    //     this.setState({
    //         weight: inputWeight
    //     })
    // }

    // handleAge(event) {
    //     this.setState({
    //         age: event.target.value
    //     })
    // }

    // calculateCalories(obj) {
    //     let restingEnergy = null;
    //     let TDEE = null;
    //     let totalTDEE = null;


    //     if (obj.gender === "male") {
    //         restingEnergy = 10 * this.state.weight + 6.25 * this.state.height - 5 * this.state.age + 5
    //     } else if (obj.gender === "female") {
    //         restingEnergy = 10 * this.state.weight + 6.25 * this.state.height - 5 * this.state.age - 161
    //     }

    //     if (obj.activityLevel === "sedentary") {
    //         TDEE = restingEnergy * 1.2;
    //     } else if (obj.activityLevel === "lightActivity") {
    //         TDEE = restingEnergy * 1.375;
    //     } else if (obj.activityLevel === "moderateActivity") {
    //         TDEE = restingEnergy * 1.55;
    //     } else if (obj.activityLevel === "veryActive") {
    //         TDEE = restingEnergy * 1.725;
    //     }

    //     if (obj.goal === "lose") {
    //         totalTDEE = TDEE - (TDEE * .20)
    //     } else if (obj.goal === "lose10%") {
    //         totalTDEE = TDEE - (TDEE * .10)
    //     } else if (obj.goal === "gain") {
    //         totalTDEE = TDEE + (TDEE * .20)
    //     }

    //     return Math.round(totalTDEE);

    // }

    // handleSubmitUserStats(event) {
    //     event.preventDefault()
    //     let calcCalories;
    //     let macrosNutrients;
    //     const { email } = this.props
    //     var userBodyData = {
    //         age: this.state.age,
    //         weight: this.state.weight,
    //         height: this.state.height,
    //         gender: this.state.gender,
    //         goal: this.state.goal,
    //         activityLevel: this.state.activityLevel
    //     }

    //     calcCalories = this.calculateCalories(userBodyData);
    //     macrosNutrients = this.calculateMacros(calcCalories)

    //     userBodyData["email"] = email;
    //     userBodyData["calories"] = calcCalories;
    //     userBodyData["protiens"] = macrosNutrients.protiens;
    //     userBodyData["carbohydrates"] = macrosNutrients.carbohydrates;
    //     userBodyData["fats"] = macrosNutrients.fats
    //     userBodyData['createdAt'] = new Date();



    //     store.dispatch(setUserStats(userBodyData))


    //     axios.post('banx/userStats', userBodyData)
    //         .then((response) => {
    //             this.setState({
    //                 calories: calcCalories,
    //                 macros: macrosNutrients
    //             })
    //         })
    //         .catch((error) => {
    //             console.log(error);
    //         });
    // }

    // calculateMacros(calories) {
    //     var obj = {};
    //     obj["protiens"] = Math.round(calories / 4);
    //     obj["carbohydrates"] = Math.round(calories / 4);
    //     obj["fats"] = Math.round(calories / 9);

    //     return obj;
    // }

    // handleInputChange(event) {
    //     const target = event.target;
    //     const value = target.type === 'checkbox' ? target.checked : target.value;
    //     const name = target.name;

    //     this.setState({
    //         gender: name
    //     });
    // }


    render() {
        // let userStats = this.props.stats[0]
        // if (this.state.macros) {
        //     return <Redirect to="/Journal" />
        // }
        // if (this.props.email === undefined) {
        //     return <Redirect to="/" />
        // }
        return (
            // <div className="profile">
            //     <h2>Body Statistics</h2>

            //     Female:
            //     <input name="female" type="checkbox" checked={this.state.female} onChange={this.handleInputChange} />


            //     Male:
            //     <input name="male" type="checkbox" checked={this.state.male} onChange={this.handleInputChange} />

            //     <br />
            //     <TextField
            //         type="number"
            //         defaultValue={userStats.age}
            //         floatingLabelText="Age"
            //         onChange={this.handleAge}
            //     />
            //     <TextField
            //         type="number"
            //         defaultValue={Math.round(userStats.weight * 2.20462)}
            //         floatingLabelText="Weight"
            //         onChange={this.handleWeight}
            //     /><br />
            //     <TextField
            //         type="number"
            //         defaultValue={Math.floor(userStats.height / 12)}
            //         floatingLabelText="Feet"
            //         onChange={this.handleFeet}
            //     />
            //     <TextField
            //         type="number"
            //         defaultValue={Math.round(userStats.height % 12)}
            //         floatingLabelText="Inches"
            //         onChange={this.handleInches}
            //     />



            //     <SelectField
            //         floatingLabelText="Activity Level"
            //         value={userStats.activityLevel}
            //         onChange={
            //             this.handleActivityLevel

            //         }
            //     >
            //         <MenuItem value="sedentary" primaryText="Sedentary" />
            //         <MenuItem value="lightActivity" primaryText="Light Activity" />
            //         <MenuItem value="moderateActivity" primaryText="Moderate Activity" />
            //         <MenuItem value="veryActive" primaryText="Very Active" />
            //         <MenuItem value="weekly" primaryText="Weekly" />
            //     </SelectField>


            //     <SelectField
            //         value={userStats.goal}
            //         floatingLabelText="Goal"
            //         onChange={this.handleGoal}
            //     >
            //         <MenuItem value="lose" primaryText="Lose" />
            //         <MenuItem value="lose10%" primaryText="Lose10%" />
            //         <MenuItem value="maintain" primaryText="Maintain" />
            //         <MenuItem value="gain" primaryText="Gain" />
            //     </SelectField>
            //     <br />

            //     <FlatButton
            //         label="Update"
            //         primary={true}
            //         onClick={this.handleSubmitUserStats} />
               
            // </div>
            <form>
     
     <Checkbox checked readOnly>
      Male
    </Checkbox>
    <Checkbox checked readOnly>
      Female
    </Checkbox>
    <FormControl
            type="height"
            // value={this.state.value}
            placeholder="Height"
            // onChange={this.handleChange}
          />
           <FormControl
            type="weight"
            // value={this.state.value}
            placeholder="Weight"
            // onChange={this.handleChange}
          />
           <FormControl
            type="age"
            // value={this.state.value}
            placeholder="Age"
            // onChange={this.handleChange}
          />
            <FormGroup controlId="formControlsSelect">
      <ControlLabel>Select Activity Level</ControlLabel>
      <FormControl componentClass="select" placeholder="select">
        {/* <option value="select">select</option>
        <option value="other">...</option>
        <option value="other">...</option>
        <option value="other">...</option> */}

                <option value="sedentary">Sedentary</option>
            <option value="lightActivity">Light Activity</option>
            <option
              value="moderateActivity"
              primaryText=""
            >Moderate Activity</option>
            <option value="veryActive">Very Active</option>
      </FormControl>
    </FormGroup>
            {/* <FieldGroup id="formControlsPassword" label="Password" type="password" />
            <FieldGroup
              id="formControlsFile"
              type="file"
              label="File"
              help="Example block-level help text here."
            />
        
            <Checkbox checked readOnly>
              Checkbox
            </Checkbox>
            <Radio checked readOnly>
              Radio
            </Radio>
        
            <FormGroup>
              <Checkbox inline>1</Checkbox> <Checkbox inline>2</Checkbox>{' '}
              <Checkbox inline>3</Checkbox>
            </FormGroup>
            <FormGroup>
              <Radio name="radioGroup" inline>
                1
              </Radio>{' '}
              <Radio name="radioGroup" inline>
                2
              </Radio>{' '}
              <Radio name="radioGroup" inline>
                3
              </Radio>
            </FormGroup>
        
            <FormGroup controlId="formControlsSelect">
              <ControlLabel>Select</ControlLabel>
              <FormControl componentClass="select" placeholder="select">
                <option value="select">select</option>
                <option value="other">...</option>
              </FormControl>
            </FormGroup>
            <FormGroup controlId="formControlsSelectMultiple">
              <ControlLabel>Multiple select</ControlLabel>
              <FormControl componentClass="select" multiple>
                <option value="select">select (multiple)</option>
                <option value="other">...</option>
              </FormControl>
            </FormGroup>
        
            <FormGroup controlId="formControlsTextarea">
              <ControlLabel>Textarea</ControlLabel>
              <FormControl componentClass="textarea" placeholder="textarea" />
            </FormGroup>
        
            <FormGroup>
              <ControlLabel>Static text</ControlLabel>
              <FormControl.Static>email@example.com</FormControl.Static>
            </FormGroup>
        
            <Button type="submit">Submit</Button> */}
          </form>
        )
    }
}



var mapStateToProps = function (state) {
    const { email } = state.reducer
    const { stats } = state.getUserStats
    return {
        email,
        stats
    }
}

export default connect(mapStateToProps, null)(UserStats);
