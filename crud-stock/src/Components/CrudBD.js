import React, { useState, useEffect } from 'react';
import axios from 'axios';

const CrudBD = () => {
    const baseURL = "http://localhost:80/crudApp/index.php";
    const [data, setData] = useState([]);
    const [products, setProducts] = useState({
        ProductsID: '',
        Name: '',
        Description: '',
        Price: '',
        AvailableQuantity: ''
    });

    const handleChange = e => {
        const { name, value } = e.target;
        setProducts((prevState) => ({
            ...prevState,
            [name]: value
        }))
    }

    const requestsGet = async () => {
        await axios.get(baseURL)
            .then(response => {
                console.log(response.data);
                setData(response.data);
            }).catch(error => {
                console.log(error);
            })
    }

    useEffect(() => {
        requestsGet();
    }, [])

    return (
        <div>
            <table>
                <thead>
                    <tr>
                        <th>ID</th>
                        <th>Nombre</th>
                        <th>Descripcion</th>
                        <th>Precio</th>
                        <th>Cantidad Disponible</th>
                        <th>Acciones</th>
                    </tr>
                </thead>
                <tbody>
                    {data.map(products => (

                        <tr key={products.ProductsID}>
                            <td>{products.ProductsID}</td>
                            <td>{products.Name}</td>
                            <td>{products.Description}</td>
                            <td>{products.Price}</td>
                            <td>{products.AvailableQuantity}</td>
                            <td>
                                <button>Editar</button>
                                <button>Eliminar</button>
                            </td>
                        </tr>

                    ))}
                </tbody>
            </table>

        </div>
    )
}

export default CrudBD