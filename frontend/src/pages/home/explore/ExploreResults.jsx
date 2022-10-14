import axios from 'axios'
import {useState, useEffect} from 'react'
import {useLocation} from 'react-router-dom'
import { RecipeThumbnail, ImageSkeleton } from '../../../components'
import './explore.scss'

export default function ExploreResults() {

    const currentPage = useLocation().pathname.substring(9)
    const pageStructure = currentPage.split('/')
    const pageName = pageStructure.length === 1 ? pageStructure[0][0].toUpperCase() + pageStructure[0].substring(1) : pageStructure[1][0].toUpperCase() + pageStructure[1].substring(1)
    const [results, setResults] = useState([])

    function getResults(){
        switch (pageStructure[0]) {
            case 'cuisines':
                axios
                .get(`http://localhost:5010/categories/cuisines/${pageStructure[1]}`)
                .then(res => setResults(res.data))
                .catch(err => console.log(err))
                break;
            case 'courses':
                axios
                .get(`http://localhost:5010/categories/courses/${pageStructure[1]}`)
                .then(res => setResults(res.data))
                .catch(err => console.log(err))
                break;
            case 'popular':
                axios
                .get(`http://localhost:5010/categories/popular`)
                .then(res => setResults(res.data))
                .catch(err => console.log(err));
                break;
            case 'quickAndEasy':
                axios
                .get(`http://localhost:5010/categories/quickAndEasy`)
                .then(res => setResults(res.data))
                .catch(err => console.log(err));
                break;
            case 'seasonal':
                axios
                .get(`http://localhost:5010/categories/seasonal`)
                .then(res => setResults(res.data))
                .catch(err => console.log(err));
                break;
            case 'trending':
                axios
                .get('http://localhost:5010/categories/trending')
                .then(res => setResults(res.data))
                .catch(err => console.log(err))
                break;
        }
    }
    useEffect(getResults, [])
    console.log(results)

    let resultsDisplay;
    if (results.length === 0){
        resultsDisplay = Array(10).fill().map(() => {
            return(
                <ImageSkeleton width='50%' />
            )
        })
    }
    else if (results?.length > 0) {
        resultsDisplay = results?.map((item, index) => {
            return(
                <div className='exploreResults_tile'>
                    <RecipeThumbnail recipe={item} key={item._id} componentOrigin='searchResults'
                        recipeResults={results} setResults={setResults}
                    />
    
                </div>
            )
        })
    }
    
  return (
    <div className='exploreResults page_content'>
        <div className='exploreResults_header'>
            <div className='exploreResults_headerText'>
                <p>{pageName}</p>
            </div>
        </div>
        <div className='exploreResults_tiles'>
            {resultsDisplay}
        </div>
    </div>
  )
}

