import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App'
import './index.scss'
import {Auth0Provider} from '@auth0/auth0-react'

ReactDOM.createRoot(document.getElementById('root')).render(
    <Auth0Provider
        domain="dev-qysji1hv.us.auth0.com"
        clientId="53XGEwwBzDRxIkVtknWjaHfU2Yban79J"
        redirectUri={window.location.origin}
    >
        <App />
    </Auth0Provider>
)
