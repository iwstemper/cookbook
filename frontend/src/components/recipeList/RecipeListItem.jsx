import './recipeListItem.scss'
import {useNavigate} from 'react-router-dom'
import {CrossIcon} from '../../assets/images'
import axios from 'axios'
import {formatCookTime} from '../../utils/formatCookTime'
import {useContext} from 'react'
import {UserContext} from '../../UserContext'

function RecipeListItem({recipe, listType, collectionID, setOverlay}) {

  const {shoppingList, updateShoppingList, getCollections, getMealPlans} = useContext(UserContext)

  //Navigates to recipe
  const navigator = useNavigate()
  function navigateToRecipe (e){
    if (e.target.className.baseVal !== 'recipeListItem_ellipses' && e.target.className.baseVal !== 'closeIcon' && e.target.className !== 'recipeListItem_detailShopping'){
      navigator(`/recipe/${recipe._id}`)
    }
  }

  //Checks if all ingredients are in shopping cart for button display
  let isInCart = shoppingList?.ingredients?.filter(item => item.recipeID === recipe._id).length === recipe.ingredients.length ? true : false

  function removeRecipe(){
    setOverlay(true)
    if (listType === 'Meal Plan'){
      axios
      .put(`http://localhost:5010/mealPlans/${collectionID}`, {inputs: {operation: 'remove', recipe: recipe}})
      .then(() => getMealPlans())
      .then(() => setOverlay(false))
      .catch(err => console.log(err))
    }
    else if (listType === 'Collection'){
      axios
      .put(`http://localhost:5010/collections/${collectionID}`, {inputs: {operation: 'remove', recipe: recipe}})
      .then(() => getCollections())
      .then(() => setOverlay(false))
      .catch(err => console.log(err))  
    }
  }

  //Formats cook time display
  const totalTime = formatCookTime(recipe)

  return (
    <div className='recipeListItem' onClick={e => navigateToRecipe(e)} >

      <img className='recipeListItem_image' src={'https://wtwp.com/wp-content/uploads/2015/06/placeholder-image-300x225.png'}/>
      <div className='recipeListItem_details'>
        <div className='recipeListItem_name'>
          {recipe?.recipeName}
        </div>
        <div className='recipeListItem_detail'>
            {totalTime.totalHrs > 0 && `${totalTime.totalHrs} hours`} {totalTime.totalMins && `${totalTime.totalMins} mins`} | {recipe?.ingredients.length} ingredients
        </div>
        {isInCart &&
          <div className='recipeListItem_detailShopping'>
                <p className='recipeListItem_detailShoppingText'>In shopping list</p>
          </div>
        }
        {!isInCart &&
          <div className='recipeListItem_detailShopping' onClick={() => updateShoppingList('addAll', recipe.ingredients, recipe)}>
              <p className='recipeListItem_detailShoppingText'>Add to shopping list</p> 
          </div>
        }
      </div>
      <div className='recipeListItem_closeIconContainer'>
        <CrossIcon className='recipeListItem_ellipses' onClick={() => removeRecipe()}/>
      </div>
    </div>
  )
}

export default RecipeListItem