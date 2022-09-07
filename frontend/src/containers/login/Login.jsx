import {useState} from 'react'
import './login.scss'
import axios from 'axios'
import {useAuth0} from '@auth0/auth0-react'

function Login({user, setUser}){

    const {loginWithRedirect, logout} = useAuth0()

    const [inputs, setInputs] = useState({email: "", password: ""})

    const updateInputs = (e) => {
        const {name, value} = e.target
        setInputs(prev => {return{...prev, [name]: value}})
    }

    const submitLogin = (e) => {
        e.preventDefault()
        // axios
        // .get('http://localhost:5010/user', {inputs: inputs})
        // .then(res => console.log(res))
        // .catch(err => console.log(err))
        loginWithRedirect()
    }

    return(
        <div>
            <form onSubmit={e => submitLogin(e)}>
                <div className='register_formGroup'>
                    <label for='register_email' className='register_formLabel'>Email Address</label>
                    <input type='email' name='email' id='register_email' className='register_formLabel' value={inputs.email} onChange={e => updateInputs(e)} />
                </div>
                <div className='register_formGroup'>
                    <label for='register_password' className='register_formLabel'>Password</label>
                    <input type='password' name='password' id='register_password' className='register_formLabel' value={inputs.password} onChange={e => updateInputs(e)} />
                </div>
                <button type='submit'>Login</button>
            </form>
            <button onClick={() => logout()}>Logout</button>
        </div>
    )
}

export default Login