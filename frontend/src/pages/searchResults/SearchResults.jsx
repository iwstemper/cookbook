import axios from 'axios'
import {useEffect, useState} from 'react'
import {useNavigate, useParams, useLocation} from 'react-router-dom'
import {RecipeThumbnail} from '../../components'

function SearchResults({updateRecipes, recipeList, user, favorites, getFavorites}) {
    const urlParams = useParams()
    const navigator = useNavigate()
    const currentURL = useLocation().pathname
    function navigate(){
        navigator(currentURL + `/secondParam=secondValue`)
    }


    let paramsObj = {}
    
    const [recipeResults, setResults] = useState([])
    const getRecipes = () => {
        for (const property in urlParams){
            const newParam = urlParams[property].split('=')
            paramsObj[`${newParam[0]}`] = newParam[1]        
        }
        axios
        .get('http://localhost:5010/recipe', {params: {filters: paramsObj}})
        .then(res => setResults(res.data))
        .catch(err => console.log(err))
    }
    useEffect(getRecipes, [currentURL])

    const resultsDisplay = recipeResults?.map((item, index) => {
        return(<RecipeThumbnail recipeResults={recipeResults} setResults={setResults} favorites={favorites} getFavorites={getFavorites} user={user} key={index} recipe={item} componentOrigin='searchResults' updateRecipes={updateRecipes} recipeList={recipeList}/>)
    })

    return (
    <div className='page_content'>
        <h2>Results for</h2>
        {resultsDisplay}
        <button onClick={() => navigate()}>test</button>
    </div>
  )
}

export default SearchResults