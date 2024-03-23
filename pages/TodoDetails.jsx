const { useSelector, useDispatch } = ReactRedux
const { useParams } = ReactRouterDOM
const { useEffect } = React

// import { loadTodo } from '../action/todo.actions.js'
import { loadTodos, loadTodo } from '../store/actions/todo.actions.js'

export function TodoDetails() {
    const todo = useSelector(storeState => storeState.todo)

    //isnt working with enlist to todos...
    // const todos = useSelector(storeState => storeState.todos)
    const { todoId } = useParams()

    console.log(todoId)

    useEffect(() => {
        loadTodo(todoId)
    }, [])

    return (
        <section className="todo-details flex column">
            <h3>ToDo Details:</h3>
            <p>Title: {todo.title}</p>
            <p>status: {todo.status}</p>
            <p>Created At: {todo.createdAt}</p>
            <p>Created By: {todo.createBy}</p>
        </section>

        // <section className="todo-details flex column">
        //     <h3>ToDo Details:</h3>
        //     <p>Title: {todos.title}</p>
        //     <p>status: {todos.status}</p>
        //     <p>Created At: {todos.createdAt}</p>
        // </section>
    )
}