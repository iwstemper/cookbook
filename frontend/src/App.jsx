import { useState } from 'react'
import './App.scss'
import {Homepage, SearchPage, SubmitPage, SearchResults, RecipePage, ListsPage, CollectionsPage, Profile} from './containers'
import { Navbar } from './components'
import {BrowserRouter, Routes, Route} from 'react-router-dom'
import {useAuth0} from '@auth0/auth0-react'
import TopNavbar from './components/navbar/TopNavbar'
import { useEffect } from 'react'
import axios from 'axios'

function App() {

  const {user, isLoading, isAuthenticated} = useAuth0()
  const [userProfile, setUserProfile] = useState({})
  const [shoppingList, setShoppingList] = useState({})
  const [collections, setCollections] = useState([])
  const [mealPlans, setMealPlans] = useState([])
  const [favorites, setFavorites] = useState([])

  
  function getShoppingList(){
      axios
      .get(`http://localhost:5010/shoppingList/${user.name}`)
      .then(res => setShoppingList(res.data))
      .catch(err => console.log(err))
  }
  function getCollections(){
    axios
    .get(`http://localhost:5010/collections/${user.name}`)
    .then(res => setCollections(res.data))
    .catch(err => console.log(err))
  } 
  function getMealPlans(){
    axios
    .get(`http://localhost:5010/mealPlans/${user.name}`)
    .then(res => setMealPlans(res.data))
    .catch(err => console.log(err))
  }
  function getFavorites(){
    axios
    .get(`http://localhost:5010/favorites/${user.name}`)
    .then(res => setFavorites(res.data))
    .catch(err => console.log(err))
  }
  useEffect(() => {
    if (isAuthenticated){
      setUserProfile(user)
      getShoppingList()
      getCollections()
      getMealPlans()
      getFavorites()
    }
    else{
      return
    }
  }, [isAuthenticated])

  //Updates shoppingList state after server update
  function updateShoppingList(operation, ingredient, recipe){
    axios
    .put(`http://localhost:5010/shoppingList/${user.email}`, {inputs: {recipe: recipe, operation: operation, ingredient: ingredient}})
    .then(res => {
      console.log(res)
      switch (operation){
        case 'add':
          setShoppingList(prev => {  
            let newIngredient = {
              recipeName: recipe.recipeName, recipeImage: recipe.cuisineType,
              recipeID: recipe._id, ingredientName: ingredient.ingredientName,
              ingredientUOM: ingredient.unitOfMeasure, ingredientQuantity: ingredient.quantity,
              purchased: false, ingredientID: ingredient._id
            }
            let list = [...prev.ingredients]
            list.push(newIngredient)
            return{
              ...prev, 
              ingredients: list
            }
          })
          break;
        case 'remove':
          setShoppingList(prev => {
            return {
              ...prev,
              ingredients: shoppingList.ingredients.filter(item => item.ingredientID !== ingredient._id)
            }
          })
          break;
        case 'purchased':
          setShoppingList(res.data)
        case 'addAll':
          let newItems = ingredient.filter(ingredient1 => !shoppingList.ingredients.some(ingredient2 => ingredient1._id === ingredient2.ingredientID)).map(item => {
            return{
              ...item,
              recipeName: recipe.recipeName, recipeImage: recipe.cuisineType,
              recipeID: recipe._id, purchased: false, ingredientID: item._id
            }
          })
          let list = shoppingList.ingredients
          list.push(...newItems)
          setShoppingList(prev => {
            return {
              ...prev,
              ingredients: list
            }
          })
          break;
        case 'removeAll':
        setShoppingList(prev => {
          return{
            ...prev,
            ingredients: shoppingList.ingredients.filter(item => item.recipeID !== recipe._id)
          }
        })
        break;
      }
    })
    .catch(err => console.log(err))
  }

  return (
    <div className="App">
      <BrowserRouter>
        <TopNavbar/>
        <Navbar/>
        <Routes>
            <Route path='/' element={<Homepage />}/>
            <Route path='/submit' element={<SubmitPage />}/>
            <Route path='/search'>
              <Route index element={<SearchPage/>}/>
              <Route path=':query1' element={<SearchResults user={user} favorites={favorites} getFavorites={getFavorites}/>}/>
              <Route path=':query1/:query2' element={<SearchResults user={user} favorites={favorites} getFavorites={getFavorites}/>}/>
            </Route>
            <Route path='/recipe'>
              <Route path=':id' element={<RecipePage favorites={favorites} getFavorites={getFavorites} mealPlans={mealPlans} getMealPlans={getMealPlans} collections={collections} getCollections={getCollections} shoppingList={shoppingList} updateShoppingList={updateShoppingList} user={userProfile}/>}/>
            </Route>
            <Route path='lists' element={<ListsPage  shoppingList={shoppingList} updateShoppingList={updateShoppingList}/>}/>
            <Route path='/profile' element={<Profile mealPlans={mealPlans} getMealPlans={getMealPlans} user={userProfile} collections={collections} getCollections={getCollections}/>}/>
            <Route path='/collections' element={<CollectionsPage />} >
              <Route path=':id' element={<CollectionsPage />} />
            </Route>
        </Routes>
        
      </BrowserRouter>
    </div>
  )
}

export default App
