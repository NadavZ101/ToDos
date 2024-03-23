const { Link, NavLink } = ReactRouterDOM
const { useSelector, useDispatch } = ReactRedux
const { useNavigate } = ReactRouter

import { showSuccessMsg, showErrorMsg } from "../services/event-bus.service.js"
import { LoginSignup } from "./LoginSignup.jsx"
import { logout } from '../store/actions/user.actions.js'

export function AppHeader() {
    const user = useSelector(storeState => storeState.loggedInUser)
    const todos = useSelector(storeState => storeState.todos)

    console.log(user)

    function onLogout() {
        logout()
            .then(() => {
                showSuccessMsg('logout successfully')
            })
            .catch(err => {
                showErrorMsg('Cannot logout')
            })
    }

    function completionPrecent() {
        const totalTodos = todos.length
        const completedTodos = todos.filter(todo => todo.status === 'complete')
        const completedPrecent = totalTodos > 0 ? (completedTodos.length / totalTodos) * 100 : 0
        return completedPrecent
    }

    return (
        <header className="app-header full main-layout">
            <section className="header-container">
                <h1>ToDo's ✅</h1>
                <nav className="app-nav">
                    <NavLink to="/">Home</NavLink>
                    <NavLink to="/todo">ToDo's</NavLink>
                    <NavLink to="/user">User Profile</NavLink>
                </nav>
            </section>

            {user ? (
                <section>
                    <span to={`/user/${user.username}`}>Hello {user.fullname}</span>
                    <div className="progress-bar-container">
                        <div className="progress-bar" value={completionPrecent()} max="100" style={{ width: `${completionPrecent()}%` }}>
                            {completionPrecent().toFixed(0)}%
                        </div>
                    </div>
                    <button className="btn" onClick={onLogout}>Logout</button>
                </section>

            ) : (
                <section>
                    <LoginSignup />
                </section>
            )}
        </header>
    )

}