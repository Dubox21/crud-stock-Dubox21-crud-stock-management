import React from 'react'

const CrudTableRow = ({el}) => {
    return (
        <tr>
            <th>{el.name}</th>
            <th>{el.description}</th>
            <th>{el.price}</th>
            <th>{el.quantity}</th>
            <th>
                <button>Editar</button>
                <button>Eliminar</button>
            </th>
        </tr>
    )
}

export default CrudTableRow