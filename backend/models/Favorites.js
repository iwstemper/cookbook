const mongoose = require('mongoose')

const Favorites = new mongoose.Schema({
    creatorID: {type: String, required: true},
    recipeID: {type: String, required: true},
    dateAdded: {type: Date, required: true, default: Date.now()}
})

module.exports = mongoose.model('favorites', Favorites)