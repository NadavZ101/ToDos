//* Todo's
export const SET_TODOS = 'SET_TODOS'
export const REMOVE_TODO = 'REMOVE_TODO'
export const ADD_TODO = 'ADD_TODO'
export const UPDATE_TODO = 'UPDATE_TODO'
// export const LOAD_TODO = 'LOAD_TODO'  -- changed Details to local state

//* Filter
export const FILTER_BY = 'FILTER_BY'

const initialState = {
    todos: [],
    // todo: {},
    filterBy: { status: 'all' }
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
        case FILTER_BY:
            return {
                ...state,
                filterBy: action.filterBy.status
            }

        default:
            return state;
    }

}