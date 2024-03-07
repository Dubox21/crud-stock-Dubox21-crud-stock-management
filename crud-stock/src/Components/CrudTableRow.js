import React from 'react'

const CrudTableRow = ({ el, setDataToEdit, deleteData }) => {
    let [name, description, price, quantity, id] = el;
    return (
        <tr>
            <td>{name}</td>
            <td>{description}</td>
            <td>{price}</td>
            <td>{quantity}</td>
            <td>
                <button onClick={() => setDataToEdit(el)}>Editar</button>
                <button onClick={() => deleteData(id)}>Eliminar</button>
            </td>
        </tr>
    )
}

export default CrudTableRow