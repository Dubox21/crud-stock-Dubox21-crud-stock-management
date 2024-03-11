import React, { useState, useEffect } from 'react';
import CrudTableRow from './CrudTableRow';

const CrudForm = ({ isEditing, products, setProducts, requestsPost, requestsPut }) => {

    const handleChange = e => {
        const { name, value } = e.target;
        setProducts(prevState => ({
            ...prevState,
            [name]: value
        }));
        console.log(products);
    }

    const handleSubmit = async (e) => {
        e.preventDefault();

        if (isEditing) {
            await requestsPut(products);
        } else {
            await requestsPost(products);
        }

        window.location.reload(); // Recargar la página después de enviar el formulario
    };

    return (
        <div>
            <h3>{isEditing ? "Editar" : "Agregar"}</h3>
            <form onSubmit={handleSubmit}>
                <input type='text' name='Name' placeholder='Nombre' onChange={handleChange} value={products.Name} />
                <input type='text' name='Description' placeholder='Descripción' onChange={handleChange} value={products.Description} />
                <input type='number' name='Price' placeholder='Precio' onChange={handleChange} value={products.Price} />
                <input type='number' name='AvailableQuantity' placeholder='Cantidad Disponible' onChange={handleChange} value={products.AvailableQuantity} />
                <input type='submit' value={isEditing ? 'Editar' : 'Enviar'} />
                <input type='reset' value='Limpiar' />
            </form>
        </div>
    )
}

export default CrudForm;