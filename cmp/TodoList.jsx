import { TodoPreview } from './TodoPreview.jsx'
const { Link } = ReactRouterDOM

export function TodoList({ todos, onRemoveTodo, onAddTodo, onStatusTodo, onEditTodo }) {

    return <section className="todo-list flex column">
        <button className="add-btn" onClick={() => onAddTodo()}>New ToDo 📇</button>

        {todos.map(todo => (
            <article className="todo-preview" key={todo._id}>
                <Link className="btn" to={`/todo/${todo._id}`}>
                    <TodoPreview todo={todo} onRemoveTodo={onRemoveTodo} onStatusTodo={onStatusTodo} onEditTodo={onEditTodo} />
                </Link>
            </article>
        ))
        }
    </section >
}