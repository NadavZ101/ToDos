const { useParams, useNavigate } = ReactRouterDOM
const { useSelector } = ReactRedux
const { useEffect, useState } = React

import { loadTodo } from "../store/actions/todo.actions.js"
import { TodoDetails } from "./TodoDetails.jsx"

import { todoService } from "../services/todo.service.js"
import { utilService } from "../services/util.service"

export function TodoEdit() {
    // console.log(todo)

    const [todoToEdit, setTodoToEdit] = useState(todoService.getEmptyTodo())
    const { todoId } = useParams()
    console.log('TodoEdit', todoId)
    const navigate = useNavigate()
    // const todo = useSelector(storeState => storeState.todo)
    // console.log(todo)

    useEffect(() => {
        if (!todoId) return
        loadTodo()
    }, [])

    function loadTodo() {
        todoService.getTodoById(todoId)
            .then((todo) => {
                console.log(todo)
                setTodoToEdit(todo)
            })
            .catch(err => {
                console.log("Cannot load Todo")
                throw err
            })
    }

    function handleInput({ target }) {
        const field = target.name
        const value = target.value

        setTodoToEdit((prevTodo) => ({ ...prevTodo, [field]: value }))
    }

    function onSaveTodo(ev) {
        ev.preventDefault()
        todoService.save(todoToEdit)
            .then(() => navigate('/todo'))
            .catch(err => {
                console.log("Cannot Update Todo")
                throw err
            })
    }

    console.log(todoToEdit)


    // const newTitle = prompt('Change ToDo? ')

    // const { title } = todoToEdit
    return <section>
        <h3>Edit The ToDo</h3>
        <form onSubmit={onSaveTodo}>
            <label htmlFor="title">Title</label>
            <input
                type="text"
                name="title"
                value={todoToEdit.title}
                onChange={handleInput}
            />
            <button className="btn">Change</button>
        </form>
    </section>
}