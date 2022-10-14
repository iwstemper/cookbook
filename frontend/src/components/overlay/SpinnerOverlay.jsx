import './spinnerOverlay.scss'
import { Spinner } from '../../assets/images'

export default function SpinnerOverlay(){
    return(
    <div className='spinnerOverlay_background'>
        <Spinner className='spinnerOverlay_spinner'/>
    </div>
    )
}