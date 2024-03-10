import React, { useState } from 'react'
import CrudForm from './CrudForm';
import CrudTable from './CrudTable';

const CrudApp = () => {
  const baseURL = "http://localhost:80/crudApp/index.php";
  const [dataToEdit, setDataToEdit] = useState(null);
  const [isEditing, setIsEditing] = useState(false);
  const [editMethod, setEditMethod] = useState('POST');

  const selectProduct = (product, option) => {
    if (option === "Editar") {
      setIsEditing(true);
      setDataToEdit(product);
      setEditMethod('PUT');
    } else {
      setIsEditing(false);
      setDataToEdit(null);
      setEditMethod('POST');
    }
  }

  // const deleteData = (id) => {
  //   let isDelete = window.confirm(
  //     `¿Estas seguro de eliminar el registro con el id '${id}'?`
  //   );

  //   if (isDelete) {
  //     let newData = db.filter(el => el.id !== id);
  //     setDb(newData);
  //   } else {
  //     return;
  //   }
  // }

  return (
    <div>
      <h2>CRUD APP</h2>
      <article className="grid-1-2">
        <CrudForm
          isEditing={isEditing}
          dataToEdit={dataToEdit}
          setDataToEdit={setDataToEdit}
          baseURL={baseURL}
          editMethod={editMethod}
        />
        <CrudTable
          baseURL={baseURL}
          selectProduct={selectProduct}
          setDataToEdit={setDataToEdit}
        />
      </article>
    </div>
  )
}

export default CrudApp;