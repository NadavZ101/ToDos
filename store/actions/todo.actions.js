import { todoService } from "../../services/todo.service.js"
import { store, SET_TODOS, REMOVE_TODO, ADD_TODO, LOAD_TODO, UPDATE_TODO } from "../store.js"



export function loadTodos() {
    return todoService.query()
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

// export function addTodo(todo) {
//     return todoService.save(todo)
//         .then(() => {
//             console.log('Todos actions -> add todo')
//             store.dispatch({ type: ADD_TODO, todo })
//         })
//         .catch(err => {
//             console.log('Todos actions -> Cannot add todo ')
//             throw err
//         })
// }

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

export function loadTodo(todoId) {
    return todoService.getTodoById(todoId)
        .then(todo => {
            console.log('Todos actions -> load single todo, ', todo.title)
            store.dispatch({ type: LOAD_TODO, todo })
        })
        .catch(err => {
            console.log('Todos actions -> load single todo ')
            throw err
        })
}

store.subscribe(() => {
    console.log('----- Store State changed: ----')
    console.log(store.getState())
    console.log('-------------------------------')
})