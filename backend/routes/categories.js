const express = require('express')
const categoryRouter = express.Router()
const Recipe = require('../models/Recipe')
const Favorites = require('../models/Favorites')

categoryRouter.get('/popular', async (req, res) => {
    try{
        let recipes = await Recipe.find().sort('-favorites').limit(10).exec()
        res.send(recipes)
    }
    catch(err){
        console.log(err)
        res.json(err)
    }
})

categoryRouter.get('/popular/ingredients', async (req,res) => {
    try {
        let ingredients = await Recipe.aggregate([
            {$unwind: '$ingredients'},
            {$group: {_id: '$ingredients.ingredientName', count: {$sum: 1}},
            }
        ]).sort('-count').limit(12).exec()
        res.send(ingredients)
    }
    catch (err){
        console.log(err)
        res.send(err)
    }
})

categoryRouter.get('/quickAndEasy', async (req, res) => {
    try {
        let recipes = await Recipe.aggregate([
            {$project: {'total': {$add: [{$multiply:['$prepTime.hrs', 90]}, '$prepTime.mins']}}},
            {$match: {'total': {'$lte': 60}}}
        ])
        .exec()                    
        let recipeIDs = recipes.map(item => item._id)
        let quickRecipes = await Recipe.find({_id: {'$in': recipeIDs}}).sort('-favorites').exec()
        res.send(quickRecipes)
    } catch (err) {
        console.log(err)
        res.send(err)
    }
})

categoryRouter.get('/seasonal', async (req, res) => {
    try {
        let lastMonth = new Date()
        lastMonth.setDate(lastMonth.getDate() - 30)
        let recipes = await Recipe.find({dateAdded: {$gte: lastMonth}}).sort('-favorites').exec()
        res.send(recipes)
    } catch (err) {
        console.log(err)
        res.send(err)
    }
})


categoryRouter.get('/cuisines', async (req,res) => {
    try{
        let cuisines = await Recipe.distinct("cuisineType").exec()
        res.send(cuisines)
    }
    catch (err){
        console.log(err)
        res.send(err)
    }
})

categoryRouter.get('/cuisines/:cuisine', async (req, res) => {
    const {cuisine} = req.params
    console.log(cuisine)
    try {
        let recipes = await Recipe.find({cuisineType: {$regex: cuisine, $options: 'i'}}).exec()
        res.send(recipes)
    } catch (err) {
        console.log(err)
        res.send(err)
    }
})

categoryRouter.get('/courses', async (req,res) => {
    try{
        let courses = await Recipe.distinct("dishType").exec()
        res.send(courses)
    }
    catch (err){
        console.log(err)
        res.send(err)
    }
})

categoryRouter.get('/trending', async (req, res) => {
    let lastMonth = new Date()
    lastMonth.setDate(lastMonth.getDate() - 15)
    try{
        let recordIDs = await Favorites.aggregate([{$match: {dateAdded: {$gte: lastMonth}}}, {$group: {_id: '$recipeID', count: {$sum: 1}}}])
        recordIDs = recordIDs.map(item => item._id)
        let recipes = await Recipe.find({_id: {$in: recordIDs}}).exec()
        res.send(recipes)
    }
    catch (err) {
        console.log(err)
        res.send(err)
    }
})

categoryRouter.get('/courses/:course', async (req,res) => {
    const {course} = req.params

    try {
        let recipes = await Recipe.find({dishType: {$regex: course, $options: 'i'}}).exec()
        res.send(recipes)
    }
    catch (err) {
        console.log(err)
        res.send(err)
    }
})

module.exports = categoryRouter
