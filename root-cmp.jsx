const Router = ReactRouterDOM.HashRouter
const { Route, Routes } = ReactRouterDOM
const { Provider } = ReactRedux

import { HomePage } from './pages/HomePage.jsx'
import { TodoApp } from './pages/TodoIndex.jsx'
import { TodoDetails } from './pages/TodoDetails.jsx'
import { TodoEdit } from './pages/TodoEdit.jsx'

import { AppHeader } from './cmp/AppHeader.jsx'

import { store } from './store/store.js'

export class App extends React.Component {

    render() {
        return (
            <Provider store={store}>
                <Router>
                    <section className="app">
                        <AppHeader />

                        <main className='main-layout'>
                            <Routes>
                                <Route element={<HomePage />} path="/"></Route>
                                <Route element={<TodoApp />} path="/todo"></Route>
                                <Route element={<TodoDetails />} path="/todo/:todoId"></Route>
                                {/* <Route element={<TodoEdit />} path="/todo/edit/:todoId"></Route> */}
                            </Routes>
                        </main>
                    </section>
                </Router>
            </Provider>
        )
    }
}