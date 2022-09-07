const express = require('express');

const recipeRouter = express.Router()
const Recipe = require('../models/Recipe')

recipeRouter.get('/', (req,res) => {
    const reqFilters = JSON.parse(req.query.filters)
    let queryFilters = {}
    if(reqFilters.search){
        queryFilters.recipeName = {"$regex": reqFilters.search, "$options": "i"}
    }
    if(reqFilters.ingredient){
        queryFilters['ingredients.ingredientName'] = {"$regex": reqFilters.ingredient, "$options": "i"}
    }
    console.log(queryFilters)
    Recipe.find(queryFilters).exec((err, result) => {
        console.log(result)
        res.json(result)
    })
    
})

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
        console.log(result)
        res.send(result)
    })
})

recipeRouter.get('/:id', (req,res) => {
    const id = req.params.id
    Recipe.findOne({_id: id}, (err, record) => {
        if (err){
            console.log(err)
        }
        console.log(record)
        res.json(record)
    })
})

module.exports = recipeRouter