import React, {useState} from 'react'
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
 const [db, setDb] = useState (initialDB);

  return (
    <div>
      <h2>CRUD APP</h2>
      <CrudForm />
      <CrudTable data={db} />
    </div>
  )
}

export default CrudApp