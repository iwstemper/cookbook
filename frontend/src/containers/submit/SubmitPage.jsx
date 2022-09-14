import {useState} from 'react'
import './submitPage.scss'
import axios from 'axios'
import SubmitHeaders from './formComponents/SubmitHeaders'
import SubmitTimeServes from './formComponents/SubmitTimeServes'
import SubmitIngredients from './formComponents/SubmitIngredients'
import SubmitInstructions from './formComponents/SubmitInstructions'
import SubmitNotes from './formComponents/SubmitNotes'
import { BackIcon, NextIcon } from '../../assets/images'
// import { BackIcon } from '../../assets/images'

function SubmitPage(){
    const types = ['American', 'Italian', 'Mediterranean']
    const meals = ['Breakfast', 'Lunch/Dinner', 'Side/Appetizer', 'Dessert']

    const [formStep, setFormStep] = useState(0)
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
    const addArrayRows = (name) => {
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
    const removeArrayRow = (index, field) => {
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

    //Determines which form component to display
    let displayComponent
    switch (formStep){
        case 0:
            displayComponent =  <SubmitHeaders 
            processPhoto={processPhoto} setSubmissionPhoto={setSubmissionPhoto}
            submissionInputs={submissionInputs} updateInputs={updateInputs}
            types={types} meals={meals} submissionPhoto={submissionPhoto}
        />
            break;
        case 1:
            displayComponent =  <SubmitTimeServes submissionInputs={submissionInputs} updateInputs={updateInputs}
            updateNestedState={updateNestedState}
        />
            break;
        case 2:
            displayComponent =  <SubmitIngredients
            submissionInputs={submissionInputs} updateArrayState={updateArrayState} removeArrayRow={removeArrayRow} addArrayRows={addArrayRows}
        />
            break;
        case 3:
            displayComponent = <SubmitInstructions
            submissionInputs={submissionInputs} updateArrayState={updateArrayState} removeArrayRow={removeArrayRow} addArrayRows={addArrayRows}
        />
            break;
        case 4:
            displayComponent = <SubmitNotes
            submissionInputs={submissionInputs} updateArrayState={updateArrayState} removeArrayRow={removeArrayRow} addArrayRows={addArrayRows}
        />
            break;
    }

    return(
        <div className='page_content'>
            <div className='submitPage'>
                <h1>{submissionInputs.recipeName ? submissionInputs.recipeName : 'New Recipe'}</h1>
                <form className='submitPage_form' onSubmit={e => submitRecipe(e)}>
                    {displayComponent}
                </form>
                    <div className='submitPage_navButtons'>
                        <BackIcon 
                            onClick={formStep === 0 ? null : () => setFormStep(formStep - 1)}
                            style={formStep === 0 ?
                                {width: '3rem', color: 'white',  borderRadius: '50%', padding: '.5rem', backgroundColor: 'gray'} :
                                {width: '3rem', color: 'white',  borderRadius: '50%', padding: '.5rem', backgroundColor: 'orange'}
                            }
                        />
                        <NextIcon 
                            onClick={formStep === 4 ? null : () => setFormStep(formStep + 1)}
                            style={formStep === 4 ?
                                {width: '3rem', color: 'white',  borderRadius: '50%', padding: '.5rem', backgroundColor: 'gray'} :
                                {width: '3rem', color: 'white',  borderRadius: '50%', padding: '.5rem', backgroundColor: 'orange'}
                            }/>
                    </div>
                    <button type='submit'>Submit</button>
            </div>

        </div>
    )
}

export default SubmitPage