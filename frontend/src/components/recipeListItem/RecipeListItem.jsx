import {useState} from 'react'
import './recipeListItem.scss'
import {useNavigate} from 'react-router-dom'
import {CrossIcon} from '../../assets/images'
import axios from 'axios'
import {formatCookTime} from '../../utils/formatCookTime'

function RecipeListItem({recipe, shoppingList, updateShoppingList, getCollections, getMealPlans, listType, collectionID}) {

  const navigator = useNavigate()
  function navigateToRecipe (e){
    console.log(e.target.className )
    if (!(e.target.className === 'recipeListItem_detailShopping' && e.target.className === 'recipeListItem_ellipses')){
      navigator(`/recipe/${recipe._id}`)
    }
  }

  //Checks if all ingredients are in shopping cart for button display
  let isInCart = shoppingList?.ingredients?.filter(item => item.recipeID === recipe._id).length === recipe.ingredients.length ? true : false

  function removeRecipe(){
    if (listType === 'Meal Plan'){
      axios
      .put(`http://localhost:5010/mealPlans/${collectionID}`, {inputs: {operation: 'remove', recipe: recipe}})
      .then(res => console.log(res))
      .then(() => getMealPlans())
      .catch(err => console.log(err))
    }
    else if (listType === 'Collection'){
      axios
      .put(`http://localhost:5010/collections/${collectionID}`, {inputs: {operation: 'remove', recipe: recipe}})
      .then(res => console.log(res))
      .then(() => getCollections())
      .catch(err => console.log(err))  
    }
  }


  const totalTime = formatCookTime(recipe)

  return (
    <div className='recipeListItem' onClick={e => navigateToRecipe(e)}>
          <img className='recipeListItem_image' src={'https://wtwp.com/wp-content/uploads/2015/06/placeholder-image-300x225.png'}/>
        <div className='recipeListItem_details'>
          <div className='recipeListItem_name'>
            {recipe?.recipeName}
          </div>
          <div className='recipeListItem_detail'>
              {totalTime.totalHrs > 0 && `${totalTime.totalHrs} hours`} {totalTime.totalMins && `${totalTime.totalMins} mins`} | {recipe?.ingredients.length} ingredients
          </div>
          <div className='recipeListItem_detailShopping' >
              {
                !isInCart ?
                <p className='recipeListItem_detailShoppingText' onClick={() => updateShoppingList('addAll', recipe.ingredients, recipe)}>Add to shopping list</p> :
                <p className='recipeListItem_detailShoppingText'>In shopping list</p>
              }
          </div>
        </div>
        <CrossIcon className='recipeListItem_ellipses' onClick={() => removeRecipe()}/>
    </div>
  )
}

export default RecipeListItem