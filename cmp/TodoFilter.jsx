const { useState } = React

import { todoService } from "../services/todo.service.js"

export function TodoFilter({ todos, onFilter }) {
    console.log(todos)

    const [filterByToEdit, setFilterByToEdit] = useState(todoService.getEmptyFilterBy())

    console.log(filterByToEdit)

    function handleSelect({ target }) {
        const field = target.name
        const value = target.value
        setFilterByToEdit(prevFilterBy => ({ ...prevFilterBy, [field]: value }))
    }

    function handleSubmit(ev) {
        ev.preventDefault()
        console.log('HANDELLLLL')
        onFilter(filterByToEdit)
    }


    const { status } = filterByToEdit

    return <form className="filter-form" onSubmit={handleSubmit}>
        <select className="filter-list" name="status" value={status} onChange={handleSelect}>
            <option value="all">All</option>
            <option value="active">Active</option>
            <option value="complete">Complete</option>
        </select>
        <button className="filter-btn" type="submit">Filter</button>
    </form>
}