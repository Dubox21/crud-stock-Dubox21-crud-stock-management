import React from 'react';

const CrudTableRow = ({ product, selectProduct }) => {
    return (
        <tr>
            <td>{product.ProductsID}</td>
            <td>{product.Name}</td>
            <td>{product.Description}</td>
            <td>{product.Price}</td>
            <td>{product.AvailableQuantity}</td>
            <td>
                <button onClick={() => selectProduct(product, "Editar")}>Editar</button>
                <button>Eliminar</button>
            </td>
        </tr>
    );
}

export default CrudTableRow;
