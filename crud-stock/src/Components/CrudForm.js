import React, { useState, useEffect } from 'react';
import axios from 'axios';

const CrudForm = ({ dataToEdit, setDataToEdit, baseURL }) => {
    const [products, setProducts] = useState({
        ProductsID: '',
        Name: '',
        Description: '',
        Price: '',
        AvailableQuantity: ''
    });

    const handleChange = e => {
        const { name, value } = e.target;
        setProducts(prevState => ({
            ...prevState,
            [name]: value
        }));
        console.log(products);
    }

    useEffect(() => {
        if (dataToEdit) {
            setProducts(dataToEdit);
        } else {
            setProducts();
        }
    }, [dataToEdit])

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (products.ProductsID === '') {
            await requestsPost(products);
        } else {
            // Enviar para editar
        }
        window.location.reload(); // Evitar recargar la página
    };
    const requestsPost = async (products) => {
        const formData = new FormData();
        formData.append("Name", products.Name);
        formData.append("Description", products.Description);
        formData.append("Price", products.Price);
        formData.append("AvailableQuantity", products.AvailableQuantity);
        formData.append("METHOD", "POST");
        try {
            const response = await axios.post(baseURL, formData);
            setDataToEdit(null);
            console.log(response.data);
        } catch (error) {
            console.log(error);
        }
    }

    return (
        <div>
            <h3>{dataToEdit ? "Editar" : "Agregar"}</h3>
            <form onSubmit={handleSubmit}>
                <input type='text' name='Name' placeholder='Nombre' onChange={handleChange} value={products && products.Name} />
                <input type='text' name='Description' placeholder='Descripción' onChange={handleChange} value={products && products.Description} />
                <input type='number' name='Price' placeholder='Precio' onChange={handleChange} value={products && products.Price} />
                <input type='number' name='AvailableQuantity' placeholder='Cantidad Disponible' onChange={handleChange} value={products && products.AvailableQuantity} />
                <input type='submit' value='Enviar' />
                <input type='reset' value='Limpiar' />
            </form>
        </div>
    )
}

export default CrudForm;