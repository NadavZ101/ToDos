import { todoService } from "../../services/todo.service.js"

//* Todo's
export const SET_TODOS = 'SET_TODOS'
export const REMOVE_TODO = 'REMOVE_TODO'
export const ADD_TODO = 'ADD_TODO'
export const UPDATE_TODO = 'UPDATE_TODO'
// export const LOAD_TODO = 'LOAD_TODO'  -- changed Details to local state

//* Filter
export const SET_FILTER_BY = 'SET_FILTER_BY'

//* Sort
export const SET_SORT_BY = 'SET_SORT_BY'

//* Loading
export const SET_IS_LOADING = 'SET_IS_LOADING'

const initialState = {
    todos: [],
    // todo: {},
    filterBy: todoService.getDefaultFilterBy(),
    sortBy: todoService.getDefaultSortBy(),
    isLoading: false
}

export function todoReducer(state = initialState, action = {}) {

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

        //* Filter
        case SET_FILTER_BY:
            return {
                ...state,
                filterBy: { ...state.filterBy, ...action.filterBy }
            }

        //* Sort
        case SET_SORT_BY:
            return {
                ...state,
                sortBy: { ...state.sortBy, ...action.sortBy }
            }

        //* Loading
        case SET_IS_LOADING:
            return {
                ...state,
                isLoading: action.isLoading
            }

        default:
            return state;
    }

}