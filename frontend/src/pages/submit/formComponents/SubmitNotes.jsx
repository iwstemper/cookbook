import React from 'react'
import {XIcon, PlusIcon} from '../../../assets/images'

function SubmitNotes({submissionInputs, updateArrayState, removeArrayRow, addArrayRows}) {
  return (
    <div className='submitPage_formGroup'>
        <label for='submit_notes'>Notes</label>
        {submissionInputs.notes.map((item, index) => {
            return(
                <div key={index} className='submit_instructionsRow'>
                    <textarea
                        id='submit_notes'
                        key={index}
                        value={submissionInputs.notes[index]}
                        name='notes'
                        onChange={e => updateArrayState(e, index, 'notes')}
                    />
                    <div className='submit_rowButtons'>
                        <XIcon style={{fill: 'orange', height: '1.2rem', display: submissionInputs.notes.length === 1 ? 'none' : undefined}} onClick={() => removeArrayRow(index, 'notes')}/>
                        <PlusIcon style={{fill: 'orange', height: '1.2rem', display: index === submissionInputs.notes.length - 1 ? undefined : 'none'}}  onClick={()=> addArrayRows('notes')}/>
                    </div>
                </div>
            )
        })}
    </div>
  )
}

export default SubmitNotes