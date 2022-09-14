import { PlusIcon, XIcon } from "../../assets/images"
import './ingredientListItem.scss'

const IngredientListItem = ({recipe, shoppingList, updateShoppingList, item, index}) => {  
    
    return(
        <div className='recipe_ingredientItem'>
            <div  className='recipe_ingredientRow'>
                <div className='recpie_ingredientRowImage'>
                    { shoppingList.ingredients &&
                        shoppingList.ingredients.find(ingredient => ingredient.ingredientID === item._id) ?
                        <XIcon style={{ width: '1rem'}} fill='gray' onClick={() => updateShoppingList('remove', item, recipe)}/> :
                        <PlusIcon style={{ width: '1rem'}} fill='#19a2b1' onClick={() => updateShoppingList('add', item, recipe)}/> 
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