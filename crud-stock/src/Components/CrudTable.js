import React, { useEffect } from 'react';
import CrudTableRow from './CrudTableRow';

const CrudTable = ({ data, selectProduct, requestsDelete, requestsGet }) => {

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
                        <tr><td colSpan="5">"Estimado usuario, en estos momentos el acceso a la BD no esta disponible"</td></tr>
                    ) : (
                        data.map(product => (
                            <CrudTableRow
                                key={product.ProductsID}
                                product={product}
                                selectProduct={selectProduct}
                                requestsDelete={requestsDelete}/>
                        )))}
                </tbody>
            </table>
        </div>
    )
}

export default CrudTable;