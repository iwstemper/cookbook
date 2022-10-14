import {useState} from 'react'
import { useNavigate, Outlet, useLocation } from 'react-router-dom'
import './listsPage.scss'

function ListsPage() {

  let location =  useLocation().pathname.slice(7).replace('%20', ' ')
  const [selectedPage, setSelectedPage] = useState(location)
  const nav = useNavigate()

  function navigatePage(location){
    setSelectedPage(location)
    location.split(' ').join()
    nav(`/lists/${location}`)
  }
    
  return (
    <div className='listsPage'>
        <div className='listsPage_navTabs'>
          <button className={selectedPage === 'collections' ? 'listButton-selected' : ''} onClick={e => navigatePage(e.target.innerText.toLowerCase())}>Collections</button>
          <button className={selectedPage === 'meal plans' ? 'listButton-selected' : ''} onClick={e => navigatePage(e.target.innerText.toLowerCase())}>Meal Plans</button>
          <button className={selectedPage === 'shopping list' ? 'listButton-selected' : ''} onClick={e => navigatePage(e.target.innerText.toLowerCase())}>Shopping List</button>
        </div>
        <Outlet />
    </div>
  )
}

export default ListsPage