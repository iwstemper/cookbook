import axios from 'axios'
import {useEffect, useState} from 'react'
import {useNavigate, useParams, useLocation} from 'react-router-dom'
import {RecipeThumbnail, ImageSkeleton} from '../../components'
import './searchResults.scss'

function SearchResults() {
    const urlParams = useParams()
    const navigator = useNavigate()
    const currentURL = useLocation().pathname

    const [recipeResults, setResults] = useState()

    //Updates query params
    function navigate(){
        navigator(currentURL + `/secondParam=secondValue`)
    }

    //Creates object of URL parameters
    let paramsObj = {}
    for (const property in urlParams){
        const newParam = urlParams[property].split('=')
        paramsObj[`${newParam[0]}`] = newParam[1]        
    }
    
    //Gets recipe results when 
    const getRecipes = () => {
        axios
        .get('http://localhost:5010/recipe', {params: {filters: paramsObj}})
        .then(res => setResults(res.data))
        .catch(err => console.log(err))
    }
    useEffect(getRecipes, [currentURL])

    //Displays results or skeleton on load
    let resultsDisplay
    if (!recipeResults){
        resultsDisplay = Array(9).fill().map(() => {
            return(
                <ImageSkeleton width='100%' className='searchResults_result'/>
            )
        })
    } 
    else if (recipeResults){
        resultsDisplay = recipeResults?.map((item, index) => {
        return(
            <div className='searchResults_result'>
                <RecipeThumbnail recipeResults={recipeResults} setResults={setResults} 
                                key={index} recipe={item} componentOrigin='searchResults' 
                />
            </div>
                )
        })
    }

    return (
    <div className='searchResults'>
        <div className='searchResults_header'>
            <h2>Results for</h2>
        </div>
        {resultsDisplay}
        <button onClick={() => navigate()}>test</button>
    </div>
  )
}

export default SearchResults