import {useState} from 'react'
import './register.scss'
import axios from 'axios'

function Register(){

    const [inputs, setInputs] = useState({firstName: "", lastName: "", email: "", confirmEmail: "", password: "", confirmPassword: ""})

    const updateInputs = (e) => {
        const {name, value} = e.target
        setInputs(prev => {return{...prev, [name]: value}})
    }

    const submitRegistration = (e) => {
        e.preventDefault()
        axios
        .post('http://localhost:5010/user', {inputs: inputs})
        .then(res => console.log(res))
    }

    return(
        <div className='register page_content'>
            <form onSubmit={e => submitRegistration(e)}>
                <div className='register_formGroup'>
                    <label for='register_firstName' className='register_formLabel'>First Name</label>
                    <input required type='text' name='firstName' id='register_firstName' className='register_formLabel' value={inputs.firstName} onChange={e => updateInputs(e)} />
                </div>
                <div className='register_formGroup'>
                    <label for='register_lastName' className='register_formLabel'>Last Name</label>
                    <input required type='text' name='lastName' id='register_lastName' className='register_formLabel' value={inputs.lastName} onChange={e => updateInputs(e)} />
                </div>
                <div className='register_formGroup'>
                    <label for='register_email' className='register_formLabel'>Email Address</label>
                    <input required type='email' name='email' id='register_email' className='register_formLabel' value={inputs.email} onChange={e => updateInputs(e)} />
                </div>
                <div className='register_formGroup'>
                    <label for='register_confirmEmail' className='register_formLabel'>Confirm Email Address</label>
                    <input required type='email' name='confirmEmail' id='register_confirmEmail' className='register_formLabel' value={inputs.confirmEmail} onChange={e => updateInputs(e)} />
                </div>
                <div className='register_formGroup'>
                    <label for='register_password' className='register_formLabel'>Password</label>
                    <input required type='password' name='password' id='register_password' className='register_formLabel' value={inputs.password} onChange={e => updateInputs(e)} />
                </div>
                <div className='register_formGroup'>
                    <label for='register_confirmPassword' className='register_formLabel'>Confirm Password</label>
                    <input required type='password' name='confirmPassword' id='register_confirmPassword' className='register_formLabel' value={inputs.confirmPassword} onChange={e => updateInputs(e)} />
                </div>
                <button type='submit'>Register</button>
            </form>
        </div>
    )
}

export default Register