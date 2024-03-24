const { useParams, useNavigate } = ReactRouterDOM
const { useSelector } = ReactRedux
const { useEffect, useState } = React


import { todoService } from "../services/todo.service.js"

import { saveTodo } from "../store/actions/todo.actions.js"
import { showErrorMsg, showSuccessMsg } from "../services/event-bus.service.js"

export function TodoEdit() {
    // console.log(todo)

    const [todoToEdit, setTodoToEdit] = useState(todoService.getEmptyTodo())
    // from local state - no need for global

    const { todoId } = useParams()
    const navigate = useNavigate()

    // const todo = useSelector(storeState => storeState.todo)
    // console.log(todo)

    useEffect(() => {
        if (todoId) loadTodo()
    }, [])

    function loadTodo() {
        todoService.getTodoById(todoId)
            .then((todo) => setTodoToEdit(todo))
            .catch(err => {
                console.log("Cannot load Todo", err)
                navigate('/todo')
            })
    }

    function handleInput({ target }) {
        const field = target.name
        const value = target.value

        setTodoToEdit((prevTodo) => ({ ...prevTodo, [field]: value }))
    }

    function onSaveTodo(ev) {
        ev.preventDefault()
        saveTodo(todoToEdit)
            .then(() => {
                showSuccessMsg('Successfully edit todo')
                navigate('/todo')
            })
            .catch(err => {
                showErrorMsg('Cannot edit todo')
            })
    }


    console.log(todoToEdit)

    return <section>
        <h3>Edit The ToDo</h3>
        <form onSubmit={onSaveTodo}>
            <label htmlFor="title">ToDo</label>
            <input
                type="text"
                name="title"
                value={todoToEdit.title}
                onChange={handleInput}
            />
            <button className="btn">{todoToEdit._id ? 'Save' : 'Add'}</button>
        </form>
    </section>
}