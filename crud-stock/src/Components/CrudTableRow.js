import React from 'react';

const CrudTableRow = ({ product, selectProduct, requestsDelete }) => {
    const handleDelete = () => {
        let isDelete = window.confirm(
            `¿Estas seguro de eliminar el producto '${product.Name}' con el id '${product.ProductsID}'?`
        );
        if (isDelete) {
            requestsDelete(product); // Llama a la función requestsDelete con el producto como argumento
            
        } else {
            return
        }
    };

    return (
        <tr key={product.ProductsID}>
            <td>{product.ProductsID}</td>
            <td>{product.Name}</td>
            <td>{product.Description}</td>
            <td>{product.Price}</td>
            <td>{product.AvailableQuantity}</td>
            <td>
                <button onClick={() => selectProduct(product, "Editar")}>Editar</button>
                <button onClick={handleDelete}>Eliminar</button>
            </td>
        </tr>
    );
}

export default CrudTableRow;
