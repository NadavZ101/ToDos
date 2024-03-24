const { useSelector, useDispatch } = ReactRedux

const { useEffect } = React

import { todoService } from "../services/todo.service.js"
import { showSuccessMsg, showErrorMsg } from '../services/event-bus.service.js'

import { TodoFilter } from "../cmp/TodoFilter.jsx"
import { TodoList } from "../cmp/TodoList.jsx"

import { loadTodos, removeTodo, saveTodo, setFilterBy } from "../store/actions/todo.actions.js"


export function TodoApp() {

    const dispatch = useDispatch()
    const todos = useSelector(storeState => storeState.todos)
    const filterBy = useSelector(storeState => storeState.filterBy)

    useEffect(() => {
        loadTodos(filterBy)
    }, [filterBy])

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

    // function onAddTodo() {
    //     const newTodo = todoService.getEmptyTodo()
    //     newTodo.title = prompt('New ToDo? ')

    //     saveTodo(newTodo)
    //         .then(() => {
    //             showSuccessMsg(`Added ToDo ${newTodo.title}`)
    //         })
    //         .catch(err => {
    //             showErrorMsg(`Cannot Add ToDo ${newTodo.title}`)
    //         })
    // }


    // function onEditTodo(todo) {
    //     console.log(todo)
    //     const title = prompt('Change Todo? ')
    //     const todoToSave = { ...todo, title }
    //     console.log(todoToSave)

    //     saveTodo(todoToSave)
    //         .then(() => {
    //             showSuccessMsg(`Todo updated`)
    //         })
    //         .catch(err => {
    //             showErrorMsg('Cannot update todo')
    //         })
    // }

    function onFilter(filterBy) {
        console.log('index-filter', filterBy)
        setFilterBy(filterBy)
        // .then(() => {
        //     showSuccessMsg(`FilterBy updated`)
        // })
        // .catch(err => {
        //     showErrorMsg('Cannot update FilterBy')
        // })
    }


    return <div>
        <h3>What Need To Be Done?</h3>
        <main>
            <TodoFilter todos={todos} onFilter={onFilter} />

            <TodoList todos={todos} onRemoveTodo={onRemoveTodo} onStatusTodo={onStatusTodo} />

            {/* <TodoList todos={todos} onRemoveTodo={onRemoveTodo} onAddTodo={onAddTodo} onStatusTodo={onStatusTodo} onEditTodo={onEditTodo} /> */}
        </main>
    </div>
}