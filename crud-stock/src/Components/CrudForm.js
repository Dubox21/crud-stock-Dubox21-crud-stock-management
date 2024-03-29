import React from 'react';

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
            alert("El producto se editó correctamente.");
        } else {
            await requestsPost(products);
            alert("El producto se agregó correctamente.");
        }
        window.location.reload();
    };

    return (
        <div>
            <h3>{isEditing ? "Editar" : "Agregar"}</h3>
            <form onSubmit={handleSubmit}>
                <input type='text' name='Name' placeholder='Nombre' onChange={handleChange} value={products.Name} required/>
                <input type='text' name='Description' placeholder='Descripción' onChange={handleChange} value={products.Description} required/>
                <input type='number' name='Price' placeholder='Precio' onChange={handleChange} value={products.Price} required/>
                <input type='number' name='AvailableQuantity' placeholder='Cantidad Disponible' onChange={handleChange} value={products.AvailableQuantity} required/>
                <input type='submit' value={isEditing ? 'Editar' : 'Enviar'} />
                <input type='reset' value='Limpiar' />
            </form>
        </div>
    )
}

export default CrudForm;