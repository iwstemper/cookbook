const express = require('express')

const shoppingListRouter = express.Router()
const ShoppingList = require('../models/ShoppingList')

shoppingListRouter.post('/:id', (req, res) => {
    console.log(req.params)

    const {id} = req.params

    const shoppingList = new ShoppingList({creatorID: id})
    shoppingList.save((err, result) => {
        if (err){
            console.log(err)
        }
        console.log(result)
        res.send(result)
    })
})

shoppingListRouter.get('/:id', (req, res) => {
    const {id} = req.params

    ShoppingList.findOne({creatorID: id}).exec((err, result) => {
        if (err){
            console.log(err)
        }
        res.send(result)
    })
})

//Updates shopping cart
shoppingListRouter.put('/:id', async (req, res) => {
    const {id} = req.params
    const {ingredient, operation, recipe} = req.body.inputs
    switch (operation) {
        case 'add':
            let newIngredient = {
                recipeName: recipe.recipeName, recipeImage: recipe.cuisineType,
                recipeID: recipe._id, ingredientName: ingredient.ingredientName,
                ingredientUOM: ingredient.unitOfMeasure, ingredientQuantity: ingredient.quantity,
                purchased: false, ingredientID: ingredient._id, quantity: ingredient.quantity
            }
            ShoppingList.updateOne({creatorID: id}, {$push: {ingredients: newIngredient}}, (err, result) => {
                if (err){
                    console.log(err)
                    res.json(err)
                }
                console.log(result)
                res.json(result)
            }) 
            break;
        case 'remove':
            ShoppingList.updateOne({creatorID: id}, {$pull: {ingredients: {ingredientID: ingredient._id}}}, (err, result) => {
                if (err){
                    console.log(err)
                    res.json(err)
                }
                console.log(result)
                res.json(result)
            })
            break;
        case 'purchased':
            ShoppingList.findOne({creatorID: id}, (err, record) => {
                if (err){
                    console.log(err)
                    res.json(err)
                }
                const items = record.ingredients.map((item) => {
                    if (item.ingredientID === ingredient.ingredientID){
                        return {...item, purchased: !item.purchased}
                    }
                    return item
                })
                record.ingredients = items
                record.save((err, update) => {
                    if (err){
                        console.log(err)
                        res.send(err)
                    }
                    res.json(update)
                })
            })
            break;
        case 'addAll':
            try{
                let currentCart = await ShoppingList.findOne({creatorID: id}).exec()
                
                let newItems = ingredient.filter(ingredient1 => !currentCart.ingredients.some(ingredient2 => ingredient1._id === ingredient2.ingredientID) )
                let items = newItems.map(item => {
                    return{
                        ...item,
                        recipeName: recipe.recipeName, recipeImage: recipe.cuisineType,
                        recipeID: recipe._id, purchased: false, ingredientID: item._id
                    }
                })
                console.log(items)
                ShoppingList.updateOne({creatorID: id}, {$push: {ingredients: items}}, (err, result) => {
                    if (err){
                        console.log(err)
                        res.send(err)
                    }
                    console.log(result)
                    res.send(result)
                })
                
            }
            catch(err){
                console.log(err)
            }
            break;
        case 'removeAll':
            ShoppingList.updateOne({creatorID: id}, {$pull: {ingredients: {recipeID: recipe._id ? recipe._id : recipe}}}, (err, result) => {
                if (err){
                    console.log(err)
                    res.send(err)
                }
                console.log(result)
                res.send(result)
            })
            break;
    }

})

module.exports = shoppingListRouter