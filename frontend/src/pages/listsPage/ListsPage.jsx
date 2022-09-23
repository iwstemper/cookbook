import {useState} from 'react'
import './listsPage.scss'
import {RecipeList, ShoppingList} from '../../pages'

function ListsPage({mealPlans, shoppingList, collections, updateShoppingList, getCollections, getMealPlans}) {

  const [selectedPage, setSelectedPage] = useState('Collections')
    
  return (
    <div className='listsPage'>
        <div className='listsPage_navTabs'>
          <button className={selectedPage === 'Collections' ? 'listButton-selected' : ''} onClick={e => setSelectedPage(e.target.innerText)}>Collections</button>
          <button className={selectedPage === 'Meal Plans' ? 'listButton-selected' : ''} onClick={e => setSelectedPage(e.target.innerText)}>Meal Plans</button>
          <button className={selectedPage === 'Shopping List' ? 'listButton-selected' : ''} onClick={e => setSelectedPage(e.target.innerText)}>Shopping List</button>
        </div>
        {selectedPage === 'Collections' && <RecipeList shoppingList={shoppingList}recipeList={collections} getCollections={getCollections} updateShoppingList={updateShoppingList} listType='Collection'/>}
        {selectedPage === 'Meal Plans' && <RecipeList shoppingList={shoppingList} recipeList={mealPlans} getMealPlans={getMealPlans} updateShoppingList={updateShoppingList} listType='Meal Plan' />}
        {selectedPage === 'Shopping List' && <ShoppingList shoppingList={shoppingList} updateShoppingList={updateShoppingList}/>}
    </div>
  )
}

export default ListsPage