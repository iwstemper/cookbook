import {useState} from 'react'
import './modal.scss'
import {CrossIcon} from '../../assets/images'

function RenameModal({modal, setModal, modalFunction}) {

    const [modalText, setModalText] = useState('')

    function renameList(e){
        e.preventDefault()
        modalFunction(modal.collection._id, modalText)
        setModalText('')
        setModal({active: false})
    }


    if (modal.active){
        return (
            <div className='modal_overlay modal_overlay-active'>
                <div className='actionModal_content actionModal_content-active'>
                    <CrossIcon className='modal_closeIcon' onClick={() => setModal({active: false})}/>
                    <form className='modal_form' onSubmit={e => renameList(e)}>
                        <label for='modalText'>Rename {modal.collection.collectionName ? modal.collection.collectionName : modal.collection.mealPlanName}</label>
                        <input type='text' id='modalText' name='modalText' value={modalText} onChange={e => setModalText(e.target.value)} required/>
                        <button type='submit' className='modal_addCollection'>Rename</button>
                    </form>
                </div>
            </div>
        ) 
    }
    else{
        return (
            <div className='modal_overlay'>
                <div className='dialogueModal_content'>

                </div>
            </div>
        )
    }
}


export default RenameModal