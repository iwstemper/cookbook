import {useState} from 'react'
import './homepage.scss'
import {useNavigate, useLocation, Outlet} from 'react-router-dom'

function Homepage(){

    const [page, setPage] = useState(useLocation().pathname.slice(1))
    const nav = useNavigate()
    function navigate(location){
        setPage(location.slice(1))
        nav(location)
    }

    return(
        <div className='homepage'>
            <div className='homepage_header'>
                <p>Logo</p>
                <div className='homepage_headerLinks'>
                    <div className={page === '' ? 'homepage_headerLink-selected' :'homepage_headerLink'} onClick={() => navigate('/')}>
                        <p>For You</p>
                        <div></div>
                    </div>
                    <div className={page === 'explore' ? 'homepage_headerLink-selected' :'homepage_headerLink'} onClick={() => navigate('/explore')}>
                        <p>Explore</p>
                        <div></div>
                    </div>
                    <div className={page === 'trending' ? 'homepage_headerLink-selected' :'homepage_headerLink'} onClick={() => navigate('/trending')}>
                        <p>Trending</p>
                        <div></div>
                    </div>
                </div>
            </div>
            <Outlet />
        </div>
    )
}

export default Homepage