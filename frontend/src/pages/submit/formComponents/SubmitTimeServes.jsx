import React from 'react'

function SubmitTimeServes({updateInputs, updateNestedState, submissionInputs}) {
  return (
    <div>
        <div className='submitPage_dividedFormGroup'>
            <p>Prep Time</p>
            <div className='submitPage_dividedFormLine'>
                <input type='number' value={submissionInputs.prepTime.hrs ? submissionInputs.prepTime.hrs : ''} name='hrs' onChange={e => updateNestedState(e, 'prepTime')}/>
                <p>hrs</p>
                <input type='number' value={submissionInputs.prepTime.mins ? submissionInputs.prepTime.mins : ''} name='mins' onChange={e => updateNestedState(e, 'prepTime')}/>
                <p>mins</p>
            </div>
        </div>
        <div className='submitPage_dividedFormGroup'>
            <p>Cook Time</p>
            <div className='submitPage_dividedFormLine'>
                <input type='number' value={submissionInputs.cookTime.hrs ? submissionInputs.cookTime.hrs : ''} name='hrs' onChange={e => updateNestedState(e, 'cookTime')}/>
                <p>hrs</p>
                <input type='number' value={submissionInputs.cookTime.mins ? submissionInputs.cookTime.mins : ''} name='mins' onChange={e => updateNestedState(e, 'cookTime')}/>
                <p>mins</p>
            </div>
        </div>
        <div className='submitPage_formGroup'>
            <label for='submit_servings'>Serves</label>
            <input required type='number' name='servings' id='submit_servings' value={submissionInputs.servings ? submissionInputs.servings : ''} onChange={e => updateInputs(e)}/>
        </div>
    </div>
  )
}

export default SubmitTimeServes