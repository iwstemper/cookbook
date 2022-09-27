import {useState, useEffect} from 'react';
import './profile.scss';
import { useAuth0 } from '@auth0/auth0-react';
import ProfileHero from './ProfileHero';
import {CollectionList} from '../../components'
import TopNavbar from '../../components/navbar/TopNavbar';

function Profile({collections, getCollections}){

    const {user, isLoading} = useAuth0()
    const [popup, setPopup] = useState({active: false, popupContent: ''})
    

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
                    <ProfileHero user={user} />
                    {collections &&
                    <CollectionList user={user} collections={collections} getCollections={getCollections} popup={popup} setPopup={setPopup}/>
                    }
                </div>
            </div>
        )
    }
}

export default Profile