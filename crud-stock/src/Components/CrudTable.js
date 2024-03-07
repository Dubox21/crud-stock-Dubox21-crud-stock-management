import React from 'react'
import CrudTableRow from './CrudTableRow'

const CrudTable = ({ data, setDataToEdit, deleteData }) => {
    return (
        <div>
            <h3> Tabla de Datos </h3>
            <table>
                <thead>
                    <tr>
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
                        data.map((el) => <CrudTableRow key={el.id} el={el} setDataToEdit={setDataToEdit} deleteData={deleteData} />)
                    )}
                </tbody>
            </table>
        </div>
    )
}

export default CrudTable