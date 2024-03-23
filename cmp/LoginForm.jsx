import { userService } from "../services/user.service.js"


const { useState } = React

export function LoginForm({ onLogin, isSignup }) {

    const [credentials, setCredentials] = useState(userService.getEmptyCredentails())

    function handleInput({ target }) {
        const field = target.name
        const value = target.value
        setCredentials(prevCreds => ({ ...prevCreds, [field]: value }))
    }

    function handleSubmit(ev) {
        ev.preventDefault()
        onLogin(credentials)
    }


    return <form className="login-form" onSubmit={handleSubmit}>
        <input
            type="text"
            name="username"
            value={credentials.username}
            onChange={handleInput}
            placeholder="username"
            required
            autoFocus
        />

        <input
            type="text"
            name="password"
            value={credentials.password}
            onChange={handleInput}
            placeholder="password"
            required
            autoComplete="off"
        />

        {isSignup &&
            <input
                type="text"
                name="fullname"
                value={credentials.fullname}
                onChange={handleInput}
                placeholder="Full name"
                required
            />
        }
        <button>{isSignup ? 'Signup' : 'Login'}</button>
    </form>
}
