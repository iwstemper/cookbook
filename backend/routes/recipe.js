const express = require('express');

const recipeRouter = express.Router()
const Recipe = require('../models/Recipe')

//Gets recipes based on query
recipeRouter.get('/', (req,res) => {
    const reqFilters = JSON.parse(req.query.filters)
    let queryFilters = {}
    
    if(reqFilters.search){
        queryFilters.recipeName = {"$regex": reqFilters.search, "$options": "i"}
    }
    if(reqFilters.ingredients){
        queryFilters['ingredients.ingredientName'] = {"$regex": reqFilters.ingredients, "$options": "i"}
    }
    console.log(queryFilters)
    Recipe.find(queryFilters).exec((err, result) => {
        if (err){
            console.log(err)
            res.send(err)
        }
        console.log(result)
        res.send(result)
    })
    
})

//Add new recipe
recipeRouter.post('/', (req,res) => {
    const newRecipe = req.body.inputs
    const recipe = new Recipe(
        {
            recipeName: newRecipe.recipeName, dishType: newRecipe.dishType, cuisineType: newRecipe.cuisineType,
            prepTime: newRecipe.prepTime, cookTime: newRecipe.cookTime, instructions: newRecipe.instructions,
            ingredients: newRecipe.ingredients, notes: newRecipe.notes, servings: newRecipe.servings
        }
    )
    
    recipe.save((err, result) => {
        if (err){
            console.log(err)
        }
        res.send(result)
    })
})

//Query single recipe
recipeRouter.get('/:id', (req,res) => {
    const id = req.params.id
    Recipe.findOne({_id: id}, (err, record) => {
        if (err){
            console.log(err)
        }
        res.json(record)
    })
})

module.exports = recipeRouter