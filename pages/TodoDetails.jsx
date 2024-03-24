const { useSelector, useDispatch } = ReactRedux
const { useParams, Link } = ReactRouterDOM
const { useEffect, useState } = React

import { showErrorMsg } from "../services/event-bus.service.js"
import { todoService } from "./services/todo.service.js"

export function TodoDetails() {
    const [todo, setTodo] = useState(null)


    const { todoId } = useParams()

    console.log(todoId)

    useEffect(() => {
        if (todoId) loadTodo()

    }, [todoId])

    function loadTodo() {
        todoService.getTodoById(todoId)
            .then(todo => setTodo(todo))
            .catch(err => {
                showErrorMsg('Cannot load todo ', err)
            })
    }


    if (!todo) return <div>Loading...</div>
    return (
        <section className="todo-details flex column">
            <h3>ToDo Details:</h3>
            <p>Title: {todo.title}</p>
            <p>status: {todo.status}</p>
            <p>Created At: {todo.createdAt}</p>
            <p>Created By: {todo.createBy}</p>

            <button className="btn">
                <Link to="/todo">Back</Link>
            </button>
        </section>
    )
}