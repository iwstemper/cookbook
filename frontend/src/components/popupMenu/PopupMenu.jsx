import './popupMenu.scss'
import {useAuth0} from '@auth0/auth0-react'
import {useState, useEffect} from 'react'
import {CollectionList} from '../'
import { XIcon } from '../../assets/images'

function Popup({popup, user, recipe, setPopup, parentRequest}) {


  return (
    <div className='popupMenu' style={{height: popup ? '95%' : '0%'}}>
        <XIcon className='popup_closeIcon' onClick={() => setPopup(!popup)} />
        <CollectionList user={user} recipe={recipe} parentRequest={parentRequest} popup={popup} setPopup={setPopup}/>
    </div>
  )
}

export default Popup