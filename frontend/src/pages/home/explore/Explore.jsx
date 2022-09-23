import {useState, useEffect} from 'react'
import './explore.scss'
import {useLocation} from 'react-router-dom'
import ExploreTile from './ExploreTile'
import axios from 'axios'

function Explore() {

  const data = [
    {name: 'Quick & Easy', img: '', url: 'quickAndEasy'},
    {name: 'Trending', img: '', url: 'trending'},
    {name: 'Courses', img: '', url: 'courses'},
    {name: 'Cuisines', img: '', url: 'cuisines'},
    {name: 'Seasonal', img: '', url: 'seasonal'},
    {name: 'Popular', img: '', url: 'popular'}
  ]

  const [tileData, setTileData] = useState(data)
  const category = useLocation().pathname.substring(9)

  if (category){
      axios
      .get(`http://localhost:5010/categories/${category}`)
      .then(res => console.log(res))
      .catch(err => console.log(err))
    }

  const data2 = [
    {name: '111Quick & Easy', img: '', url: 'quickAndEasy'},
    {name: '111Trending', img: '', url: 'trending'},
    {name: '111Courses', img: '', url: 'courses'},
    {name: '111Cuisines', img: '', url: 'cuisines'},
    {name: '111Seasonal', img: '', url: 'seasonal'},
    {name: '111Popular', img: '', url: 'popular'}
  ]

  const exploreTiles = data.map((item, index) => {
    return(
      <ExploreTile data={item}  key={index}/>
    )
  })
  const exploreTiles2 = data2.map((item, index) => {
    return(
      <ExploreTile data={item}  key={index}/>
    )
  })

  if (useLocation().pathname.length > 8){
    return (
      <div className='explore'>
        {exploreTiles2}
      </div>
    )
  }
  else {
    return (
      <div className='explore'>
        {exploreTiles}
      </div>
    )
  }
  
}

export default Explore