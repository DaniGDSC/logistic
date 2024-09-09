import React, { useState, useEffect } from 'react';
import axios from 'axios';

const ProductPage = () => {
    const [products, setProducts] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        axios.get('/api/products')
            .then(response => {
                setProducts(response.data);
                setLoading(false);
            })
            .catch(error => console.error('Error fetching products:', error));
    }, []);

    if (loading) return <p>Loading...</p>;

    return (
        <div>
            <h1>Product List</h1>
            <ul>
                {products.map(product => (
                    <li key={product.id}>{product.name} - ${product.price}</li>
                ))}
            </ul>
        </div>
    );
};

export default ProductPage;