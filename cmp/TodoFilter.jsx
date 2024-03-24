const { useState, useEffect, useRef } = React

import { todoService } from "../services/todo.service.js"
import { utilService } from "../services/util.service.js"

export function TodoFilter({ filterBy, onSetFilter }) {
    const [filterByToEdit, setFilterByToEdit] = useState({ ...filterBy })
    onSetFilter = useRef(utilService.debounce(onSetFilter, 300))
    console.log(filterByToEdit)

    useEffect(() => {
        onSetFilter.current(filterByToEdit)
        // current -> from debounce
    }, [filterByToEdit])

    function handleSelect({ target }) {
        const field = target.name
        const value = target.value
        setFilterByToEdit(prevFilterBy => ({ ...prevFilterBy, [field]: value }))
    }

    function handleSubmit(ev) {
        ev.preventDefault()
        console.log('HANDELLLLL')
        onSetFilter(filterByToEdit)
    }

    // onSubmit={handleSubmit}

    // const { status } = filterByToEdit
    return <form className="filter-form" >
        <input
            type="text"
            name="txt"
            id="txt"
            value={filterByToEdit.txt}
            onChange={handleSelect}
            placeholder="Search Text"
        />

        <select className="filter-list" name="status" value={filterByToEdit.status} onChange={handleSelect}>
            <option value="all">All</option>
            <option value="active">Active</option>
            <option value="complete">Complete</option>
        </select>
        <button className="filter-btn" type="submit">Filter</button>
    </form>
}