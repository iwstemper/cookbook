import { PlusIcon, XIcon } from "../../assets/images"
import './ingredientListItem.scss'

const IngredientListItem = ({recipe, shoppingCart, updateShoppingCart, item, index}) => {  
    return(
        <div key={index} className='recipe_ingredientItem'>
            <div  className='recipe_ingredientRow'>
                <div className='recpie_ingredientRowImage'>
                    {
                        shoppingCart.find(ingredient => ingredient._id === item._id) ?
                        <XIcon style={{ width: '1rem'}} fill='gray' onClick={() => updateShoppingCart('remove', item, recipe)}/> :
                        <PlusIcon style={{ width: '1rem'}} fill='#19a2b1' onClick={() => updateShoppingCart('add', item, recipe)}/> 
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