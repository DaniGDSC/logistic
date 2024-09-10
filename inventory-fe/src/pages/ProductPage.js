import React, { useState, useEffect } from "react";
import {
  Container,
  Typography,
  Button,
  Grid,
  Dialog,
  DialogTitle,
  DialogContent,
} from "@mui/material";
import AddIcon from "@mui/icons-material/Add";
import ProductList from "./ProductList"; // Assuming you have a component for listing products
import ProductForm from "./ProductForm"; // Assuming you have a form for adding/editing products
import ProductDetails from "./ProductDetails"; // Assuming you have a dialog for viewing product details

const ProductPage = () => {
  const [products, setProducts] = useState([]);
  const [selectedProduct, setSelectedProduct] = useState(null);
  const [openForm, setOpenForm] = useState(false);
  const [isEditing, setIsEditing] = useState(false);
  const [openDetails, setOpenDetails] = useState(false);

  useEffect(() => {
    // Fetch products from the API or local state based on your logic.
    // This is a placeholder to simulate fetching data using async/await with setTimeout.
    const fetchProducts = async () => {
      await new Promise((resolve) => setTimeout(resolve, 1000));
      setProducts([
        { id: 1, name: "Product 1", sku: "SKU001" },
        { id: 2, name: "Product 2", sku: "SKU002" },
      ]);
    };
    fetchProducts();
  }, []);

  const handleAddProduct = (newProduct) => {
    setProducts([...products, { ...newProduct, id: Date.now() }]);
    setOpenForm(false);
  };

  const handleEditProduct = (updatedProduct) => {
    setProducts(
      products.map((p) => (p.id === updatedProduct.id ? updatedProduct : p))
    );
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
        onClick={() => {
          setOpenForm(true);
          setIsEditing(false);
        }}
        style={{ marginBottom: 16 }}
      >
        Add New Product
      </Button>

      <ProductList
        products={products}
        onEdit={(product) => {
          setSelectedProduct(product);
          setIsEditing(true);
          setOpenForm(true);
        }}
        onDelete={handleDeleteProduct}
        onViewDetails={(product) => {
          setSelectedProduct(product);
          setOpenDetails(true);
        }}
      />

      <Dialog
        open={openForm || isEditing}
        onClose={() => {
          setOpenForm(false);
          setIsEditing(false);
          setSelectedProduct(null);
        }}
      >
        <DialogTitle>
          {isEditing ? "Edit Product" : "Add New Product"}
        </DialogTitle>
        <DialogContent>
          <ProductForm
            product={isEditing ? selectedProduct : null}
            onSubmit={isEditing ? handleEditProduct : handleAddProduct}
            onCancel={() => {
              setOpenForm(false);
              setIsEditing(false);
              setSelectedProduct(null);
            }}
          />
        </DialogContent>
      </Dialog>

      <ProductDetails
        product={selectedProduct}
        open={openDetails}
        onClose={() => {
          setOpenDetails(false);
          setSelectedProduct(null);
        }}
      />

      {selectedProduct && (
        <Dialog open={true} maxWidth="md" fullWidth>
          <DialogTitle>{selectedProduct.name}</DialogTitle>
          <DialogContent>
            <Grid container spacing={2}>
              <Grid item xs={12}>
                <Typography>
                  <strong>Name:</strong> {selectedProduct.name}
                </Typography>
              </Grid>
              <Grid item xs={12}>
                <Typography>
                  <strong>SKU:</strong> {selectedProduct.sku}
                </Typography>
              </Grid>
            </Grid>
          </DialogContent>
        </Dialog>
      )}
    </Container>
  );
};

export default ProductPage;
