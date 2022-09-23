const express = require('express')
const categoryRouter = express.Router()
const Recipe = require('../models/Recipe')

categoryRouter.get('/popular', async (req, res) => {
    try{
        let recipes = await Recipe.find().sort('-favorites').limit(10).exec()
        console.log(recipes)
        res.send(recipes)
    }
    catch(err){
        console.log(err)
        res.send(err)
    }
})

categoryRouter.get('/cuisines', async (req,res) => {
    try{
        let cuisines = await Recipe.distinct("cuisineType")
        console.log(cuisines)
        res.send(cuisines)
    }
    catch (err){
        console.log(err)
        res.send(err)
    }
})

module.exports = categoryRouter
