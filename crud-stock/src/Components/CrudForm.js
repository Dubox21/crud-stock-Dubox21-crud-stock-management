import React, { useState, useEffect } from 'react'

const initialForm = {
    name: "",
    description: "",
    price: "",
    quantity: "",
    id: null
}

const CrudForm = () => {
    const [form, setForm] = useState(initialForm);
    const handleChange = (e) => { }
    const handleSubmit = (e) => { }
    const handleReset = (e) => { }

    return (
        <div>
            <h3>Agregar</h3>
            <form onSubmit={handleSubmit}>
                <input type='text' name='name' placeholder='Nombre' onChange={handleChange} value={form.name} />
                <input type='text' name='description' placeholder='Descripción' onChange={handleChange} value={form.description} />
                <input type='number' name='price' placeholder='Precio' onChange={handleChange} value={form.price} />
                <input type='number' name='quantity' placeholder='Cantidad Disponible' onChange={handleChange} value={form.quantity} />
                <input type='submit' value='Enviar' />
                <input type='reset' value='Limpiar' onClick={handleReset}/>
            </form>
        </div>
    )
}

export default CrudForm