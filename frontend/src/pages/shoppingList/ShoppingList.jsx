import {useNavigate} from 'react-router-dom'
import './shoppingList.scss'
import { PlusIcon, XIcon } from '../../assets/images'
import { useContext } from 'react'
import { UserContext } from '../../UserContext'

function ShoppingList() {

    const {shoppingList, updateShoppingList} = useContext(UserContext)

    const recipeSet = new Set(shoppingList?.map(item => item.recipeName))
    const recipeArr = [...recipeSet]
    const nav = useNavigate()

    function navigateToRecipe(recipeID){
        nav(`/recipe/${recipeID}`)
    }
    
    const recipeList = recipeArr?.map((recipe, index) => {
        const recipeIngredients = shoppingList.filter(cartItem => cartItem.recipeName === recipe).sort((a, b) => a.purchased - b.purchased)
        return(
            <div className='shoppingList_recipe'>
                <div className='shoppingList_recipeHeader'>
                    <div className='shoppingList_recipeName' onClick={() => navigateToRecipe(recipeIngredients[0].recipeID)}>{recipe}</div>
                    <XIcon width='5%' onClick={() => updateShoppingList('removeAll', undefined, {_id: recipeIngredients[0].recipeID})}/>
                </div>
                <hr/>
                {recipeIngredients.map((ingredient, index) => {
                    return(
                        <div className='shoppingList_ingredientsList'>
                            <div className='shoppingList_ingredientsNameContainer'>
                                {ingredient.purchased ?
                                    <>
                                        <XIcon width='1rem' fill='#285e82' onClick={() => updateShoppingList('purchased', ingredient, undefined)} />
                                        <p className='shoppingList_ingredientName'>{`${ingredient.quantity} ${ingredient.ingredientUOM ? ingredient.ingredientUOM : ''} ${ingredient.ingredientName}`}</p>
                                    </>
                                    :
                                    <>
                                        <PlusIcon width='1rem' fill='#19a2b1' onClick={() => updateShoppingList('purchased', ingredient, undefined)} />
                                        <p>{`${ingredient.quantity} ${ingredient.ingredientUOM ? ingredient.ingredientUOM : ''} ${ingredient.ingredientName}`}</p>
                                    </>
                                }
                            </div>
                            <XIcon width='5%' onClick={() => updateShoppingList('remove', ingredient, undefined)}/>
                        </div>
                    )
                })}
            </div>
        )
    })
  return (
    <div>
        {recipeArr.length > 0 && recipeList}
        {recipeArr.length === 0 &&
            <div className='recipeList_emptyListDisplay'>
                <h2>Shopping List is empty</h2>
                <p>Start your Shopping List by searching for recipes</p>
            </div>
        }
    </div>
  )
}

export default ShoppingList