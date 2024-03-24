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
        const value = target.type === 'number' ? +target.value : target.value
        setFilterByToEdit(prevFilterBy => ({ ...prevFilterBy, [field]: value }))
    }

    function handleSubmit(ev) {
        ev.preventDefault()
        onSetFilter(filterByToEdit)
    }

    // onSubmit={handleSubmit}

    // const { status } = filterByToEdit
    return <div className="filter-container">
        <h3>Filter</h3>
        <form className="filter-form" >
            <span className="filter-span">By Title:</span>
            <input
                type="text"
                name="txt"
                id="txt"
                value={filterByToEdit.txt}
                onChange={handleSelect}
                placeholder="Search Text"
            />

            <span className="filter-span">By Status:</span>
            <select className="filter-list" name="status" value={filterByToEdit.status} onChange={handleSelect}>
                <option value="all">All</option>
                <option value="active">Active</option>
                <option value="complete">Complete</option>
            </select>

            <label htmlFor="pageIdx">Page:</label>
            <input
                type="number"
                id="pageIdx"
                name="pageIdx"
                value={filterBy.pageIdx}
                onChange={handleSelect}
                placeholder="0"
            />
        </form>
    </div>
}