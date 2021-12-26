import React from 'react'

const RenderPhonebook = ({ key, name, number }) => {
    return (
        <li key={key}>{name} {number}</li>
    )
}

export default RenderPhonebook