const { useSelector, useDispatch } = ReactRedux

const { useEffect } = React

import { todoService } from "../services/todo.service.js"
import { showSuccessMsg, showErrorMsg } from '../services/event-bus.service.js'

import { TodoFilter } from "../cmp/TodoFilter.jsx"
import { TodoSort } from "../cmp/TodoSort.jsx"
import { TodoList } from "../cmp/TodoList.jsx"

import { loadTodos, removeTodo, saveTodo, setFilterBy, setSortBy, isLoading } from "../store/actions/todo.actions.js"


export function TodoApp() {

    const dispatch = useDispatch()
    const todos = useSelector(storeState => storeState.todoModule.todos)
    const filterBy = useSelector(storeState => storeState.todoModule.filterBy)
    const sortBy = useSelector(storeState => storeState.todoModule.sortBy)
    const isLoading = useSelector(storeState => storeState.todoModule.isLoading)

    useEffect(() => {
        loadTodos()
            .catch(err => {
                showErrorMsg('Cannot load todos!')
            })
    }, [filterBy, sortBy])

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

    function onSetFilter(filterBy) {
        console.log('index-filter', filterBy)
        setFilterBy(filterBy)
    }

    function onSetSort(sortBy) {
        console.log('index-sort', sortBy)
        setSortBy(sortBy)
    }

    if (!todos) return <div>Loading...</div>
    return <div>
        <h3>What Need To Be Done?</h3>
        <main>
            <TodoFilter filterBy={filterBy} onSetFilter={onSetFilter} />
            <TodoSort sortBy={sortBy} onSetSort={onSetSort} />

            <TodoList todos={todos} onRemoveTodo={onRemoveTodo} onStatusTodo={onStatusTodo} />

            {(!todos.length) && <div>No todos to show...</div>}

        </main>
    </div>
}