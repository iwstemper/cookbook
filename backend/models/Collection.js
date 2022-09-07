const mongoose = require('mongoose')

const collectionSchema = new mongoose.Schema({
    collectionName: {type: String, required: true},
    lastModified: {type: Date, required: true, default: Date.now()},
    creatorID: {type: String, required: true},
    recipes: []
})

module.exports = mongoose.model('Collection', collectionSchema)