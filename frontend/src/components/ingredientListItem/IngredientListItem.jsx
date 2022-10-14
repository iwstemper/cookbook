import { PlusIcon, XIcon } from "../../assets/images"
import './ingredientListItem.scss'

const IngredientListItem = ({recipe, shoppingList, updateShoppingList, item}) => {  
    
    return(
        <div className='recipe_ingredientItem'>
            <div  className='recipe_ingredientRow'>
                <div className='recipe_ingredientRowImage'>
                    { shoppingList &&
                        shoppingList.find(ingredient => ingredient.ingredientID === item._id) ?
                        <XIcon className='ingredientsRow_icon ingredientsRow_icon-added' onClick={() => updateShoppingList('remove', item, recipe)}/> :
                        <PlusIcon className='ingredientsRow_icon' onClick={() => updateShoppingList('add', item, recipe)}/> 
                    }
                </div>
                <div className='recipe_ingredientRowName'>
                    <p>{item.ingredientName}</p>
                </div>
            </div>
            <hr/>
        </div>
    )
}

export default IngredientListItem