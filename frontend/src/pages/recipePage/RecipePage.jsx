import axios from 'axios'
import {IngredientListItem, RecipeThumbnail, InstructionsListItem, CollectionList, RowSkeleton, BulletListSkeleton, ImageSkeleton} from '../../components'
import {useState, useEffect, useContext} from 'react'
import {useParams, Link} from 'react-router-dom'
import './recipePage.scss'
import {PlusIcon, ShoppingCart, ShoppingCartAdd} from '../../assets/images/index'
import { UserContext } from '../../UserContext'


function RecipePage(){

    const [popup, setPopup] = useState({active: false, popupContent: ''})
    const [recipe, setRecipe] = useState({})
    const id = useParams().id

    const {updateShoppingList, shoppingList} = useContext(UserContext)
    
    //Gets recipe from database
    const getRecipe = () => {
        axios
        .get(`http://localhost:5010/recipe/${id}`)
        .then(res => setRecipe(res.data))
        .catch(err => console.log(err))
    }
    useEffect(getRecipe, [])

    //Displays for ingredients, instructions and lists
    const ingredientsList = recipe?.ingredients?.map((item, index) => {
        return(<IngredientListItem key={item._id} item={item} shoppingList={shoppingList} updateShoppingList={updateShoppingList} recipe={recipe}/>)
    })
    const instructionsList = recipe?.instructions?.map((item, index) => {
        return(<InstructionsListItem item={item} key={item._id} index={index} target='instructions'/>)
    })
    const notesList = recipe?.notes?.map((item, index) => {
        return(<InstructionsListItem item={item} key={item._id} target='notes'/>)
    })

    if (!recipe.recipeName){
        return(
            <div>
                <ImageSkeleton width='100%' />
                    <div style={{display: 'flex'}}>
                        <div className='recipe_addToListsItem' >
                            <BulletListSkeleton height='3rem'/>
                        </div>
                        <div className='recipe_addToListsItem' >
                            <BulletListSkeleton height='3rem'/>
                        </div>
                    </div>
                    <RowSkeleton height='3rem' />
                    <BulletListSkeleton height='3rem' width='50%' textWidth='100%'/>
                    <hr/>
                    <div style={{display: 'flex', padding: '.5rem'}}>
                        <div className='recipe_addToListsItem' >
                            <BulletListSkeleton height='3rem'/>
                        </div>
                        <div className='recipe_addToListsItem' >
                            <BulletListSkeleton height='3rem'/>
                        </div>
                    </div>
                    <hr/>
                    <div style={{display: 'flex', padding: '.5rem'}}>
                        <div className='recipe_addToListsItem' >
                            <BulletListSkeleton height='3rem'/>
                        </div>
                        <div className='recipe_addToListsItem' >
                            <BulletListSkeleton height='3rem'/>
                        </div>
                    </div>
                    <hr/>
                    <div style={{display: 'flex', padding: '.5rem'}}>
                        <div className='recipe_addToListsItem' >
                            <BulletListSkeleton height='3rem'/>
                        </div>
                        <div className='recipe_addToListsItem' >
                            <BulletListSkeleton height='3rem'/>
                        </div>
                    </div>                                  
            </div>
        )
    }
    else return(
        <div className='recipePage'>
            {popup.active &&
            <CollectionList popup={popup} setPopup={setPopup} recipe={recipe} />
            }
            <div>
                <RecipeThumbnail setRecipe={setRecipe} recipe={recipe} componentOrigin='recipePage' />
                <div className='recipe_addToLists'>
                    <div className='recipe_addToListsItem' onClick={() => setPopup({active: !popup.active, popupContent: 'Meal Plan'})}>
                    <PlusIcon className='recipe_addToListsItemIcon'/>
                        <p>Add to meal plan</p>
                    </div>
                    <div className='recipe_addToListsItem' onClick={() => setPopup({active: !popup.active, popupContent: 'Collection'})}>
                    <PlusIcon className='recipe_addToListsItemIcon'/>
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
                {shoppingList?.filter(item => item.recipeID === recipe._id).length !== recipe?.ingredients?.length &&
                    <div className='recipe_ingredientsAddAll' onClick={() => updateShoppingList('addAll', recipe.ingredients, recipe)}>
                        <ShoppingCartAdd className='recipe_addAllIcon'/>
                        <p>Add all to shopping cart</p>
                    </div>}
                {shoppingList?.filter(item => item.recipeID === recipe._id).length === recipe?.ingredients?.length &&
                    <div className='recipe_ingredientsAddAll' onClick={() => updateShoppingList('removeAll', recipe.ingredients, recipe)}>
                        <ShoppingCartAdd className='recipe_addAllIcon recipe_addAllIcon-selected' />
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
        </div>
    )
}

export default RecipePage