import React from 'react'

const Filter = ({ searchTerm, searchName }) => {
    return (
        <div>
        filter shown with: <input value={searchTerm} onChange={searchName}/>
        </div>
    )
}

export default Filter