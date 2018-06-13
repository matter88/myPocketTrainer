import React from "react";
import App from "./App.jsx";

class PreApp extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <div className="body">
       
        <header id="showcase">
            {/* <h1>welcom to the beach</h1>
            <p>Lorem ipsum dolor sit amet, consectetur adipisicing elit. Sapiente nesciunt numquam possimus adipisci amet nobis.</p> */}
            <a href="#" className='button'>Log In</a>
        </header>
        <section id="section-a">
          <div className="container">
            <h3>If it fits your macros 101</h3>
            <p>
              Macros, short for "macronutrients," is the term used to describe
              the three major (or macro) nutrients: protein, carbohydrates, and
              fat. Rather than placing all of your attention on counting
              calories or demonizing certain macronutrients, IIFYM focuses on
              meeting daily macro goals. Done correctly, this provides a
              consistent calorie intake, but one that can be personalized in
              endless different ways. At first glance this may seem needlessly
              complicated: "Why count three different things when I can count
              just one?" The answer is that by emphasizing specific amounts of
              each macronutrient (and choosing quality sources), you can better
              tailor it to your lifestyle, tastes, and goals.
            </p>
            <p> -Paul Salter, MS, RD</p>
          </div>
        </section>

        <section id="section-b">
          <div className="container">
            <h3>Origins</h3>
            <p>
              The IIFYM diet was originally designed by fitness enthusiast
              Anthony Collova after he became frustrated with traditional
              dieting recommendations. IIFYM is a new spin on dieting that
              focuses on macronutrients rather than calories. Macronutrients, or
              macros, are the four types of food molecules the body can break
              down for energy. Three types of macronutrients are tracked in
              IIFYM: Protein, which has 4 calories per gram. Carbohydrates,
              which have 4 calories per gram. Fat, which has 9 calories per
              gram. Alcohol is the fourth macronutrient, containing 7 calories
              per gram, but it is not included in the IIFYM diet. Following the
              IIFYM diet is pretty simple, and only requires a few steps:
              Calculating your macros: Calculations are used to determine how
              many grams of protein, carbs and fat you need each day in order to
              meet your weight goals. Meeting your macros: Once you know your
              macros, you just need to stay within them each day. Food intake is
              tracked and adjusted as needed. Since all foods are allowed, many
              people consider this diet a welcome change from strict calorie
              counting or eliminating entire food groups.
            </p>
            <p>- Eric Julson, MS, RDN, CLT</p>
          </div>
        </section>
        <section id="section-c">
        <div className="box-1">Lorem ipsum dolor sit amet consectetur adipisicing elit. Odit quia modi unde laborum sequi, dolorum voluptatibus alias nesciunt molestiae maxime!</div>
        <div className="box-2">Lorem ipsum dolor sit amet consectetur adipisicing elit. Odit quia modi unde laborum sequi, dolorum voluptatibus alias nesciunt molestiae maxime!</div>
        <div className="box-3">Lorem ipsum dolor sit amet consectetur adipisicing elit. Odit quia modi unde laborum sequi, dolorum voluptatibus alias nesciunt molestiae maxime!</div>
          {/* <div className="container">
            <h3>Origins</h3>
            <p>
              The IIFYM diet was originally designed by fitness enthusiast
              Anthony Collova after he became frustrated with traditional
              dieting recommendations. IIFYM is a new spin on dieting that
              focuses on macronutrients rather than calories. Macronutrients, or
              macros, are the four types of food molecules the body can break
              down for energy. Three types of macronutrients are tracked in
              IIFYM: Protein, which has 4 calories per gram. Carbohydrates,
              which have 4 calories per gram. Fat, which has 9 calories per
              gram. Alcohol is the fourth macronutrient, containing 7 calories
              per gram, but it is not included in the IIFYM diet. Following the
              IIFYM diet is pretty simple, and only requires a few steps:
              Calculating your macros: Calculations are used to determine how
              many grams of protein, carbs and fat you need each day in order to
              meet your weight goals. Meeting your macros: Once you know your
              macros, you just need to stay within them each day. Food intake is
              tracked and adjusted as needed. Since all foods are allowed, many
              people consider this diet a welcome change from strict calorie
              counting or eliminating entire food groups.
            </p>
            <p>- Eric Julson, MS, RDN, CLT</p>
          </div> */}
        </section>
      </div>
    );
  }
}

export default PreApp;
