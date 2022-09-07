//Library imports
const express = require('express')
const cors = require('cors')
const mongoose = require('mongoose')
const bodyParser = require('body-parser')
require('dotenv').config()

//Model imports
const Recipe = require('./models/Recipe')

//Route imports
const recipeRouter = require('./routes/recipe')
const collectionRouter = require('./routes/collection')

//Server variables
const PORT = process.env.PORT || 5010
const app = express()

//Default middleware
app.use(cors())
app.use(express.json())
app.use(bodyParser.urlencoded({extended: true}))

//Database connections
mongoose.connect(process.env.DB_CONN, () => console.log('Database connected'))
const db = mongoose.connection
db.on('error', console.error.bind('DB connection error'))

////////////////////////////////////////
//Routes
///////////////////////////////////////

app.use('/recipe', recipeRouter)
app.use('/collections', collectionRouter)

// app.post('/recipe', (req,res) => {
//     const newRecipe = req.body.inputs
//     const recipe = new Recipe(
//         {
//             recipeName: newRecipe.recipeName, dishType: newRecipe.dishType, cuisineType: newRecipe.cuisineType,
//             prepTime: newRecipe.prepTime, cookTime: newRecipe.cookTime, instructions: newRecipe.instructions,
//             ingredients: newRecipe.ingredients, notes: newRecipe.notes
//         }
//     )
    
//     recipe.save((err, result) => {
//         if (err){
//             console.log(err)
//         }
//         console.log(result)
//         res.send(result)
//     })
// })


// app.get('/recipe', (req,res) => {
//     const reqFilters = JSON.parse(req.query.filters)
//     let queryFilters = {}
//     if(reqFilters.search){
//         queryFilters.recipeName = {"$regex": reqFilters.search, "$options": "i"}
//     }
//     if(reqFilters.ingredient){
//         queryFilters['ingredients.ingredientName'] = {"$regex": reqFilters.ingredient, "$options": "i"}
//     }
//     console.log(queryFilters)
//     Recipe.find(queryFilters).exec((err, result) => {
//         console.log(result)
//         res.json(result)
//     })
    
// })

// app.get('/recipe/:id', (req,res) => {
//     const id = req.params.id
//     Recipe.findOne({_id: id}, (err, record) => {
//         if (err){
//             console.log(err)
//         }
//         console.log(record)
//         res.json(record)
//     })
// })









app.listen(PORT, () => console.log(`Server running on ${PORT}`))