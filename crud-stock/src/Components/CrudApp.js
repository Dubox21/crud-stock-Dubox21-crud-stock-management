import React, { useState } from 'react'
import CrudForm from './CrudForm';
import CrudTable from './CrudTable';

const CrudApp = () => {
  const baseURL = "http://localhost:80/crudApp/index.php";
  const [dataToEdit, setDataToEdit] = useState(null);
  const [products, setProducts] = useState({
    ProductsID: '',
    Name: '',
    Description: '',
    Price: '',
    AvailableQuantity: ''
  });

  const selectProduct = (product, option) => {
    setProducts(product);
    if (option === "Editar") {
        console.log("El producto se seleccionó para edición");
        setDataToEdit(product); // Establecer el producto seleccionado para edición
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
          products={products}
          setProducts={setProducts}
          dataToEdit={dataToEdit}
          setDataToEdit={setDataToEdit}
          baseURL={baseURL} />
        <CrudTable
          baseURL={baseURL}
          selectProduct={selectProduct}
          setDataToEdit={setDataToEdit}
        />
      </article>
    </div>
  )
}

export default CrudApp