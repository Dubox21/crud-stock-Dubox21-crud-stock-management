import React, { useState, useEffect } from 'react';
import axios from 'axios';
import CrudTableRow from './CrudTableRow';

const CrudTable = ({ baseURL, selectProduct }) => {
    const [data, setData] = useState([]);

    const requestsGet = async () => {
        try {
            const response = await axios.get(baseURL);
            setData(response.data);
        } catch (error) {
            console.log(error);
        }
    }

    useEffect(() => {
        requestsGet();
    }, [])

    return (
        <div>
            <h3> Tabla de Datos </h3>
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
                    {data.length === 0 ? (
                        <tr><td colSpan="5">Sin datos</td></tr>
                    ) : (
                        data.map(product => (
                            <CrudTableRow
                                key={product.ProductsID}
                                product={product}
                                selectProduct={selectProduct} />
                        )))}
                </tbody>
            </table>
        </div>
    )
}

export default CrudTable;