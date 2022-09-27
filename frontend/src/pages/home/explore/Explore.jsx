import './explore.scss'
import ExploreTile from './ExploreTile'
import {useLocation} from 'react-router-dom'
import React from 'react'
import ExploreSubMenu from './ExploreSubMenu.'
import ExploreResults from './ExploreResults'

function Explore({getFavorites, favorites, user}) {

  let currentPage = useLocation().pathname.substring(9)

  const data = [
    {name: 'Quick & Easy', img: '', url: 'quickAndEasy'},
    {name: 'Trending', img: '', url: 'trending'},
    {name: 'Courses', img: '', url: 'courses'},
    {name: 'Cuisines', img: '', url: 'cuisines'},
    {name: 'Seasonal', img: '', url: 'seasonal'},
    {name: 'Popular', img: '', url: 'popular'}
  ]

  let exploreTiles;
      exploreTiles = data.map((item, index) => {
        return(
          <ExploreTile data={item}  key={index}/>
        )
    })

    switch (currentPage){
      case '':
        return (
          <div className='explore'>
            {exploreTiles}
          </div>
        )
      case 'trending':
      case 'quickAndEasy':
      case 'Seasonal':
      case 'popular':
        return (
          <div>
            <ExploreResults getFavorites={getFavorites} favorites={favorites} user={user}/>
          </div>
        )
      case 'courses':
      case 'cuisines':
        return (
          <ExploreSubMenu />
        )
      default:
        return(
          <ExploreResults getFavorites={getFavorites} favorites={favorites} user={user}/>
        )
    }
}

export default Explore