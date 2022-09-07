import {useState, useEffect} from 'react'
import './shoppingList.scss'
import { XIcon } from '../../assets/images'

function ShoppingList({shoppingCart, updateShoppingCart}) {

    const recipeSet = new Set(shoppingCart.map(item => item.parentRecipe.recipeName))
    const recipeArr = [...recipeSet]
    
    const recipeList = recipeArr.map((recipe, index) => {
        const recipeIngredients = shoppingCart.filter(cartItem => cartItem.parentRecipe.recipeName === recipe)
        console.log(recipeIngredients)
        return(
            <div>
                <div className='shoppingList_recipeHeader'>
                    <div style={{width: '.1rem', padding: '1rem', border: '1px solid black'}}></div>
                    {recipe}
                    <XIcon width='5%' onClick={() => updateShoppingCart('removeAll', undefined, recipeIngredients[0].parentRecipe)}/>
                </div>
                <hr/>
                {recipeIngredients.map((ingredient, index) => {
                    return(
                        <div className='shoppingList_ingredientsList'>
                            <div className='shoppingList_ingredientsNameContainer'>
                                <div style={{width: '.1rem', padding: '.5rem', border: ingredient.purchased ? '1px solid black' : '3px solid black'}}
                                onClick={() => updateShoppingCart('purchased', ingredient, undefined)}
                                ></div>
                                <p>{`${ingredient.quantity} ${ingredient.unitOfMeasure} ${ingredient.ingredientName}`}</p>
                            </div>
                            <XIcon width='5%' onClick={() => updateShoppingCart('remove', ingredient, undefined)}/>
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