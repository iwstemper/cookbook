import { useState } from 'react'
import './App.scss'
import {Homepage, SearchPage, SubmitPage, SearchResults, RecipePage, ListsPage, Profile} from './pages'
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
    })
    .then(() => getShoppingList())
    .catch(err => console.log(err))
  }

  return (
    <div className="App">
      <BrowserRouter>
        {!isAuthenticated &&<TopNavbar/>}
        <Navbar/>
        <Routes>
            <Route path={'/'} element={<Homepage />}/>
            <Route path='/explore' element={<Homepage />}>
              <Route path=':category' element={<Homepage />}/>
            </Route>
            <Route path='/trending' element={<Homepage />}/>
            <Route path='/submit' element={<SubmitPage />}/>
            <Route path='/search'>
              <Route index element={<SearchPage/>}/>
              <Route path=':query1' element={<SearchResults user={user} favorites={favorites} getFavorites={getFavorites}/>}/>
              <Route path=':query1/:query2' element={<SearchResults user={user} favorites={favorites} getFavorites={getFavorites}/>}/>
            </Route>
            <Route path='/recipe'>
              <Route path=':id' element={<RecipePage favorites={favorites} getFavorites={getFavorites} mealPlans={mealPlans} getMealPlans={getMealPlans} collections={collections} getCollections={getCollections} shoppingList={shoppingList} updateShoppingList={updateShoppingList} user={userProfile}/>}/>
            </Route>
            <Route path='lists' element={<ListsPage user={user} getCollections={getCollections} getMealPlans={getMealPlans} mealPlans={mealPlans} collections={collections} shoppingList={shoppingList} updateShoppingList={updateShoppingList}/>}/>
            <Route path='/profile' element={<Profile mealPlans={mealPlans} getMealPlans={getMealPlans} user={userProfile} collections={collections} getCollections={getCollections}/>}/>
        </Routes>
        
      </BrowserRouter>
    </div>
  )
}

export default App
