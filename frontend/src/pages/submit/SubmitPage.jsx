import {useState} from 'react'
import './submitPage.scss'
import axios from 'axios'
import SubmitHeaders from './formComponents/SubmitHeaders'
import SubmitTimeServes from './formComponents/SubmitTimeServes'
import SubmitIngredients from './formComponents/SubmitIngredients'
import SubmitInstructions from './formComponents/SubmitInstructions'
import SubmitNotes from './formComponents/SubmitNotes'
import { BackIcon, NextIcon } from '../../assets/images'

function SubmitPage(){
    const types = ['American', 'Italian', 'Mediterranean']
    const meals = ['Breakfast', 'Lunch/Dinner', 'Side/Appetizer', 'Dessert']

    const [formStep, setFormStep] = useState(0)
    const [fileInput, setFileInput] = useState('')
    const [filePreview, setFilePreview] = useState('')
    const [fileToUpload, setFileToUpload] = useState()
    const [submissionInputs, setSubmissionInputs] = useState({
        recipeName: '', 
        cuisineType: '', 
        dishType: '', 
        servings: 0,
        prepTime: {mins:0, hrs: 0}, 
        cookTime: {mins: 0, hrs: 0},
        ingredients: [{ingredientName: '', quantity: 0}],
        instructions: [''],
        notes: ['']
    })

    //
    const handleFileChange = e => {
        const file = e.target.files[0]
        previewFile(file)
        setFileToUpload(file)
        setFileInput(e.target.value)
    }

    //
    const previewFile = file => {
        const reader = new FileReader()
        reader.readAsDataURL(file)
        reader.onloadend = () => {
            setFilePreview(reader.result)
        }
    }

    const submitRecipe = async (e) => {
        e.preventDefault()
        if (!fileToUpload) return
        const reader = new FileReader()
        reader.readAsDataURL(fileToUpload)
        reader.onloadend = () => {
            uploadRecipe(reader.result)
        }
        reader.onerror = () => {
            console.log('error')
        }
    }

    //Sends 
    const uploadRecipe = async (image) => {
        try{
            await fetch('http://10.79.165.172:5010/recipe', {
                method: 'POST',
                body: JSON.stringify({data: image, recipeData: submissionInputs}),
                headers: {'Content-type': 'application/json'}
            })
        }
        catch(err){
            console.log(err)
        }
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
    
    //Determines which form component to display
    let displayComponent
    switch (formStep){
        case 0:
            displayComponent =  <SubmitHeaders 
            filePreview={filePreview} handleFileChange={handleFileChange}
            fileInput={fileInput} types={types} meals={meals} 
            submissionInputs={submissionInputs} updateInputs={updateInputs}
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
                    <button type='submit'>Submit</button>
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
                    
            </div>

        </div>
    )
}

export default SubmitPage