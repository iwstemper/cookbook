import './profile.scss';
import { useAuth0 } from '@auth0/auth0-react';
import ProfileHero from './ProfileHero';
import { TopNavbar} from '../../components'

function Profile(){

    const {user, isLoading} = useAuth0()
    

    if (isLoading){
        return(
            <div className='page_content'>
                Loading...
            </div>
        )
    }

    else if (!isLoading && !user){
        return(
            <div className='page_content'>
                Login to save and add recipes
            </div>
        )
    }

    else if (user){
        return(
            <div>
                <TopNavbar />
                <div className='page_content'>
                    <ProfileHero user={user}  />
                </div>
            </div>
        )
    }
}

export default Profile