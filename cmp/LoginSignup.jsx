import { showSuccessMsg, showErrorMsg } from "../services/event-bus.service.js"

import { LoginForm } from './LoginForm.jsx'
import { login, signup } from '../store/actions/user.actions.js'

const { useState } = React

export function LoginSignup() {
    const [isSignup, setIsSignUp] = useState(false)

    function onLogin(credentials) {
        isSignup ? _signup(credentials) : _login(credentials)
    }

    function _login(credentials) {
        console.log('_login -> cred:', credentials)
        login(credentials)
            .then(() => {
                showSuccessMsg('Logged in successfully')
            })
            .catch(err => {
                showErrorMsg('Cannot logged in')
            })
    }

    function _signup(credentials) {
        console.log(credentials)
        signup(credentials)
            .then(() => {
                showSuccessMsg('SignUp in successfully')
            })
            .catch(err => {
                showErrorMsg('Cannot logged in')
            })
    }

    return <div className="login-page">
        <LoginForm onLogin={onLogin} isSignup={isSignup} />
        <div className="login-btns">
            <a href="#" onClick={() => setIsSignUp(!isSignup)}>
                {isSignup ? 'Already a member? Login' : 'New user? Signup here'}
            </a>
        </div>
    </div>
}