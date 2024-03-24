import { userService } from "../services/user.service.js"

const { createStore, compose } = Redux

//* Todo's
export const SET_TODOS = 'SET_TODOS'
export const REMOVE_TODO = 'REMOVE_TODO'
export const ADD_TODO = 'ADD_TODO'
export const UPDATE_TODO = 'UPDATE_TODO'
// export const LOAD_TODO = 'LOAD_TODO'  -- changed Details to local state

//* User
export const SET_USER = 'SET_USER'

//* Filter
export const FILTER_BY = 'FILTER_BY'

const initialState = {
    todos: [],
    todo: {},
    loggedInUser: userService.getLoggedInUser(),
    filterBy: { status: 'all' }
}
export function appReducer(state = initialState, action = {}) {

    switch (action.type) {
        //* Todo's
        case SET_TODOS:
            return { ...state, todos: action.todos }

        case REMOVE_TODO:
            return {
                ...state,
                todos: state.todos.filter(todo => todo._id !== action.todoId)
            }

        case ADD_TODO:
            return {
                ...state,
                todos: [...state.todos, action.todo]
            }

        // case LOAD_TODO:
        //     return {
        //         ...state,
        //         todo: action.todo
        //         // todos: state.todos.filter(todo => todo._id === action.todoId)
        //         // tried to show the todo details with todos state instead of a single todo - didnt work...
        //     }

        case UPDATE_TODO:
            return {
                ...state,
                todos: state.todos.map(todo => todo._id === action.todo._id ? action.todo : todo)
            }

        //* User
        case SET_USER:
            return {
                ...state,
                loggedInUser: action.user
            }

        //* Filter
        case FILTER_BY:
            return {
                ...state,
                filterBy: action.filterBy.status
            }

        default:
            return state;
    }

}





const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose
export const store = createStore(appReducer, composeEnhancers())

window.gStore = store