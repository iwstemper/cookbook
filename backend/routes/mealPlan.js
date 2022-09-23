const express = require('express')

const mealPlanRouter = express.Router()
const MealPlan = require('../models/MealPlan')
const Recipe = require('../models/Recipe')

//Creates new user meal plan
mealPlanRouter.post('/:id', (req, res) => {
    const {id} = req.params
    const mealPlanName = req.body.inputs

    const mealPlan = new MealPlan({
        creatorID: id, mealPlanName: mealPlanName
    })
    mealPlan.save((err, result) => {
        if (err){
            console.log(err)
        }
        console.log(result)
        res.send(result)
    })
})

//Gets all collections owned by signed in user
mealPlanRouter.get('/:id', (req, res) => {
    const {id} = req.params

    MealPlan.find({creatorID: id}).exec((err, result) => {
        if (err){
            console.log(err)
        }
        res.send(result)
    })
})

//Adds recipe to existing meal plan
mealPlanRouter.put('/:id', (req, res) => {
    const {id} = req.params
    const {operation} = req.body.inputs
    
    if (operation === 'add'){
        const {recipe} = req.body.inputs
        console.log(recipe)
        MealPlan.updateOne({_id: id}, {lastUpdated: Date.now(), $push: {recipes: {recipeID: recipe._id, recipe: recipe}}}, (err, result) => {
            if (err){
                console.log(err)
                res.send(err)
            }
            console.log(result)
            res.send(result)
        })
    }
    else if (operation === 'remove'){
        const {recipe} = req.body.inputs
        console.log(recipe._id)
        MealPlan.updateOne({_id: id}, {lastUpdated: Date.now(), $pull: {recipes: {recipeID: recipe._id}}}, (err, result) => {
            if (err){
                console.log(err)
                res.send(err)
            }
            console.log(result)
            res.send(result)
        })
    }
    else if (operation === 'rename'){
        const {name} = req.body.inputs
        MealPlan.updateOne({_id: id}, {lastUpdated: Date.now(), mealPlanName: name}, (err, result) => {
            if (err){
                console.log(err)
                res.send(err)
            }
            console.log(result)
            res.send(result)
        })
    }
})

//Deletes a meal plan
mealPlanRouter.delete('/:id', (req, res) => {
    const {id} = req.params

    MealPlan.deleteOne({_id: id}, (err, result) => {
        if (err){
            console.log(err)
            res.send(err)
        }
        console.log(result)
        res.send(result)
    })
})

module.exports = mealPlanRouter