const express = require('express')

const collectionRouter = express.Router()
const Collection = require('../models/Collection')

//Creates new collection
collectionRouter.post('/', (req, res) => {
    const newCollection = req.body.inputs
    const collection = new Collection({
            collectionName: newCollection.name,
            creatorID: newCollection.creatorID,
            
    })
    collection.save((err, result) => {
        if (err){
            console.log(err)
        }
        console.log(result)
        res.send(result)
    })
})

//Updates existing collection
collectionRouter.put('/:id', (req, res) => {
    const recipe = req.body.inputs
    const {id} = req.params

    console.log(req.body)

    Collection.updateOne({_id: id}, {$push: {recipes: recipe}}, (err, result) => {
        if (err){
            console.log(err)
        }
        res.send(result)
    })
})


//Gets all collections owned by signed in user
collectionRouter.get('/user/:id', (req, res) => {
    const {id} = req.params
    Collection.find({creatorID: id}).exec((err, result) => {
        if (err){
            console.log(err)
        }
        res.send(result)
    })

})

module.exports = collectionRouter