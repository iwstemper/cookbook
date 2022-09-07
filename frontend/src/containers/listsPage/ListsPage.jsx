import {useState} from 'react'
import './listsPage.scss'
import {RecipeList, ShoppingList} from '../../containers'

function ListsPage({shoppingCart, recipeList, updateShoppingCart}) {

  const [selectedPage, setSelectedPage] = useState('Recipes')

  const selectedStyles = {
    color: 'aqua',
    textDecoration: 'underline'
  }
    
  return (
    <div className='page_content'>
        <div className='listsPage_navTabs'>
          <p style={selectedPage === 'Recipes' ? selectedStyles : null} onClick={e => setSelectedPage(e.target.innerText)}>Recipes</p>
          <p style={selectedPage === 'Shopping List' ? selectedStyles : null} onClick={e => setSelectedPage(e.target.innerText)}>Shopping List</p>
        </div>
        {selectedPage === 'Recipes' && <RecipeList recipeList={recipeList}/>}
        {selectedPage === 'Shopping List' && <ShoppingList shoppingCart={shoppingCart} updateShoppingCart={updateShoppingCart}/>}
    </div>
  )
}

export default ListsPage