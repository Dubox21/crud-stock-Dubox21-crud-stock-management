import React, { useState } from 'react'
import CrudForm from './CrudForm';
import CrudTable from './CrudTable';

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

  }
  const deleteData = (data) => {

  }

  return (
    <div>
      <h2>CRUD APP</h2>
      <CrudForm
        createData={createData}
        updateData={updateData}
        dataToEdit={dataToEdit}
        setDataToEdit={setDataToEdit} />
      <CrudTable
        data={db}
        setDataToEdit={setDataToEdit}
        deleteData={deleteData} />
    </div>
  )
}

export default CrudApp