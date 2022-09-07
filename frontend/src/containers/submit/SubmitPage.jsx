import {useState} from 'react'
import './submitPage.scss'
import axios from 'axios'

function SubmitPage(){
    const types = ['American', 'Italian', 'Mediterranean']
    const meals = ['Breakfast', 'Lunch/Dinner', 'Side/Appetizer', 'Dessert']

    const [submissionPhoto, setSubmissionPhoto] = useState()
    const [submissionInputs, setSubmissionInputs] = useState({
        recipeName: '', 
        cuisineType: '', 
        dishType: '', 
        servings: 0,
        prepTime: {mins:0, hrs: 0}, 
        cookTime: {mins: 0, hrs: 0},
        ingredients: [{ingredientName: '', unitOfMeasure: '', quantity: 0}],
        instructions: [''],
        notes: ['']
    })

    const submitRecipe = (e) => {
        e.preventDefault()
        axios
        .post('http://10.79.165.172:5010/recipe', {inputs: submissionInputs})
        .then(res => console.log(res))
        .catch(err => alert(err))
    }

    //Updates main submission inputs
    const updateInputs = (e) => {
        const {name, value} = e.target
        setSubmissionInputs(prev => ({...prev, [name]: value}))
    }

    //Updates nested object properties state
    const updateNestedState = (e, parent) => {
        const {name, value} = e.target
        const intValue = value ? parseInt(value) : null
        setSubmissionInputs(prev => ({...prev, [parent]: {...prev[parent], [name]: intValue} }))
    }

    //Update array property states
    const updateArrayState = (e, index, field) => {
        if (field === 'instructions'){
            const {value} = e.target
            let list = [...submissionInputs.instructions]
            list[index] = value
            setSubmissionInputs(prev => ({...prev, instructions: list}))
        }
        else if (field === 'ingredients'){
            let {name, value} = e.target
            let list = [...submissionInputs.ingredients]
            name === 'quantity' ? value = parseInt(value) : value = value
            list[index][name] = value
            setSubmissionInputs(prev => ({...prev, ingredients: list}))
        }
        else if (field === 'notes'){
            const {value} = e.target
            let list = [...submissionInputs.notes]
            list[index] = value
            setSubmissionInputs(prev => ({...prev, notes: list}))
        }
    }

    //Adds row to array state properties
    const addArrayRows = (e, name) => {
        e.preventDefault()
        if (name === 'instructions'){
            let list = [...submissionInputs.instructions, '']
            setSubmissionInputs(prev => ({...prev, instructions: list}))
        }
        else if (name === 'notes'){
            let list = [...submissionInputs.notes, '']
            setSubmissionInputs(prev => ({...prev, notes: list}))
        }
        else if (name === 'ingredients'){
            let list = [...submissionInputs.ingredients, {ingredientName: '', unitOfMeasure: '', quantity: 0}]
            setSubmissionInputs(prev => ({...prev, ingredients: list}))
        }
    }  

    //Removes row from array state properties
    const removeArrayRow = (e, index, field) => {
        e.preventDefault()
        if (field === 'instructions'){
            let list = [...submissionInputs.instructions]
            list.splice(index,1)
            setSubmissionInputs(prev => ({...prev, instructions: list}))
        }
        if (field === 'notes'){
            let list = [...submissionInputs.notes]
            list.splice(index,1)
            setSubmissionInputs(prev => ({...prev, notes: list}))
        }
        if (field === 'ingredients'){
            console.log(index)
            let list = [...submissionInputs.ingredients]
            list.splice(index,1)
            setSubmissionInputs(prev => ({...prev, ingredients: list}))
        }
    }
    

    const processPhoto = (e) => {
        setSubmissionPhoto(URL.createObjectURL(e.target.files[0]))
    }

    return(
        <div className='page_content'>
            <div className='submitPage'>
                <h1>Add a new item</h1>
                <form className='submitPage_form' onSubmit={e => submitRecipe(e)}>
                    <div className='submitPage_formGroup'>
                        <input type='file' onChange={e => processPhoto(e)}/>
                        <img src={submissionPhoto}  style={{maxHeight: '30vh', borderRadius: '150px'}}/>
                        {submissionPhoto &&
                        <button onClick={() => setSubmissionPhoto(null)}>Remove photo</button>
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
                    <div className='submitPage_dividedFormGroup'>
                        <p>Time</p>
                        <p>Prep time</p>
                        <div className='submitPage_dividedFormLine'>
                            <input type='number' value={submissionInputs.prepTime.hrs ? submissionInputs.prepTime.hrs : ''} name='hrs' onChange={e => updateNestedState(e, 'prepTime')}/>
                            <p>hrs</p>
                            <input type='number' value={submissionInputs.prepTime.mins ? submissionInputs.prepTime.mins : ''} name='mins' onChange={e => updateNestedState(e, 'prepTime')}/>
                            <p>mins</p>
                        </div>
                    </div>
                    <div className='submitPage_dividedFormGroup'>
                        <p>Cook time</p>
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
                                            <button style={{display: index === 0 ? 'none' : undefined}} className='submit_addRowButton' onClick={(e) => removeArrayRow(e, index, 'instructions')}>X</button>
                                            <button style={{display: index === submissionInputs.instructions.length - 1 ? undefined : 'none'}} className='submit_addRowButton' onClick={e => addArrayRows(e, 'instructions')}>+</button>
                                        </div>
                                    </div>
                                </div>
                            )
                        })}
                        
                    </div>
                
                    <div className='submitPage_formGroup'>
                        <label for='submit_ingredients'>Ingredients</label>
                        <div className='submit_ingredientsRow'>
                            <p>Quantity</p>
                            <p>Unit of Measure</p>
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
                                        name='unitOfMeasure' 
                                        value={submissionInputs.ingredients[index].unitOfMeasure}
                                        onChange={e => updateArrayState(e, index, 'ingredients')}
                                        />
                                    <input 
                                        name='ingredientName' 
                                        value={submissionInputs.ingredients[index].ingredientName}
                                        onChange={e => updateArrayState(e, index, 'ingredients')}
                                        required
                                        />
                                    <div className='submit_rowButtons'>
                                        <button style={{display: index === 0 ? 'none' : undefined}} className='submit_addRowButton' onClick={(e) => removeArrayRow(e, index, 'ingredients')}>X</button>
                                        <button style={{display: index === submissionInputs.ingredients.length - 1 ? undefined : 'none'}} className='submit_addRowButton' onClick={e => addArrayRows(e, 'ingredients')}>+</button>
                                    </div>
                                </div>
                            )
                        })}
                    </div>
                    <div className='submitPage_formGroup'>
                        <label for='submit_notes'>Notes</label>
                        {submissionInputs.notes.map((item, index) => {
                            return(
                                <div className='submit_instructionsRow'>
                                    <textarea
                                        id='submit_notes'
                                        key={index}
                                        value={submissionInputs.notes[index]}
                                        name='notes'
                                        onChange={e => updateArrayState(e, index, 'notes')}
                                    />
                                    <div className='submit_rowButtons'>
                                        <button style={{display: index === 0 ? 'none' : undefined}} className='submit_addRowButton' onClick={(e) => removeArrayRow(e, index, 'notes')}>X</button>
                                        <button style={{display: index === submissionInputs.notes.length - 1 ? undefined : 'none'}} className='submit_addRowButton' onClick={e => addArrayRows(e, 'notes')}>+</button>
                                    </div>
                                </div>
                            )
                        })}
                    </div>
                    <button type='submit'>Submit</button>
                </form>
            </div>

        </div>
    )
}

export default SubmitPage