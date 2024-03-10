import React, { useState } from 'react'
import CrudForm from './CrudForm';
import CrudTable from './CrudTable';
import CrudBD from './CrudBD'; 

const initialDB = [
  {
    id: 1,
    name: 'Tomate',
    description: 'fruta',
    price: 20,
    quantity: 10
  },
  {
    id: 2,
    name: 'Pera',
    description: 'fruta',
    price: 50,
    quantity: 5
  }
];

const CrudApp = () => {
  const [db, setDb] = useState(initialDB);
  const [dataToEdit, setDataToEdit] = useState(null);

  const createData = (data) => {
    data.id = Date.now();
    setDb([...db, data]);
  }

  const updateData = (data) => {
    let newData = db.map(el => el.id === data.id ? data : el);
    setDb(newData);
  }

  const deleteData = (id) => {
    let isDelete = window.confirm(
      `¿Estas seguro de eliminar el registro con el id '${id}'?`
    );

    if (isDelete) {
      let newData = db.filter(el => el.id !== id);
      setDb(newData);
    } else {
      return;
    }
  }

  return (
    <div>
      <h2>CRUD APP</h2>
      <article className="grid-1-2">
        <CrudForm
          createData={createData}
          updateData={updateData}
          dataToEdit={dataToEdit}
          setDataToEdit={setDataToEdit} />
        <CrudTable
          data={db}
          setDataToEdit={setDataToEdit}
          deleteData={deleteData} />
                <CrudBD/>
      </article>
    </div>
  )
}

export default CrudApp