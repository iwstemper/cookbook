import React from 'react'

function SubmitHeaders({handleFileChange, filePreview, fileInput, submissionInputs, updateInputs, types, meals}) {
  return (
    <div className='submitPage_headers'>
        <div className='submitPage_formGroup'>
            <input type='file' onChange={e => handleFileChange(e)} id='submitPage_image' value={fileInput}/>
            {filePreview &&
            <div>
                <img className='submitPage_photoPreview' src={filePreview}/>
                <button onClick={() => setSubmissionPhoto(null)}>Remove photo</button>
            </div>
            }
        </div>
        <div className='submitPage_formGroup'>
            <label for='submit_dishname'>Recipe Name</label>
            <input required name='recipeName' id='submit_dishname' value={submissionInputs.recipeName} onChange={e => updateInputs(e)}/>
        </div>
        <div className='submitPage_formGroup'>
            <label for='submit_cuisineType'>Cuisine Type</label>
            <select required name='cuisineType' id='submit_cuisineType' value={submissionInputs.cuisineType} onChange={e => updateInputs(e)}>
                <option></option>
                {types.map((item, index) => {
                    return(
                        <option key={index} value={item}>{item}</option>
                    )
                })}
            </select>
        </div>
        <div className='submitPage_formGroup'>
            <label for='submit_dishType'>Dish Type</label>
            <select required name='dishType' id='submit_dishType' value={submissionInputs.dishType} onChange={e => updateInputs(e)}>
                <option></option>
                {meals.map((item, index) => {
                    return(
                        <option key={index} value={item}>{item}</option>
                    )
                })}
            </select>
        </div>
    </div>
  )
}

export default SubmitHeaders