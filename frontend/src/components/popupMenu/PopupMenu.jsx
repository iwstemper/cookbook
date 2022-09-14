import './popupMenu.scss'
import {useAuth0} from '@auth0/auth0-react'
import {useState, useEffect} from 'react'
import {CollectionList} from '../'
import { XIcon } from '../../assets/images'

function Popup({popup, user, recipe, setPopup, parentRequest, collections, getCollections, mealPlans, getMealPlans}) {

  return (
    <div className='popupMenu' style={{height: popup.active ? '95%' : '0%'}}>
        <XIcon className='popup_closeIcon' onClick={() => setPopup({active: !popup.active, popupContent: popup.popupContent})} />
        <CollectionList 
          user={user} recipe={recipe} parentRequest={parentRequest} popup={popup} setPopup={setPopup} 
          collections={collections} getCollections={getCollections} getMealPlans={getMealPlans} mealPlans={mealPlans}
        />
    </div>
  )
}

export default Popup