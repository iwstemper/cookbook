import {useState, useEffect} from 'react'
import './shoppingList.scss'
import { XIcon } from '../../assets/images'

function ShoppingList({shoppingList, updateShoppingList}) {

    const recipeSet = new Set(shoppingList?.ingredients.map(item => item.recipeName))
    const recipeArr = [...recipeSet]
    
    const recipeList = recipeArr.map((recipe, index) => {
        const recipeIngredients = shoppingList.ingredients.filter(cartItem => cartItem.recipeName === recipe)
        console.log(recipeIngredients)
        return(
            <div>
                <div className='shoppingList_recipeHeader'>
                    <div style={{width: '.1rem', padding: '1rem', border: '1px solid black'}}></div>
                    {recipe}
                    <XIcon width='5%' onClick={() => updateShoppingList('removeAll', undefined, {_id: recipeIngredients[0].recipeID})}/>
                </div>
                <hr/>
                {recipeIngredients.map((ingredient, index) => {
                    return(
                        <div className='shoppingList_ingredientsList'>
                            <div className='shoppingList_ingredientsNameContainer'>
                                <div style={{width: '.1rem', padding: '.5rem', border: ingredient.purchased ? '1px solid black' : '3px solid black'}}
                                onClick={() => updateShoppingList('purchased', ingredient, undefined)}
                                ></div>
                                <p>{`${ingredient.quantity} ${ingredient.ingredientUOM ? ingredient.ingredientUOM : ''} ${ingredient.ingredientName}`}</p>
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