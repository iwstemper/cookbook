import axios from 'axios'
import {IngredientListItem, RecipeThumbnail, InstructionsListItem, PopupMenu} from '../../components'
import {useState, useEffect} from 'react'
import {useParams, Link} from 'react-router-dom'
import './recipePage.scss'
import {PlusIcon, XIcon, ShoppingCart, ShoppingCartAdd} from '../../assets/images/index'

function RecipePage({updateShoppingCart, shoppingCart, updateRecipes, recipeList, user}){

    const [popup, setPopup] = useState(false)
    const [recipe, setRecipe] = useState()
    const id = useParams().id
    const getRecipe = () => {
        axios
        .get(`http://localhost:5010/recipe/${id}`)
        .then(res => setRecipe(res.data))
        .catch(err => console.log(err))
    }
    useEffect(getRecipe, [])

    const ingredientsList = recipe?.ingredients.map((item, index) => {
        return(<IngredientListItem item={item} index={index} shoppingCart={shoppingCart} updateShoppingCart={updateShoppingCart} recipe={recipe}/>)
    })

    const instructionsList = recipe?.instructions.map((item, index) => {
        return(<InstructionsListItem item={item} index={index} target='instructions'/>)
    })

    const notesList = recipe?.notes.map((item, index) => {
        return(<InstructionsListItem item={item} index={index} target='notes'/>)
    })

    return(
        <div className='page_content'>
            <PopupMenu popup={popup} setPopup={setPopup} recipe={recipe} user={user} parentRequest='addToCollection'/>
        {recipe &&
        <div>
            <RecipeThumbnail recipe={recipe} componentOrigin='recipePage' updateRecipes={updateRecipes} recipeList={recipeList}/>
            <div className='recipe_addToLists'>
                <div className='recipe_addToListsItem' onClick={() => setPopup(!popup)}>
                <PlusIcon style={{ width: '1rem'}} fill='#19a2b1'/>
                    <p>Add to meal plan</p>
                </div>
                <div className='recipe_addToListsItem' onClick={() => setPopup(!popup)}>
                <PlusIcon style={{ width: '1rem'}} fill='#19a2b1'/>
                    <p>Add to collection</p>
                </div>
            </div>
            <div className='recipe_ingredientsHeader'>
                <p id='recipe_ingredientsBoldText'>Ingredients</p>
                <div className='recipe_ingredientsRowIcons'>
                    <div className='recipe_shoppingCartIcon'>
                        <Link to='/'>
                            <ShoppingCart style={{width: '1.5rem'}} fill='#19a2b1'/>
                        </Link>
                        <p>Shopping</p>
                    </div>
                    <div className='recipe_ingredientsRowDivider'></div>
                    <div className='recipe_shoppingCartIcon'>
                        <h3>6</h3>
                        <p>Servings</p>
                    </div>
                </div>
            </div>
            <div className='recipe_ingredientsAddAll' onClick={() => updateShoppingCart('addAll', recipe.ingredients, recipe)}>
                <ShoppingCartAdd style={{width: '1.5rem'}} fill='gray'/>
                <p>Add all to shopping cart</p>
            </div>
            <hr/>
            <div className='recipe_ingredientsList'>
                {ingredientsList}
            </div>  
            <p className='recipe_instructionsHeader' onClick={() => updateShoppingCart('removeAll', undefined, recipe)}>Instructions</p>
            <div className='recipe_instructions'>
                {instructionsList}
            </div>
            <p className='recipe_instructionsHeader'>Notes</p>
            <div className='recipe_instrcutions'>
                {notesList}
            </div>
        </div>
        }
        </div>
    )
}

export default RecipePage