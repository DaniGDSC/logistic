// Import necessary modules
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Grid, Button} from '@mui/material';
import ProductCard from '../../Component/common/ProductCard'; // Assuming you have a ProductCard component for individual product display

// Main ProductList component
const ProductList = () => {
  const [products, setProducts] = useState([]);
  const [filteredProducts, setFilteredProducts] = useState([]);
  const [sortOrder, setSortOrder] = useState('asc'); // 'asc' or 'desc'
  const [page, setPage] = useState(1);
  const productsPerPage = 6;

  // Fetch product data from an API
  useEffect(() => {
    axios.get('/api/products')
      .then(response => {
        setProducts(response.data);
        setFilteredProducts(response.data);
      })
      .catch(error => console.error('Error fetching products:', error));
  }, []);

  // Handle sorting
  const handleSort = (field) => {
    const sortedProducts = filteredProducts.sort((a, b) => {
      if (sortOrder === 'asc') {
        return a[field] > b[field] ? 1 : -1;
      } else {
        return a[field] < b[field] ? 1 : -1;
      }
    });
    setFilteredProducts([...sortedProducts]);
    setSortOrder(sortOrder === 'asc' ? 'desc' : 'asc');
  };

  // Handle filtering (example: filter by availability)
  const handleFilter = (status) => {
    if (status === 'all') {
      setFilteredProducts(products);
    } else {
      const filtered = products.filter(product => product.available === status);
      setFilteredProducts([...filtered]);
    }
    setPage(1); // Reset to first page after filtering
  };

  // Handle pagination
  const handlePaginationChange = (event, newPage) => {
    setPage(newPage);
  };

  // Paginated products for the current page
  const paginatedProducts = filteredProducts.slice((page - 1) * productsPerPage, page * productsPerPage);

  return (
    <div className="p-4">
      {/* Sorting and Filtering Controls */}
      <div className="mb-4 flex justify-between items-center">
        <Button onClick={() => handleFilter('all')}>Show All</Button>
        <Button onClick={() => handleFilter(true)}>In Stock</Button>
        <Button onClick={() => handleFilter(false)}>Out of Stock</Button>
        <select onChange={(e) => handleSort(e.target.value)} value={sortOrder}>
          <option value="asc">Price: Low to High</option>
          <option value="desc">Price: High to Low</option>
        </select>
      </div>

      {/* Product Grid */}
      <Grid container spacing={2}>
        {paginatedProducts.map(product => (
          <Grid item xs={12} sm={6} md={4} key={product.id}>
            <ProductCard product={product} />
          </Grid>
        ))}
      </Grid>

      {/* Pagination Controls */}
      <div className="mt-4 flex justify-center">
        <Button onClick={() => handlePaginationChange('prev')} disabled={page === 1}>Previous</Button>
        <Button onClick={() => handlePaginationChange('next')} disabled={paginatedProducts.length < productsPerPage}>Next</Button>
      </div>
    </div>
  );
};

export default ProductList;
