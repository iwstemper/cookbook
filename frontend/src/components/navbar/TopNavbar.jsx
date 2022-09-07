import {useState} from 'react'
import './topNavbar.scss'
import {useAuth0} from '@auth0/auth0-react'

function TopNavbar(){

    const {user, isLoading, loginWithRedirect, logout} = useAuth0()

    return(
        <div className='topNav'>
            <p>Logo</p>
            {!user && !isLoading &&
            <button onClick={loginWithRedirect}>Login</button>
            }
            {user &&
            <button onClick={logout}>Logout</button>
            }
            {isLoading &&
            <button onClick={logout} disabled>Logout</button>
            }
        </div>
    )
}

export default TopNavbar