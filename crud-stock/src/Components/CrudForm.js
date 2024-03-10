import React, { useState, useEffect } from 'react';
import axios from 'axios';

const CrudForm = ({ isEditing, dataToEdit, setDataToEdit, baseURL, editMethod }) => {
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
            setProducts({
                ProductsID: '',
                Name: '',
                Description: '',
                Price: '',
                AvailableQuantity: ''
            });
        }
    }, [dataToEdit])

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (isEditing) {
            await requestsPut(products);
        } else {
            await requestsPost(products);
        }
        window.location.reload(); // Recargar la página después de enviar el formulario
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

    const requestsPut = async (products) => {
        const formData = new FormData();
        formData.append("Name", products.Name);
        formData.append("Description", products.Description);
        formData.append("Price", products.Price);
        formData.append("AvailableQuantity", products.AvailableQuantity);
        formData.append("METHOD", "PUT");
        await axios.post(baseURL, formData, { params: { ProductsID: products.ProductsID } })
            .then(response => {
                var dataNew = dataToEdit;
                if (Array.isArray(dataNew)) { // Comprobar si dataNew es un array
                    dataNew = dataNew.map(product => {
                        if (product.ProductsID === products.ProductsID) {
                            return {
                                ...product,
                                Name: products.Name,
                                Description: products.Description,
                                Price: products.Price,
                                AvailableQuantity: products.AvailableQuantity
                            };
                        } else {
                            return product;
                        }
                    });
                    setDataToEdit(dataNew);
                }
            }).catch(error => {
                console.log(error);
            });
    }

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