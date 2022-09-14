const mongoose = require('mongoose')

const MealPlan = new mongoose.Schema({
        mealPlanName: {type: String, required: true},
        lastUpdated: {type: Date, required: true, default: Date.now()},
        creatorID: {type: String, required: true},
        recipes: [{
                recipeID: {type: String, required: true},
                dateAdded: {type: Date, required: true, default: Date.now()}
        }],
})

module.exports = mongoose.model('mealPlan', MealPlan)