const { useSelector, useDispatch } = ReactRedux

const { useEffect } = React

import { todoService } from "../services/todo.service.js"
import { showSuccessMsg, showErrorMsg } from '../services/event-bus.service.js'

import { TodoList } from "../cmp/TodoList.jsx"

import { loadTodos, removeTodo, saveTodo } from "../store/actions/todo.actions.js"


export function TodoApp() {

    const dispatch = useDispatch()
    const todos = useSelector(storeState => storeState.todos)

    useEffect(() => {
        loadTodos()
    }, [])

    function onRemoveTodo(todoId) {
        console.log(todoId)
        removeTodo(todoId)
            .then(() => {
                showSuccessMsg(`Deleted ToDo ${todoId}`)
            })
            .catch(err => {
                showErrorMsg(`Cannot delete ToDo ${todoId}`)
            })
    }

    function onAddTodo() {
        const newTodo = todoService.getEmptyTodo()
        newTodo.title = prompt('New ToDo? ')

        saveTodo(newTodo)
            .then(() => {
                showSuccessMsg(`Added ToDo ${newTodo.title}`)
            })
            .catch(err => {
                showErrorMsg(`Cannot Add ToDo ${newTodo.title}`)
            })
    }

    function onStatusTodo(todo) {
        console.log('onStatusTodo', todo)
        const status = todo.status === 'active' ? 'complete' : 'active'
        console.log('statusTodo', status)
        const todoStatusToSave = { ...todo, status }
        console.log(todoStatusToSave)

        saveTodo(todoStatusToSave)
            .then(() => {
                showSuccessMsg(`Todo status updated`)
            })
            .catch(err => {
                showErrorMsg('Cannot update status todo')
            })
    }

    function onEditTodo(todo) {
        console.log(todo)
        const title = prompt('Change Todo? ')
        const todoToSave = { ...todo, title }
        console.log(todoToSave)

        saveTodo(todoToSave)
            .then(() => {
                showSuccessMsg(`Todo updated`)
            })
            .catch(err => {
                showErrorMsg('Cannot update todo')
            })
    }




    return <div>
        <h3>What Need To Be Done?</h3>
        <main>
            {/* <TodoFilter /> */}

            <TodoList todos={todos} onRemoveTodo={onRemoveTodo} onAddTodo={onAddTodo} onStatusTodo={onStatusTodo} onEditTodo={onEditTodo} />
        </main>
    </div>
}