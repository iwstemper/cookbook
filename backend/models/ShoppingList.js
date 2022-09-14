const mongoose = require('mongoose')

const shoppingListSchema = new mongoose.Schema({
    creatorID: {type: String, required: true},
    ingredients: [{
        recipeName: {type: String, required: false},
        recipeImage: {type: String, required: false},
        recipeID: {type: String, required: false},
        ingredientName: {type: String, required: false},
        ingredientUOM: {type: String, required: false},
        ingredintQuantity: {type: String, required: false},
        ingredientID: {type: String, required: true},
        purchased: {type: Boolean, required: false, default: false},
        quantity: {type: Number, required: true}
    }]
})

module.exports = mongoose.model('ShoppingList', shoppingListSchema)