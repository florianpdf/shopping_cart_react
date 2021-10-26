import { useState } from 'react';

import './App.css';
import { initialProductList } from './datas'

const App = () => {

    const [products, setProducts] = useState(initialProductList)

    const [name, setName] = useState("")
    const [price, setPrice] = useState(1)

    const totalPrice = products.reduce((total, current) => {
        const totalPriceForCurrentProduct = current.quantity * current.price
        return total + totalPriceForCurrentProduct
    }, 0)

    // Gestion de l'event onChange sur le name
    const onChangeName = event => {
        setName(event.target.value)
    }

    // Gestion de l'event onChange sur le price
    const onChangePrice = event => {
        setPrice(event.target.value)
    }

    // On ajoute le nouveau produit saisi dans la liste de produit
    const addProduct = () => {
        const arrayLength = products.length
        const lastElem = products[arrayLength - 1]
        const lastId = lastElem.id

        setProducts([
            ...products,
            { id: lastId + 1, name: name, price: price, quantity: 1 }
        ])
    }

    const addProductWithPreValue = () => {
        // prevValues correspond a la value precedent du state avant sa mise a jour
        // uuidv4 permet d'obtenir un random uniq id
        setProducts(prevValues => {
            const arrayLength = prevValues.length()
            const lastElem = prevValues[arrayLength - 1]
            const lastId = lastElem.id
            return [
                ...prevValues,
                { id: lastId + 1, name: name, price: price, quantity: 1 }
            ]
        })
    }

    const deleteProduct = id => {
        const doIt = window.confirm("Are you sure?")
        if (doIt) {
            const newList = products.filter(p => p.id !== id)
            setProducts(newList)
        }
    }

    return (
        <div className='App'>
            <h1 className='h1'>Ma commande</h1>
            <table className='table'>
                <thead>
                    <tr>
                        <th className='th'>Product</th>
                        <th className='th'>Price</th>
                        <th className='th'>Quantity</th>
                        <th className='th'>Total price</th>
                        <th className='th'>Action</th>
                    </tr>
                </thead>
                <tbody>
                    { products.map(product => {
                        return (
                            <tr key={product.id}>
                                <td className='td'>{product.name}</td>
                                <td className='td'>{product.price}</td>
                                <td className='td'>{product.quantity}</td>
                                <td className='td'>{product.quantity * product.price} €</td>
                                <td className='td'>
                                    <button onClick={() => deleteProduct(product.id)}>Delete</button>
                                </td>
                            </tr>
                        )
                    }) }
                </tbody>
            </table>
            <p>
                Total de la commande : <em>{totalPrice}</em>
            </p>
            <div className="form">
                <h2 className="h2">Add product</h2>
                <div>
                    <label>Name</label>
                    <input
                        className='field'
                        type="text"
                        required
                        placeholder="Name"
                        value={name}
                        onChange={onChangeName}
                    />
                </div>
                <div>
                    <label>Price</label>
                    <input
                        className='field'
                        type="number"
                        required
                        min="1"
                        value={price}
                        onChange={onChangePrice}
                    />
                </div>
                <button onClick={addProduct}>Add</button>
            </div>


        </div>
    );
}

export default App;
