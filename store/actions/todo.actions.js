import { todoService } from "../../services/todo.service.js"

import { SET_TODOS, REMOVE_TODO, ADD_TODO, LOAD_TODO, UPDATE_TODO, SET_FILTER_BY } from "../reducers/todo.reducer.js"

import { store } from "../store.js"


export function loadTodos() {
    const filterBy = store.getState().todoModule.filterBy
    return todoService.query(filterBy)
        .then(todos => {
            console.log('Todos actions -> Load todos ', todos)
            store.dispatch({ type: SET_TODOS, todos })
        })
        .catch(err => {
            console.log('Todos actions -> Cannot Load Todos')
            throw err
        })
}

export function removeTodo(todoId) {
    return todoService.remove(todoId)
        .then(() => {
            console.log('Todos actions -> remove todo ')
            store.dispatch({ type: REMOVE_TODO, todoId })
        })
        .catch(err => {
            console.log('Todos actions -> Cannot remove todo ')
            throw err
        })
}

export function saveTodo(todo) {
    console.log('Todos actions -> todo ', todo)
    const type = todo._id ? UPDATE_TODO : ADD_TODO
    return todoService.save(todo)
        .then((savedTodo) => {
            console.log('Todos actions -> add / update todo')
            store.dispatch({ type, todo: savedTodo })
            return savedTodo
        })
        .catch((err) => {
            console.log('Todos actions -> Cannot add / update todo ')
            throw err
        })
}

// export function loadTodo(todoId) {
//     return todoService.getTodoById(todoId)
//         .then(todo => {
//             console.log('Todos actions -> load single todo, ', todo.title)
//             store.dispatch({ type: LOAD_TODO, todo })
//         })
//         .catch(err => {
//             console.log('Todos actions -> load single todo ')
//             throw err
//         })
// }

export function setFilterBy(filterBy) {
    console.log('Todos actions -> filter', filterBy)
    store.dispatch({ type: SET_FILTER_BY, filterBy })
}

store.subscribe(() => {
    console.log('----- Store State changed: ----')
    console.log(store.getState())
    console.log('-------------------------------')
})