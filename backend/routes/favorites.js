const express = require('express')

const favoritesRouter = express.Router()
const Favorites = require('../models/Favorites')
const Recipe = require('../models/Recipe')

//Creates new user favorites
favoritesRouter.post('/:id', async (req, res) => {
    const {id} = req.params
    const {recipeID, operation} = req.body
    if (operation === 'add'){
        const favorite = new Favorites({creatorID: id, recipeID: recipeID})
        
        try {
            let result = await favorite.save()
            let result2 = await Recipe.updateOne({_id: recipeID}, {$inc: {favorites: 1}}).exec()
            console.log(result2)
            res.send(result2)

        } catch (error) {
            console.log(error)
            res.send(error)
        }
    }
    else if (operation === 'remove'){
        try {
            let result = await Favorites.deleteOne({recipeID: recipeID, creatorID: id}).exec()
            let result2 = await Recipe.updateOne({_id: recipeID}, {$inc: {favorites: -1}}).exec()
            console.log(result2)
            res.send(result2)
        } catch (error) {
            console.log(error)
            res.send(error)
        }
    }
})


favoritesRouter.get('/:id', (req, res) => {
    const {id} = req.params

    Favorites.find({creatorID: id}, (err, record) => {
        if (err){
            console.log(err)
            res.send(err)
        }
        res.send(record)
    })
})

module.exports = favoritesRouter