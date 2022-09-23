const mongoose = require('mongoose')

const recipeSchema = new mongoose.Schema({
    recipeName: {type: String, required: true},
    dishType: {type: String, required: true},
    cuisineType: {type: String, required: true},
    prepTime: {
        hrs: {type: Number, required: false},
        mins: {type: Number, required: false}
    },
    cookTime: {
        hrs: {type: Number, required: false},
        mins: {type: Number, required: false}
    },
    servings: {type: Number, required: true},
    instructions: {type: Array, required: true},
    ingredients: [
        {
            ingredientName: {type: String, required: true},
            quantity: {type: Number, required: true},
            unitOfMeasure: {type: String}
        }
    ],
    notes: {type: Array, required: false},
    dateAdded: {type: Date, required: true, immutable: true, default: Date.now()},
    favorites: {type: Number, required: true, default: 0},
    creator: {type: String, required: false},
    imageURL: {type: String, require: true},
    imageID: {type: String, required: true}
})

module.exports = mongoose.model('Recipe', recipeSchema)