import {useState, useEffect} from 'react'
import './explore.scss'
import {useLocation} from 'react-router-dom'
import ExploreTile from './ExploreTile'
import axios from 'axios'
import {ImageSkeleton} from '../../../components'

function ExploreSubMenu() {

    const [categories, setCategories] = useState()
    let category = useLocation().pathname.substring(9)

    useEffect(() =>{
        axios
        .get(`http://localhost:5010/categories/${category}`)
        .then(res => setCategories(res.data))
        .catch(err => console.log(err))
    }, [category])

    let exploreTiles
    if (!categories){
        exploreTiles = Array(9).fill().map(() => {
            return(
                <ImageSkeleton width='50%' />
            )
        })  
    }
    else{
        exploreTiles = categories.map((item, index) => {
        return(
            <ExploreTile data={item}  key={index}/>
        )
    })
    }

    return (
        <div className='explore'>
            {exploreTiles}
        </div>
    )  
}

export default ExploreSubMenu