const express = require('express');
const {cloudinary} = require('../utils/cloudinary')
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
        res.send(result)
    })
    
})

//Add new recipe
recipeRouter.post('/', async (req,res) => {
    const {data, recipeData} = req.body
    const options = {
        use_filename: true,
        unique_filename: false,
        overwrite: true,
        folder: 'Cookbook'
    }
    
    try {
        const result = await cloudinary.uploader.upload(data, options)
        const {url, public_id} = result
        const recipe = new Recipe(recipeData)
        recipe.imageURL = url
        recipe.imageID = public_id
        console.log(recipe)
        recipe.save((err, result) => {
            if (err){
                console.log(err)
            }
            res.send(result)
        })
    } catch (err) {
        console.log(err)
    }
    
})

//Query single recipe
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