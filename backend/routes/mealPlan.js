const express = require('express')

const mealPlanRouter = express.Router()
const MealPlan = require('../models/MealPlan')

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
    const {recipe, operation} = req.body.inputs
    
    if (operation === 'add'){
        MealPlan.updateOne({_id: id}, {lastUpdated: Date.now(),$push: {recipes: {recipeID: recipe._id}}}, (err, result) => {
            if (err){
                console.log(err)
                res.send(err)
            }
            console.log(result)
            res.send(result)
        })
    }
    else if (operation === 'remove'){
        MealPlan.updateOne({_id: id}, {lastUpdated: Date.now(),$pull: {recipes: {recipeID: recipe._id}}}, (err, result) => {
            if (err){
                console.log(err)
                res.send(err)
            }
            console.log(result)
            res.send(result)
        })
    }
})

module.exports = mealPlanRouter