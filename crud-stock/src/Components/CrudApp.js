import React, { useState, useEffect } from 'react';
import axios from 'axios';
import CrudForm from './CrudForm';
import CrudTable from './CrudTable';

const CrudApp = () => {
  const baseURL = "http://localhost:80/crudApp/index.php";
  const [dataToEdit, setDataToEdit] = useState(null);
  const [isEditing, setIsEditing] = useState(false);
  const [editMethod, setEditMethod] = useState('POST');
  const [products, setProducts] = useState({
    ProductsID: '',
    Name: '',
    Description: '',
    Price: '',
    AvailableQuantity: ''
  });

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

  const requestsDelete = async (product) => {
    var formData = new FormData();
    formData.append("METHOD", "DELETE");
    await axios.post(baseURL, formData, { params: { ProductsID: product.ProductsID } })
        .then(response => {
            // Actualizar el estado de los datos después de eliminar el producto
            if (dataToEdit !== null) {
                setDataToEdit(prevData => prevData.filter(item => item.ProductsID !== product.ProductsID));
            }
        }).catch(error => {
            console.log(error);
        });
}

  const selectProduct = (product, option) => {
    if (option === "Editar") {
      setIsEditing(true);
      setDataToEdit(product);
      setEditMethod('PUT');
    } else if (option === "Eliminar") {
      setIsEditing(false);
      setDataToEdit(product);
      setEditMethod('DELETE');
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
          requestsPost={requestsPost}
          requestsPut={requestsPut}
          requestsDelete={requestsDelete}
          products={products} 
          setProducts={setProducts}
        />
        <CrudTable
          baseURL={baseURL}
          selectProduct={selectProduct}
          requestsDelete={requestsDelete}
        />
      </article>
    </div>
  )
}

export default CrudApp;