module.exports = {
  calculateCalories: obj => {
    let restingEnergy = null;
    let TDEE = null;
    let totalTDEE = null;

    if (obj.gender === "male") {
      restingEnergy = 10 * obj.weight + 6.25 * obj.height - 5 * obj.age + 5;
    } else if (obj.gender === "female") {
      restingEnergy = 10 * obj.weight + 6.25 * obj.height - 5 * obj.age - 161;
    }

    if (obj.activityLevel === "sedentary") {
      TDEE = restingEnergy * 1.2;
    } else if (obj.activityLevel === "lightActivity") {
      TDEE = restingEnergy * 1.375;
    } else if (obj.activityLevel === "moderateActivity") {
      TDEE = restingEnergy * 1.55;
    } else if (obj.activityLevel === "veryActive") {
      TDEE = restingEnergy * 1.725;
    }

    if (obj.goal === "lose") {
      totalTDEE = TDEE - TDEE * 0.2;
    } else if (obj.goal === "lose10%") {
      totalTDEE = TDEE - TDEE * 0.1;
    } else if (obj.goal === "gain") {
      totalTDEE = TDEE + TDEE * 0.2;
    }

    return Math.round(totalTDEE);
  },

  calculateMacros: calories => {
    var obj = {};
    obj["protiens"] = Math.round(calories / 4);
    obj["carbohydrates"] = Math.round(calories / 4);
    obj["fats"] = Math.round(calories / 9);

    return obj;
  },

  redesign: array => {
    let redesignedObj = {};
    let name;

    for (var i = 0; i < array.length; i++) {
      let obj = array[i];
      name = obj.name;

      for (var j = 0; j < name.length; j++) {
        let char = name[j];
        if (char === ",") {
          name = name.slice(0, j);
        }
      }

      redesignedObj[name] = obj.value;
    }
    return redesignedObj;
  },

  designEntriesArray: array => {
    let resultsArray = [];
    let f = {
      name: "Fats",
      value: 0
    };
    let p = {
      name: "Proteins",
      value: 0
    };
    let c = {
      name: "Carbohydrates",
      value: 0
    };

    for (var i = 0; i < array.length; i++) {
      let obj = array[i];

      p["name"] = "Protein";
      c["name"] = "Carbohydrate";
      f["name"] = "Fats";
      p["value"] += Math.round(obj["Protein"]);
      c["value"] += Math.round(obj["Carbohydrate"]);
      f["value"] += Math.round(obj["Fats"]);
    }

    resultsArray.push(f);
    resultsArray.push(p);
    resultsArray.push(c);
    return resultsArray;
  },

  calculateDailyCalories: array => {
    let totalCalories = 0;

    if (!array) {
      return totalCalories;
    }

    for (var i = 0; i < array.length; i++) {
      var entryCalories = array[i].Calories;

      totalCalories += entryCalories;
    }

    return totalCalories;
  }
};
