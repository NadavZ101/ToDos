const { useState, useEffect } = React

export function TodoSort({ sortBy, onSetSort }) {

    const [sortByToEdit, setSortByToEdit] = useState({ ...sortBy })

    useEffect(() => {
        onSetSort(sortByToEdit)
    }, [sortByToEdit])

    function handleChange({ target }) {
        const field = target.name
        const value = target.value === 'number' ? +target.value : target.value

        if (field === 'desc')
            setSortByToEdit(prevSort => ({ ...prevSort, desc: -prevSort.desc }))
        else
            setSortByToEdit(prevSort => ({ ...prevSort, [field]: value }))
    }

    return <form className="todo-sort">
        <select
            className="sort-type"
            name="type"
            value={sortByToEdit.type}
            onChange={handleChange}
        >
            <option value={''}>----</option>
            <option value='title'>Title</option>
            <option value='createAt'>Date</option>
            <option value='status'>Status</option>
        </select>
        <label htmlFor="desc">
            <input
                type="checkbox"
                name="desc"
                checked={sortByToEdit.desc > 0}
                onChange={handleChange}
            />
            Descending
        </label>
    </form>
}