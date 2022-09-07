const mongoose = require('mongoose')

const userSchema = new mongoose.Schema({
    firstName: {type: String, required: true},
    lastName: {type: String, required: true},
    username: {type: String, required: true},
    email: {type: String, required: true},
    dateJoined: {type: String, required: true, immutable: true, default: Date.now()}
})

module.exports = mongoose.model('user', userSchema)