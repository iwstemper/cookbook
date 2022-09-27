import axios from 'axios'
import {useState, useEffect} from 'react'
import {useLocation} from 'react-router-dom'
import { RecipeThumbnail } from '../../../components'
import ImageSkeleton from '../../../components/skeletons/ImageSkeleton'
import './explore.scss'

export default function ExploreResults({favorites, getFavorites, user}) {

    const currentPage = useLocation().pathname.substring(9)
    const pageStructure = currentPage.split('/')
    const pageName = pageStructure.length === 1 ? pageStructure[0][0].toUpperCase() + pageStructure[0].substring(1) : pageStructure[1][0].toUpperCase() + pageStructure[1].substring(1)
    const [results, setResults] = useState()

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
            case 'quickAndEasy':
                axios
                .get(`http://localhost:5010/categories/quickAndEasy`)
                .then(res => setResults(res.data))
                .catch(err => console.log(err));
            case 'seasonal':
                axios
                .get(`http://localhost:5010/categories/seasonal`)
                .then(res => setResults(res.data))
                .catch(err => console.log(err));
            case 'trending':
                axios
                .get('http://localhost:5010/categories/trending')
                .then(res => setResults(res.data))
                .catch(err => console.log(err))
        }
    }
    useEffect(getResults, [])

    let resultsDisplay;
    if (!results){
        resultsDisplay = Array(10).fill().map(() => {
            return(
                <ImageSkeleton width='50%' />
            )
        })
    }
    else {
        resultsDisplay = results?.map((item, index) => {
            return(
                <div className='exploreResults_tile'>
                    <RecipeThumbnail recipe={item} key={item._id} favorites={favorites} getFavorites={getFavorites} user={user} componentOrigin='searchResults'
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

