import './explore.scss'
import ExploreTile from './ExploreTile'
import {useLocation} from 'react-router-dom'
import React from 'react'
import ExploreSubMenu from './ExploreSubMenu.'
import ExploreResults from './ExploreResults'

function Explore() {

  //Gets URL path to determine which tiles to display
  let currentPage = useLocation().pathname.substring(9)

  //Initial page load options
  const data = [
    {name: 'Quick & Easy', img: '', url: 'quickAndEasy'},
    {name: 'Trending', img: '', url: 'trending'},
    {name: 'Courses', img: '', url: 'courses'},
    {name: 'Cuisines', img: '', url: 'cuisines'},
    {name: 'Seasonal', img: '', url: 'seasonal'},
    {name: 'Popular', img: '', url: 'popular'}
  ]

  //Maps explore tile components to page looad options
  let exploreTiles;
      exploreTiles = data.map((item, index) => {
        return(
          <ExploreTile data={item}  key={index}/>
        )
    })

    switch (currentPage){
      //Initial page load content if URL substring is empty
      case '':
        return (
          <div className='explore'>
            {exploreTiles}
          </div>
        )

      //Displays results for sections without submenus
      case 'trending':
      case 'quickAndEasy':
      case 'Seasonal':
      case 'popular':
        return (
          <div>
            <ExploreResults />
          </div>
        )
      case 'courses':
      case 'cuisines':
        return (
          <ExploreSubMenu />
        )
      default:
        return(
          <ExploreResults />
        )
    }
}

export default Explore