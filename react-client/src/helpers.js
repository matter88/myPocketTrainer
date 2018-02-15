module.exports = {
    

    redesign : (array) => {
        let redesignedObj = {}
        let name;

        
        for (var i = 0; i < array.length; i++) {
            let obj = array[i];
            name = obj.name;


            for (var j = 0; j < name.length; j++) {
                let char = name[j];
                if (char === ',') {
                    name = name.slice(0, j);
            
                }
            }
        
            redesignedObj[name] = obj.value
        }
        return redesignedObj;
    },

    designEntriesArray : (array) => {
        let resultsArray = []
        let f = {
            name: "Fats",
            value: 0
        } 
        let p = {
            name: "Proteins",
            value: 0
        }
        let c = {
            name: "Carbohydrates",
            value: 0
        }
        
        
        for (var i = 0; i < array.length; i++) {
            let obj = array[i]
            
                p["name"] = "Protein"
                c["name"] = "Carbohydrate"
                f["name"] = "Fats"
                p["value"] += Math.round(obj["Protein"])
                c["value"] += Math.round(obj["Carbohydrate"])
                f["value"] += Math.round(obj["Fats"])
        }

        resultsArray.push(f)
        resultsArray.push(p)
        resultsArray.push(c)
        return resultsArray;
    },

    calculateDailyCalories: (array) => {
        let totalCalories = 0;

        for (var i = 0; i < array.length; i++) {
            var entryCalories = array[i].Calories

            totalCalories += entryCalories;
        }

        return totalCalories;
    }
}