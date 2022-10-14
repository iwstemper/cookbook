import './App.scss'
import {Homepage, SearchPage, SubmitPage, SearchResults, RecipePage, ListsPage, Profile, ShoppingList, Explore, Trending, ForYou} from './pages'
import { RecipeList } from './components'
import { Navbar } from './components'
import {BrowserRouter, Routes, Route} from 'react-router-dom'
import {useAuth0} from '@auth0/auth0-react'
import TopNavbar from './components/navbar/TopNavbar'
import { UserContextProvider} from './UserContext'

function App() {

  //Authentication
  const {isLoading, isAuthenticated} = useAuth0()

  return (
    <div className="App">
      <UserContextProvider>
        <BrowserRouter>
          {!isAuthenticated && !isLoading &&<TopNavbar/>}
          <Navbar/>
          <Routes>
              <Route path={'/'} element={<Homepage />}>
                <Route path='explore' element={<Explore />}>
                  <Route path=':id' element={<Explore />}>
                    <Route path=':id' element={<Explore />}/>
                  </Route>
                </Route>
                <Route path='trending' element={<Trending />}/>
                <Route path='foryou' element={<ForYou />}/>
              </Route>
              <Route path='/submit' element={<SubmitPage />}/>
              <Route path='/search'>
                <Route index element={<SearchPage/>}/>
                <Route path=':query1' element={<SearchResults />}/>
                <Route path=':query1/:query2' element={<SearchResults />}/>
              </Route>
              <Route path='/recipe'>
                <Route path=':id' element={<RecipePage />}/>
              </Route>
              <Route path='lists' element={<ListsPage />}>
                <Route path='Shopping%20List' element={<ShoppingList   />} />
                <Route path='Meal%20Plans' element={<RecipeList listType='Meal Plan'/>} />
                <Route path='collections' element={<RecipeList listType='Collection'/>} />
              </Route> 
              <Route path='/profile' element={<Profile />}/>
          </Routes>
          
        </BrowserRouter>
      </UserContextProvider>
    </div>
  )
}

export default App
