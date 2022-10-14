import React from 'react'
import {PlusIcon, XIcon} from '../../../assets/images'

function SubmitIngredients({submissionInputs, updateArrayState, removeArrayRow, addArrayRows}) {
  return (
    <div className='submitPage_formGroup'>
        <div className='submit_ingredientsRow'>
            <p>Qty</p>
            <p>Ingredient</p>
            <div></div>
        </div>
        {submissionInputs.ingredients.map((item, index) => {
            return(
                <div className='submit_ingredientsRow' key={index}>
                    <input 
                        name='quantity' 
                        value={submissionInputs.ingredients[index].quantity ? submissionInputs.ingredients[index].quantity : ''}
                        onChange={e => updateArrayState(e, index, 'ingredients')}
                        required
                        />
                    <input 
                        name='ingredientName' 
                        value={submissionInputs.ingredients[index].ingredientName}
                        onChange={e => updateArrayState(e, index, 'ingredients')}
                        required
                        />
                    <div className='submit_rowButtons'>
                        <XIcon style={{fill: 'orange', height: '1.2rem', display: submissionInputs.ingredients.length === 1 ? 'none' : undefined}} onClick={(e) => removeArrayRow(index, 'ingredients')}/>
                        <PlusIcon style={{fill: 'orange', height: '1.2rem', display: index === submissionInputs.ingredients.length - 1 ? undefined : 'none'}}  onClick={e => addArrayRows('ingredients')}/>
                    </div>
                </div>
            )
        })}
    </div>
  )
}

export default SubmitIngredients