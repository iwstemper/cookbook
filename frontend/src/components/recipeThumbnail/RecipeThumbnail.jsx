import './recipeThumbnail.scss'
import { useNavigate } from 'react-router-dom'
import {useState, useEffect} from 'react'
import {PlusIcon} from '../../assets/images/index'
import axios from 'axios'

function RecipeThumbnail({setRecipe, recipe, componentOrigin, favorites, getFavorites, user, recipeResults, setResults}) {

    
    const navigator = useNavigate()

    const navigateToRecipe = (e) => {
        e.preventDefault()
        if (componentOrigin === 'searchResults' && e.target.nodeName !== 'svg'){
            navigator(`/recipe/${recipe._id}`)
        }
    }

    function updateFavorites(operation){
        axios
        .post(`http://localhost:5010/favorites/${user.name}`, {recipeID: recipe._id, operation: operation})
        .then(() => getFavorites())
        .then(() => getRecipe())
        .catch(err => console.log(err))
    }

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

    return(
        <div className='recipe_headerImage' onClick={e => navigateToRecipe(e)} >
                <img src={'https://wtwp.com/wp-content/uploads/2015/06/placeholder-image-300x225.png'}/>
                <div className='recipe_headerImageDetails'>
                    <h2>{recipe.recipeName}</h2>
                    <div className='recipe_headerFlexLine recpie_headerFlexLineButtonRow'>
                        <div className='recipe_headerFlexItem'>
                            <p>Ian Stemper</p>
                        </div>
                        <div style={{position: 'relative', width: '15%'}}>
                            <div style={{zIndex: 1, position: 'absolute', color: 'gray', bottom: 2, right: 0, backgroundColor: 'white', fontSize: '.5rem', fontWeight: 'bold', padding: '.5rem', borderRadius: '50%'}}>{recipe.favorites}</div>
                            {favorites?.find(item => item.recipeID === recipe._id) ?
                            <PlusIcon className='addRecipe_icon' style={{width: '3rem', position: 'absolute', bottom:5, left: 0}} fill='gray' onClick={() => updateFavorites('remove')}/>
                            :
                            <PlusIcon className='addRecipe_icon' style={{width: '3rem', position: 'absolute', bottom:5, left: 0}} fill='#19a2b1' onClick={() => updateFavorites('add')}/>
                            }
                        </div>
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