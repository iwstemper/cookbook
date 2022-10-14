import {useState} from 'react'
import {Link } from 'react-router-dom'
import { ListIcon, SearchIcon, AddIcon, HomeIcon, ProfileIcon } from '../../assets/images'
import './navbar.scss'

function Navbar(){

    const [currentTab, setCurrentTab] = useState('home')


    return(
        <div className='navbar'>
                <Link to='/' className='navbar_element' 
                    onClick={e => setCurrentTab('home')}>
                    <HomeIcon width='30%' style={{margin: 'auto'}} color={currentTab === 'home' ? 'black' : 'orange'}/>
                </Link>
                <Link to='/search' className='navbar_element'
                    onClick={e => setCurrentTab('search')}>
                    <SearchIcon width='30%' style={{margin: 'auto'}} color={currentTab === 'search' ? 'black' : 'orange'}/>
                </Link>
                <Link to='/submit' className='navbar_element'
                    onClick={e => setCurrentTab('submit')}>
                    <AddIcon width='30%' style={{margin: 'auto'}} color={currentTab === 'submit' ? 'black' : 'orange'}/>
                </Link>
                <Link to='/lists/collections' className='navbar_element'
                    onClick={e => setCurrentTab('list')}>
                    <ListIcon width='30%' style={{margin: 'auto'}} color={currentTab === 'list' ? 'black' : 'orange'}/>
                </Link>
                <Link to='/profile' className='navbar_element'
                    onClick={e => setCurrentTab('profile')}>
                    <ProfileIcon width='30%' style={{margin: 'auto'}} color={currentTab === 'profile' ? 'black' : 'orange'}/>
                </Link>
        </div>
    )
}

export default Navbar