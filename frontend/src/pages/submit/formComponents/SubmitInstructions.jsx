import React from 'react'
import {XIcon, PlusIcon} from '../../../assets/images'

function SubmitInstructions({submissionInputs, updateArrayState, removeArrayRow, addArrayRows}) {
  return (
    <div className='submitPage_formGroup'>
        <label for='submit_instructions'>Instructions</label>
        {submissionInputs.instructions.map((item, index) => {
            return(
                <div>
                    <p>{index + 1}.</p>
                    <div className='submit_instructionsRow'>
                        <textarea
                            id='submit_instructions'
                            key={index}
                            value={submissionInputs.instructions[index]}
                            name='instructions'
                            onChange={e => updateArrayState(e, index, 'instructions')}
                            required
                        />
                        <div className='submit_rowButtons'>
                            <XIcon style={{fill: 'orange', height: '1.2rem', display: submissionInputs.instructions.length === 1 ? 'none' : undefined}} onClick={(e) => removeArrayRow(index, 'instructions')}/>
                            <PlusIcon style={{fill: 'orange', height: '1.2rem', display: index === submissionInputs.instructions.length - 1 ? undefined : 'none'}}  onClick={e => addArrayRows('instructions')}/>
                        </div>
                    </div>
                </div>
            )
        })}
    </div>
  )
}

export default SubmitInstructions