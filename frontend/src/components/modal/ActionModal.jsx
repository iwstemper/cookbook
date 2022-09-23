import {useState} from 'react'
import './modal.scss'
import {CrossIcon} from '../../assets/images'

function ActionModal({modal, setModal, modalFunction, modalType}) {

    const [modalText, setModalText] = useState('')

    function submitCollection(e){
        e.preventDefault()
        modalFunction(modalText)
        setModalText('')
        setModal({active: false})
    }


    if (modal.active){
        return (
            <div className='modal_overlay modal_overlay-active'>
                <div className='actionModal_content actionModal_content-active'>
                    <CrossIcon className='modal_closeIcon' onClick={() => setModal({active: false})}/>
                    <form className='modal_form' onSubmit={e => submitCollection(e)}>
                        <label for='modalText'>{modalType} name</label>
                        <input type='text' id='modalText' name='modalText' value={modalText} onChange={e => setModalText(e.target.value)} required/>
                        <button type='submit' className='modal_addCollection'>Add {modalType.toLowerCase()}</button>
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


export default ActionModal