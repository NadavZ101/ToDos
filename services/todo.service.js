import { storageService } from './async-storage.service.js'
import { userService } from './user.service.js'
import { utilService } from './util.service.js'

const STORAGE_KEY = 'todoDB'

export const todoService = {
    query,
    remove,
    getEmptyTodo,
    save,
    getTodoById,
    changeStatus,
}

function query() {
    return storageService.query(STORAGE_KEY)
}

function remove(todoId) {
    console.log('service ', todoId)
    return storageService.remove(STORAGE_KEY, todoId)
}

function save(todo) {
    console.log('service - save ', todo)
    console.log('service - id - before ', todo._id)

    if (todo._id) {
        console.log('service - EDIT')
        console.log('service - id - after ', todo._id)

        todo.title = todo.title
        todo.createBy = userService.getLoggedInUser()
        console.log('service -> edit Todo: ', todo)
        return storageService.put(STORAGE_KEY, todo)

    } else {
        //if make id is in the server cant watch in details right after creating it due to Async
        todo._id = utilService.makeId()
        todo.title = todo.title
        todo.status = 'active'
        todo.createdAt = new Date()
        todo.createBy = userService.getLoggedInUser().username

        console.log('service -> save new Todo: ', todo)
        return storageService.post(STORAGE_KEY, todo)
    }
}

function changeStatus(todoId) {
    console.log('service - changeStatus', todoId)

    if (todo._id) {
        const todoIdx = todos
        todo.status = 'complete'
    }
    return storageService.put(STORAGE_KEY, todo._id)
}

function getTodoById(todoId) {
    console.log('service - getTodoById', todoId)
    return storageService.get(STORAGE_KEY, todoId)
}



function getEmptyTodo() {
    return { _id: '', title: '', status: '', createdAt: '', }
    // Add CreatedBy
}

_createTodos()

// Demo Data
function _createTodos() {
    let todos = utilService.loadFromStorage(STORAGE_KEY)
    if (!todos || !todos.length) {
        todos = []
        todos.push(_createTask('Walk out the dog', 'Booloon'))
        todos.push(_createTask('Buy Milk', 'Booloon'))
        todos.push(_createTask('Bring the mail', 'Booloon'))
        todos.push(_createTask('Cook Dinner', 'Booloon'))
    }

    utilService.saveToStorage(STORAGE_KEY, todos)

}

//* Model
function _createTask(title, username) {
    const todo = {
        _id: utilService.makeId(),
        title: title || utilService.makeLorem(5),
        status: 'active',
        createdAt: new Date(),
        createBy: username || '',
    }

    return todo
}