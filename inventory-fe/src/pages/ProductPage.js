import React, { useState } from 'react';
import {
  Button,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  TextField,
  IconButton,
  Typography,
  Container,
  Grid
} from '@mui/material';
import {
  Add as AddIcon,
  Edit as EditIcon,
  Delete as DeleteIcon,
  Visibility as VisibilityIcon
} from '@mui/icons-material';

// Mock data for demonstration
const mockProducts = [
  { id: 1, name: 'Product A', sku: 'SKU001', price: 19.99, stock: 100 },
  { id: 2, name: 'Product B', sku: 'SKU002', price: 29.99, stock: 75 },
  { id: 3, name: 'Product C', sku: 'SKU003', price: 39.99, stock: 50 },
];

const ProductList = ({ products, onEdit, onDelete, onViewDetails }) => (
  <TableContainer component={Paper}>
    <Table>
      <TableHead>
        <TableRow>
          <TableCell>Name</TableCell>
          <TableCell>SKU</TableCell>
          <TableCell>Price</TableCell>
          <TableCell>Stock</TableCell>
          <TableCell>Actions</TableCell>
        </TableRow>
      </TableHead>
      <TableBody>
        {products.map((product) => (
          <TableRow key={product.id}>
            <TableCell>{product.name}</TableCell>
            <TableCell>{product.sku}</TableCell>
            <TableCell>${product.price.toFixed(2)}</TableCell>
            <TableCell>{product.stock}</TableCell>
            <TableCell>
              <IconButton onClick={() => onViewDetails(product)} size="small">
                <VisibilityIcon />
              </IconButton>
              <IconButton onClick={() => onEdit(product)} size="small">
                <EditIcon />
              </IconButton>
              <IconButton onClick={() => onDelete(product.id)} size="small">
                <DeleteIcon />
              </IconButton>
            </TableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>
  </TableContainer>
);

const ProductDetails = ({ product, open, onClose }) => (
  <Dialog open={open} onClose={onClose}>
    <DialogTitle>Product Details</DialogTitle>
    <DialogContent>
      {product && (
        <Grid container spacing={2}>
          <Grid item xs={12}>
            <Typography><strong>Name:</strong> {product.name}</Typography>
          </Grid>
          <Grid item xs={12}>
            <Typography><strong>SKU:</strong> {product.sku}</Typography>
          </Grid>
          <Grid item xs={12}>
            <Typography><strong>Price:</strong> ${product.price.toFixed(2)}</Typography>
          </Grid>
          <Grid item xs={12}>
            <Typography><strong>Stock:</strong> {product.stock}</Typography>
          </Grid>
        </Grid>
      )}
    </DialogContent>
    <DialogActions>
      <Button onClick={onClose}>Close</Button>
    </DialogActions>
  </Dialog>
);

const ProductForm = ({ product, onSubmit, onCancel }) => {
  const [formData, setFormData] = useState(product || { name: '', sku: '', price: '', stock: '' });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    onSubmit(formData);
  };

  return (
    <form onSubmit={handleSubmit}>
      <Grid container spacing={2}>
        <Grid item xs={12}>
          <TextField
            fullWidth
            name="name"
            label="Product Name"
            value={formData.name}
            onChange={handleChange}
            required
          />
        </Grid>
        <Grid item xs={12}>
          <TextField
            fullWidth
            name="sku"
            label="SKU"
            value={formData.sku}
            onChange={handleChange}
            required
          />
        </Grid>
        <Grid item xs={12}>
          <TextField
            fullWidth
            name="price"
            label="Price"
            type="number"
            value={formData.price}
            onChange={handleChange}
            required
          />
        </Grid>
        <Grid item xs={12}>
          <TextField
            fullWidth
            name="stock"
            label="Stock"
            type="number"
            value={formData.stock}
            onChange={handleChange}
            required
          />
        </Grid>
        <Grid item xs={12}>
          <Button variant="contained" color="primary" type="submit">
            Save
          </Button>
          <Button variant="outlined" onClick={onCancel} style={{ marginLeft: 8 }}>
            Cancel
          </Button>
        </Grid>
      </Grid>
    </form>
  );
};

const ProductPage = () => {
  const [products, setProducts] = useState(mockProducts);
  const [selectedProduct, setSelectedProduct] = useState(null);
  const [isEditing, setIsEditing] = useState(false);
  const [openForm, setOpenForm] = useState(false);
  const [openDetails, setOpenDetails] = useState(false);

  const handleAddProduct = (newProduct) => {
    setProducts([...products, { ...newProduct, id: Date.now() }]);
    setOpenForm(false);
  };

  const handleEditProduct = (updatedProduct) => {
    setProducts(products.map((p) => (p.id === updatedProduct.id ? updatedProduct : p)));
    setIsEditing(false);
    setOpenForm(false);
  };

  const handleDeleteProduct = (id) => {
    setProducts(products.filter((p) => p.id !== id));
  };

  return (
    <Container maxWidth="lg">
      <Typography variant="h4" gutterBottom>
        Product Management
      </Typography>

      <Button
        variant="contained"
        color="primary"
        startIcon={<AddIcon />}
        onClick={() => setOpenForm(true)}
        style={{ marginBottom: 16 }}
      >
        Add New Product
      </Button>

      <ProductList
        products={products}
        onEdit={(product) => { setSelectedProduct(product); setIsEditing(true); setOpenForm(true); }}
        onDelete={handleDeleteProduct}
        onViewDetails={(product) => { setSelectedProduct(product); setOpenDetails(true); }}
      />

      <Dialog open={openForm} onClose={() => { setOpenForm(false); setIsEditing(false); setSelectedProduct(null); }}>
        <DialogTitle>{isEditing ? 'Edit Product' : 'Add New Product'}</DialogTitle>
        <DialogContent>
          <ProductForm
            product={isEditing ? selectedProduct : null}
            onSubmit={isEditing ? handleEditProduct : handleAddProduct}
            onCancel={() => { setOpenForm(false); setIsEditing(false); setSelectedProduct(null); }}
          />
        </DialogContent>
      </Dialog>

      <ProductDetails
        product={selectedProduct}
        open={openDetails}
        onClose={() => { setOpenDetails(false); setSelectedProduct(null); }}
      />
    </Container>
  );
};

export default ProductPage;