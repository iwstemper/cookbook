import axios from 'axios'
import {IngredientListItem, RecipeThumbnail, InstructionsListItem, PopupMenu} from '../../components'
import {useState, useEffect} from 'react'
import {useParams, Link} from 'react-router-dom'
import './recipePage.scss'
import {PlusIcon, XIcon, ShoppingCart, ShoppingCartAdd} from '../../assets/images/index'

function RecipePage({updateShoppingList, shoppingList, user, collections, getCollections, mealPlans, getMealPlans, favorites, getFavorites}){

    const [popup, setPopup] = useState({active: false, popupContent: ''})
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
        return(<IngredientListItem key={item._id} item={item} shoppingList={shoppingList} updateShoppingList={updateShoppingList} recipe={recipe}/>)
    })

    const instructionsList = recipe?.instructions.map((item, index) => {
        return(<InstructionsListItem item={item} key={item._id} index={index} target='instructions'/>)
    })

    const notesList = recipe?.notes.map((item, index) => {
        return(<InstructionsListItem item={item} key={index} target='notes'/>)
    })

    return(
        <div className='page_content'>
                <PopupMenu getMealPlans={getMealPlans} mealPlans={mealPlans} collections={collections} getCollections={getCollections} popup={popup} setPopup={setPopup} recipe={recipe} user={user} parentRequest='add'/>
        {recipe &&
        <div>
            <RecipeThumbnail setRecipe={setRecipe} user={user} favorites={favorites} getFavorites={getFavorites} recipe={recipe} componentOrigin='recipePage' />
            <div className='recipe_addToLists'>
                <div className='recipe_addToListsItem' onClick={() => setPopup({active: !popup.active, popupContent: 'mealPlans'})}>
                <PlusIcon style={{ width: '1rem'}} fill='#19a2b1'/>
                    <p>Add to meal plan</p>
                </div>
                <div className='recipe_addToListsItem' onClick={() => setPopup({active: !popup.active, popupContent: 'collections'})}>
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
           {shoppingList?.ingredients?.filter(item => item.recipeID === recipe._id).length !== recipe.ingredients.length &&
                <div className='recipe_ingredientsAddAll' onClick={() => updateShoppingList('addAll', recipe.ingredients, recipe)}>
                    <ShoppingCartAdd style={{width: '1.5rem'}} fill='gray'/>
                    <p>Add all to shopping cart</p>
                </div>}
            {shoppingList?.ingredients?.filter(item => item.recipeID === recipe._id).length === recipe.ingredients.length &&
                <div className='recipe_ingredientsAddAll' onClick={() => updateShoppingList('removeAll', recipe.ingredients, recipe)}>
                    <ShoppingCartAdd style={{width: '1.5rem'}} fill='gray'/>
                    <p>Remove all from shopping cart</p>
                </div>
            }
            <hr/>
            <div className='recipe_ingredientsList'>
                {ingredientsList}
            </div>  
            <p className='recipe_instructionsHeader'>Instructions</p>
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