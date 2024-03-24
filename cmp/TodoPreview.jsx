const { Link } = ReactRouterDOM

export function TodoPreview({ todo, onRemoveTodo, onStatusTodo, onEditTodo }) {

    function handleRemoveClick(ev) {
        console.log('Remove click')
        ev.preventDefault()
        // ev.stopPropagation()
        onRemoveTodo(todo._id)
    }

    function editTodo(ev) {
        console.log(todo)
        ev.preventDefault()
        onEditTodo(todo)
    }

    function handleStatusTodo(ev) {
        ev.preventDefault()
        onStatusTodo(todo)
    }

    function getStatusClass() {
        if (todo.status === 'complete') return 'complete'
        else return ''
    }


    return <section className="todo-preview flex justify-between">
        <button className="checkbox-btn" onClick={handleStatusTodo}>
            <input type="checkbox"></input>
        </button>
        <p className={getStatusClass()}>{todo.title}</p>
        < button className="btn" onClick={handleRemoveClick}>🗑️</button>
        {/* < button className="btn" onClick={editTodo}>Edit</button> */}
        {/* < button className="btn" onClick={editTodo}>Edit</button> */}
        {/* <Link className="btn" to={`/todo/${todo._id}`}>Details</Link> */}

        <button className="edit-btn">
            <Link to={`/todo/edit/${todo._id}`}>Edit</Link>
        </button>

    </section>
}