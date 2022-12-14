const mongoose = require('mongoose')

const collectionSchema = new mongoose.Schema({
    collectionName: {type: String, required: true},
    lastUpdated: {type: Date, required: true, default: Date.now()},
    creatorID: {type: String, required: true},
    recipes: [{
        recipe: {},
        recipeID: {type: String, require: true},
        dateAdded: {type: Date, required: true, default: Date.now()},
        

}]
})
module.exports = mongoose.model('collection', collectionSchema)