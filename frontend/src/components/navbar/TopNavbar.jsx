import {useState} from 'react'
import './topNavbar.scss'
import {useAuth0} from '@auth0/auth0-react'
import axios from 'axios'

function TopNavbar(){

    const {user, isLoading, loginWithRedirect, logout} = useAuth0()

    //MOVE TO AUTH0 SERVER
    function registerCart(){
        axios
        .post(`http://localhost:5010/shoppingList/${user.email}`)
        .then(res => console.log(res))
        .catch(err => console.log(err))
    }

    return(
        <div className='topNav'>
            <p onClick={() => registerCart()}>Logo</p>
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