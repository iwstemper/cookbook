import './recipeThumbnail.scss'
import { useNavigate } from 'react-router-dom'
import {useState, useEffect} from 'react'
import {PlusIcon} from '../../assets/images/index'
import axios from 'axios'
import {formatCookTime} from '../../utils/formatCookTime'

function RecipeThumbnail({setRecipe, recipe, componentOrigin, favorites, getFavorites, user, recipeResults, setResults}) {

    //Navigates to recipe if on the search results page
    const navigator = useNavigate()
    const navigateToRecipe = (e) => {
        e.preventDefault()
        console.log(e.target.className)
        if (componentOrigin === 'searchResults' && e.target.parentNode.className !== 'recipePage_addIcon' && e.target.className.baseVal !== 'recipePage_addIcon' && e.target.className.baseVal !== 'addRecipe_icon' && e.target.className !== 'recipeHeader_favoriteCount'){
            navigator(`/recipe/${recipe._id}`)
        }
    }

    //Adds or removes favorite
    function updateFavorites(operation){
        axios
        .post(`http://localhost:5010/favorites/${user.name}`, {recipeID: recipe._id, operation: operation})
        .then(() => getFavorites())
        .then(() => getRecipe())
        .catch(err => console.log(err))
    }

    //Gets recipe after favorites updated
    function getRecipe(){
        axios
        .get(`http://localhost:5010/recipe/${recipe._id}`)
        .then(res => {
            if (componentOrigin === 'searchResults'){
                let list = recipeResults.map(item => {
                    if (item._id === recipe._id){
                        return res.data
                    }
                    return item
                })
                setResults(list)
            }
            else if (componentOrigin === 'recipePage'){
                setRecipe(res.data)
            }
        })
        .catch(err => console.log(err))
    }

    //Formats cooktime display
    let totalTime = formatCookTime(recipe)

    //Adds or remove favorite depending on current state
    let clickFunction = favorites?.find(item => item.recipeID === recipe._id) ? 'remove' : 'add'

    //Determines display size based on component origin
    let addIconDisplay
    if (componentOrigin === 'searchResults'){
        addIconDisplay = <div className='recipeHeader_addIcon' onClick={() => updateFavorites(clickFunction)} >
                <div className='recipeHeader_favoriteCount'>{recipe.favorites}</div>
                {favorites?.find(item => item.recipeID === recipe._id) ?
                <PlusIcon className='addRecipe_icon addRecipe_icon-disabled' />
                :
                <PlusIcon className='addRecipe_icon' />
                }
    </div>
        
    }
    else if (componentOrigin === 'recipePage'){
        addIconDisplay = <div className='recipeHeader_addIcon' onClick={() => updateFavorites(clickFunction)} >
            {favorites?.find(item => item.recipeID === recipe._id) ?
            <PlusIcon className='addRecipe_icon addRecipe_icon-disabled' />
            :
            <PlusIcon className='addRecipe_icon' />
            }
        </div>
    }

    return(
        <div className='recipe_headerImage' onClick={e => navigateToRecipe(e)} >
                <img src={recipe.imageURL ? recipe.imageURL : 'https://wtwp.com/wp-content/uploads/2015/06/placeholder-image-300x225.png'}/>
                    {componentOrigin === 'searchResults' &&
                    <div className='recipe_headerImageDetails-thumbnail'>
                        <div className='recipe_headerFlexLine'>
                            <div className='recipe_headerName'>
                                <p className='recipeThumbnail_name'>{recipe.recipeName}</p>
                            </div>
                            {addIconDisplay}
                        </div>
                    </div>
                    }
                    {componentOrigin === 'recipePage' &&
                    <div className='recipe_headerImageDetails-recipePage'>
                        <div className='recipe_headerName'>
                            <p className='recipeThumbnail_name'>{recipe.recipeName}</p>
                            {addIconDisplay}
                        </div>
                        <div className='recipe_headerFlexLine'>
                            <div className='recipe_headerFlexItem'>
                                <p>{recipe.ingredients.length} <span>Ingredient{recipe.ingredients.length > 1 ? 's' : ''}</span></p>
                            </div>
                            <p>|</p>
                            <div className='recipe_headerFlexItem'>
                                <p>{totalTime.totalHrs > 0 && `${totalTime.totalHrs} hours`} {totalTime.totalMins > 0 && `${totalTime.totalMins} mins`}
                                </p>
                            </div>
                            <p>|</p>
                            <div className='recipe_headerFlexItem'>
                                <p>{recipe.favorites} like{recipe.favorites === 1 ? '' : 's'}</p>
                            </div>
                        </div>
                    </div>
                    }
            </div>
    )
}

export default RecipeThumbnail