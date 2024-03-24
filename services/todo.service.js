import { storageService } from './async-storage.service.js'
import { userService } from './user.service.js'
import { utilService } from './util.service.js'

const STORAGE_KEY = 'todoDB'

const PAGE_SIZE = 6

export const todoService = {
    query,
    remove,
    getEmptyTodo,
    save,
    getTodoById,
    changeStatus,
    getDefaultFilterBy,
    getDefaultSortBy,
}

function query(filterBy = {}, sortBy = {}) {
    console.log('service -> query -> filterBy', filterBy)
    console.log('service -> query -> sortBy', sortBy)

    return storageService.query(STORAGE_KEY)
        .then(todos => {

            if (filterBy.txt) {
                console.log('By Txt')
                const regExp = new RegExp(filterBy.txt, 'i')
                todos = todos.filter(todo => regExp.test(todo.title))
            }
            if (filterBy.status === 'active') {
                todos = todos.filter(todo => todo.status === filterBy.status)
            }

            if (filterBy.status === 'complete') {
                todos = todos.filter(todo => todo.status === filterBy.status)
            }

            if (filterBy.pageIdx !== undefined) {
                const startIdx = filterBy.pageIdx * PAGE_SIZE
                todos = todos.slice(startIdx, PAGE_SIZE + startIdx)
            }

            if (sortBy.type === 'title') {
                // (sortBy.desc) ---> direction
                todos.sort((todo1, todo2) => (sortBy.desc) * todo2.title.localeCompare(todo1.title))
            }

            if (sortBy.type === 'createAt') {

                todos.sort((todo1, todo2) => (sortBy.desc) * (todo2.createdAt - todo1.createdAt))
            }

            if (sortBy.type === 'status') {
                todos.sort((todo1, todo2) => (sortBy.desc) * todo2.status.localeCompare(todo1.status))
            }

            return todos
        })
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
        todo.createBy = userService.getLoggedInUser().username
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

function getDefaultFilterBy() {
    return { status: '', txt: '', pageIdx: 0 }
}

function getDefaultSortBy() {
    return { type: '', desc: 1 }
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