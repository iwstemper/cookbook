const express = require('express')

const collectionRouter = express.Router()
const Collection = require('../models/Collection')

//Creates new user collection
collectionRouter.post('/:id', (req, res) => {
    const {id} = req.params
    const collectionName = req.body.inputs

    const collection = new Collection({
            creatorID: id, collectionName: collectionName
            
    })
    collection.save((err, result) => {
        if (err){
            console.log(err)
        }
        console.log(result)
        res.send(result)
    })
})

//Gets all collections owned by signed in user
collectionRouter.get('/:id', (req, res) => {
    const {id} = req.params

    Collection.find({creatorID: id}).exec((err, result) => {
        if (err){
            console.log(err)
        }
        res.send(result)
    })
})

//Updates collection based on provided operation
collectionRouter.put('/:id', (req,res) => {
    const {id} = req.params
    const {recipe, operation} = req.body.inputs

    if (operation === 'add'){
        Collection.updateOne({_id: id}, {lastUpdated: Date.now(), $push: {recipes: {recipeID: recipe._id}}}, (err, record) => {
            if (err){
                console.log(err)
                res.send(err)
            }
            console.log(record)
            res.send(record)
        })
    }
    else if (operation === 'remove'){
        Collection.updateOne({_id: id}, {lastUpdated: Date.now(), $pull: {recipes: {recipeID: recipe._id}}}, (err, result) => {
            if (err){
                console.log(err)
                res.send(err)
            }
            console.log(result)
            res.send(result)
        })
    }
})

//Deletes all of user's collections
collectionRouter.delete('/:id', (req,res) => {
    const {id} = req.params

    Collection.deleteOne({_id: id}, (err, record) => {
        if (err){
            console.log(err)
            res.send(err)
        }
        console.log(record)
        res.send(record)
    })
})



module.exports = collectionRouter