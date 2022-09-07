import { useState } from 'react'
import './App.scss'
import {Homepage, SearchPage, SubmitPage, SearchResults, RecipePage, ListsPage, Register, Login, Profile} from './containers'
import { Navbar } from './components'
import {BrowserRouter, Routes, Route} from 'react-router-dom'
import {useAuth0} from '@auth0/auth0-react'
import TopNavbar from './components/navbar/TopNavbar'
import { useEffect } from 'react'

function App() {

  const {user, isLoading, isAuthenticated} = useAuth0()
  const [userProfile, setUserProfile] = useState({})

  useEffect(() => setUserProfile(user), [user])

  const [shoppingCart, setShoppingCart] = useState([])
  const [recipeList, setRecipeList] = useState({mealPlan: [], allRecipes: []})

  const updateShoppingCart = (operation, item, recipe) => {
    let newItem = {...item, parentRecipe: recipe, purchased: false}
    let cart
    switch (operation) {
      case 'add':
        setShoppingCart(prev => {return [...prev, newItem]})
        break;
      case 'remove':
        cart = shoppingCart.filter(cartItem => cartItem._id !== item._id)
        setShoppingCart(cart)
        break;
      case 'addAll':
        let items = item.map(item => {return {...item, parentRecipe: recipe, purchased: false}})
        setShoppingCart(prev => {return [...prev, ...items]})
        break;
        case 'removeAll':
        cart = shoppingCart.filter(cartItem => cartItem.parentRecipe._id !== recipe._id)
        setShoppingCart(cart)
        break;
        case 'purchased':
        cart = shoppingCart.map(cartItem => {
          if (cartItem._id === item._id){
            return {...cartItem, purchased: !cartItem.purchased}
          }
          return cartItem
        })
        setShoppingCart(cart)
    }
  }

  const updateRecipes = (operation, recipe) => {
    switch (operation) {
      case 'addRecipeAll':
        setRecipeList(prev => {
          return {...prev, allRecipes: [...prev.allRecipes, recipe]}
        })
        break;
      case 'removeRecipe':
        let listObj = recipeList
        Object.keys(listObj).forEach(key => {
          let listArr = listObj[key].filter(item => item._id !== recipe._id)
          listObj[key] = listArr
        })
        setRecipeList(listObj)
        break;
    }
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
              <Route path=':query1' element={<SearchResults updateRecipes={updateRecipes} recipeList={recipeList}/>}/>
              <Route path=':query1/:query2' element={<SearchResults updateRecipes={updateRecipes} recipeList={recipeList}/>}/>
            </Route>
            <Route path='/recipe'>
              <Route path=':id' element={<RecipePage shoppingCart={shoppingCart} updateShoppingCart={updateShoppingCart} updateRecipes={updateRecipes} recipeList={recipeList} user={userProfile}/>}/>
            </Route>
            <Route path='lists' element={<ListsPage recipeList={recipeList} shoppingCart={shoppingCart} updateShoppingCart={updateShoppingCart}/>}/>
            <Route path='/profile' element={<Profile user={userProfile}/>}/>
        </Routes>
        
      </BrowserRouter>
    </div>
  )
}

export default App
