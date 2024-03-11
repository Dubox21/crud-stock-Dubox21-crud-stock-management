import React, { useState, useEffect } from 'react';
import axios from 'axios';
import CrudForm from './CrudForm';
import CrudTable from './CrudTable';
import Modal from './Modal';
import { useModal } from '../hooks/useModal';

const CrudApp = () => {
  const [data, setData] = useState([]);
  const [isOpenModal, openModal, closeModal] = useModal(false);
  const [showInventory, setShowInventory] = useState(false); // Estado para controlar si se muestra el inventario
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
  }, [dataToEdit]);

  useEffect(() => {
    // Resetea isEditing cuando el modal esta cerrado
    if (!isOpenModal) {
      setIsEditing(false);
    }
  }, [isOpenModal]);

  const resetForm = () => {
    setProducts({
      ProductsID: '',
      Name: '',
      Description: '',
      Price: '',
      AvailableQuantity: ''
    });
  };

  const toggleInventory = () => {
    setShowInventory(!showInventory); // Alternar entre mostrar y ocultar inventario
  }


  const requestsGet = async () => {
    try {
      const response = await axios.get(baseURL);
      setData(response.data);
    } catch (error) {
      console.log(error);
    }
  }

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
        requestsGet(); // Obtener los datos actualizados
        closeModal(); // Cerrar el modal si está abierto
      }).catch(error => {
        console.log(error);
      });
  }

  const selectProduct = (product, option) => {
    if (option === "Editar") {
      setIsEditing(true);
      setDataToEdit(product);
      setProducts(product); // Establecer los datos del producto en el formulario
      openModal();
      setEditMethod('PUT');
    } else if (option === "Eliminar") {
      setIsEditing(false);
      setDataToEdit(product);
      setEditMethod('DELETE');
    }
  }

  return (
    <div>
      <h2>CRUD APP</h2>
      <article className="grid-1-2">
        <button onClick={toggleInventory}>{showInventory ? 'Ocultar Info' : 'Consultar Inventario'}</button>
        <button onClick={() => {
          setIsEditing(false); // Set isEditing es falso cuando se hace click en "Agregar Producto"
          resetForm();
          openModal();
        }}>Agregar Producto</button>
        <Modal isOpen={isOpenModal} closeModal={closeModal}>
          <CrudForm
            isEditing={isEditing}
            requestsPost={requestsPost}
            requestsPut={requestsPut}
            products={products}
            setProducts={setProducts}
          />
        </Modal>
        {showInventory ? (
          <CrudTable
            selectProduct={selectProduct}
            requestsGet={requestsGet}
            requestsDelete={requestsDelete}
            data={data}
          />
        ) : (
          <img src={require("../Assets/img01.png")} alt="Imagen" />
        )}
      </article>
    </div>
  )
}

export default CrudApp;