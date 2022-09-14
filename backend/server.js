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
const shoppingListRouter = require('./routes/shoppingList')
const mealPlanRouter = require('./routes/mealPlan')
const favoritesRouter = require('./routes/favorites')

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
app.use('/shoppingList', shoppingListRouter)
app.use('/mealPlans', mealPlanRouter)
app.use('/favorites', favoritesRouter)


//Initialize server
app.listen(PORT, () => console.log(`Server running on ${PORT}`))