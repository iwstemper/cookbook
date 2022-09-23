import React from 'react'
import './modal.scss'
import {CrossIcon} from '../../assets/images'

function DialogueModal({modal, setModal}) {
    if (modal.active){
        return (
            <div className='modal_overlay modal_overlay-active'>
                <div className='dialogueModal_content dialogueModal_content-active'>
                    <p>{modal.modalText}</p>
                </div>
            </div>
        ) 
    }
    else{
        return (
            <div className='modal_overlay'>
            </div>
        )
    }
}

export default DialogueModal