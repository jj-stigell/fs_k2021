import React from 'react'

const RenderPhonebook = ({ id, name, number, deletePerson }) => {
    return (
        <li key={id}>
            {name} {number}
            <form onSubmit={(event) => {
                if(window.confirm(`Delete ${name}`)) {
                    deletePerson(event, id, name)
                }
            }}>
              <button type="submit">Delete</button>
            </form>
        </li>
    )
}

export default RenderPhonebook