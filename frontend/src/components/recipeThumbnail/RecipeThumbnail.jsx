import './recipeThumbnail.scss'
import { useNavigate } from 'react-router-dom'
import {useState, useEffect} from 'react'
import {PlusIcon} from '../../assets/images/index'

function RecipeThumbnail({recipe, componentOrigin, updateRecipes, recipeList}) {

    const [isSaved, setIsSaved] = useState()
    
    const navigator = useNavigate()

    const navigateToRecipe = (e) => {
        e.preventDefault()
        if (componentOrigin === 'searchResults' && e.target.nodeName !== 'svg'){
            navigator(`/recipe/${recipe._id}`)
        }
    }

    const setInitialSavedState = () => {
        let savedState = false;
        Object.keys(recipeList).forEach(key => {
            recipeList[key].forEach(arrayItem => {
                if (arrayItem._id === recipe._id){
                    savedState = true
                }
            })
        })
        setIsSaved(savedState)
    }

    useEffect(setInitialSavedState, [])

    const updateRecipeLists = (operation, recipe) => {
        setIsSaved(!isSaved)
        updateRecipes(operation, recipe)
    }

    return(
        <div className='recipe_headerImage' onClick={e => navigateToRecipe(e)} >
                <img src={'https://wtwp.com/wp-content/uploads/2015/06/placeholder-image-300x225.png'}/>
                <div className='recipe_headerImageDetails'>
                    <h2>{recipe.recipeName}</h2>
                    <div className='recipe_headerFlexLine recpie_headerFlexLineButtonRow'>
                        <div className='recipe_headerFlexItem'>
                            <p>Ian Stemper</p>
                        </div>
                        {isSaved &&<PlusIcon className='addRecipe_icon' style={{width: '2rem'}} fill='gray' onClick={() => updateRecipeLists('removeRecipe', recipe)}/>}
                        {!isSaved &&<PlusIcon className='addRecipe_icon' style={{width: '2rem'}} fill='#19a2b1' onClick={() => updateRecipeLists('addRecipeAll', recipe)}/>}
                    </div>
                    {
                        componentOrigin === 'recipePage' &&
                        <div className='recipe_headerFlexLine'>
                            <div className='recipe_headerFlexItem'>
                                <p>{recipe.ingredients.length} <span>Ingredient{recipe.ingredients.length > 1 ? 's' : ''}</span></p>
                            </div>
                            <p>|</p>
                            <div className='recipe_headerFlexItem'>
                                <p>{recipe.cookTime.mins + recipe.prepTime.mins} 
                                    <span>mins</span>
                                </p>
                            </div>
                        </div>
                    }
                </div>
            </div>
    )
}

export default RecipeThumbnail