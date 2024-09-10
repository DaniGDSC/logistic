import React, { useState } from 'react';
import {
  Card,
  CardContent,
  Typography,
  Grid,
  Button,
  Tabs,
  Tab,
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
  Snackbar,
  Alert
} from '@mui/material';
import { Edit as EditIcon, History as HistoryIcon, Link as LinkIcon, Business as BusinessIcon } from '@mui/icons-material';

// Mock API functions
const mockUpdateProduct = (productData) => {
  return new Promise((resolve) => {
    setTimeout(() => {
      console.log('Product updated:', productData);
      resolve({ success: true, message: 'Product updated successfully' });
    }, 1000);
  });
};

const mockUpdateStock = (productId, quantity) => {
  return new Promise((resolve) => {
    setTimeout(() => {
      console.log(`Stock updated for product ${productId}. New quantity: ${quantity}`);
      resolve({ success: true, message: 'Stock updated successfully' });
    }, 1000);
  });
};

const mockDiscontinueProduct = (productId) => {
  return new Promise((resolve) => {
    setTimeout(() => {
      console.log(`Product ${productId} discontinued`);
      resolve({ success: true, message: 'Product discontinued successfully' });
    }, 1000);
  });
};

const mockGenerateReport = (productId) => {
  return new Promise((resolve) => {
    setTimeout(() => {
      console.log(`Report generated for product ${productId}`);
      resolve({ success: true, message: 'Report generated successfully', reportUrl: 'https://example.com/report.pdf' });
    }, 1000);
  });
};

// Initial product data
const initialProductData = {
  id: 1,
  sku: 'PROD-001',
  name: 'Premium Widget',
  description: 'High-quality widget for various applications',
  price: 29.99,
  category: 'Electronics',
  subCategory: 'Accessories',
  unitOfMeasure: 'Each',
  weight: '0.5 kg',
  dimensions: '10 x 5 x 2 cm',
  unitCost: 15.00,
  stock: 100,
  history: [
    { date: '2023-01-15', event: 'Stock updated', details: 'Quantity increased by 100' },
    { date: '2022-12-01', event: 'Price changed', details: 'Price updated from $27.99 to $29.99' }
  ],
  relatedItems: [
    { id: 2, name: 'Widget Case', sku: 'PROD-002' },
    { id: 3, name: 'Widget Charger', sku: 'PROD-003' }
  ],
  supplier: {
    name: 'WidgetCo Supplies',
    contactPerson: 'John Doe',
    email: 'john@widgetco.com',
    phone: '+1 (555) 123-4567'
  }
};

const ProductDetails = () => {
  const [productData, setProductData] = useState(initialProductData);
  const [tabValue, setTabValue] = useState(0);
  const [editDialogOpen, setEditDialogOpen] = useState(false);
  const [editedProduct, setEditedProduct] = useState({});
  const [snackbar, setSnackbar] = useState({ open: false, message: '', severity: 'success' });
  const [stockDialogOpen, setStockDialogOpen] = useState(false);
  const [newStockQuantity, setNewStockQuantity] = useState(productData.stock);

  const handleTabChange = (event, newValue) => {
    setTabValue(newValue);
  };

  const handleEditOpen = () => {
    setEditedProduct({ ...productData });
    setEditDialogOpen(true);
  };

  const handleEditClose = () => {
    setEditDialogOpen(false);
  };

  const handleEditSave = async () => {
    try {
      const result = await mockUpdateProduct(editedProduct);
      if (result.success) {
        setProductData(editedProduct);
        setSnackbar({ open: true, message: result.message, severity: 'success' });
        setEditDialogOpen(false);
      }
    } catch (error) {
      setSnackbar({ open: true, message: 'Error updating product', severity: 'error' });
    }
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setEditedProduct({ ...editedProduct, [name]: value });
  };

  const handleUpdateStock = async () => {
    try {
      const result = await mockUpdateStock(productData.id, newStockQuantity);
      if (result.success) {
        setProductData({ ...productData, stock: newStockQuantity });
        setSnackbar({ open: true, message: result.message, severity: 'success' });
        setStockDialogOpen(false);
      }
    } catch (error) {
      setSnackbar({ open: true, message: 'Error updating stock', severity: 'error' });
    }
  };

  const handleDiscontinueProduct = async () => {
    if (window.confirm('Are you sure you want to discontinue this product?')) {
      try {
        const result = await mockDiscontinueProduct(productData.id);
        if (result.success) {
          setSnackbar({ open: true, message: result.message, severity: 'success' });
          // In a real application, you might want to redirect to a product list or update the UI to reflect the discontinued status
        }
      } catch (error) {
        setSnackbar({ open: true, message: 'Error discontinuing product', severity: 'error' });
      }
    }
  };

  const handleGenerateReport = async () => {
    try {
      const result = await mockGenerateReport(productData.id);
      if (result.success) {
        setSnackbar({ open: true, message: result.message, severity: 'success' });
        window.open(result.reportUrl, '_blank');
      }
    } catch (error) {
      setSnackbar({ open: true, message: 'Error generating report', severity: 'error' });
    }
  };

  const ProductAttributes = () => (
    <Grid container spacing={2}>
      {[
        { label: 'SKU', value: productData.sku },
        { label: 'Name', value: productData.name },
        { label: 'Description', value: productData.description },
        { label: 'Price', value: `$${productData.price.toFixed(2)}` },
        { label: 'Category', value: productData.category },
        { label: 'Sub-Category', value: productData.subCategory },
        { label: 'Unit of Measure', value: productData.unitOfMeasure },
        { label: 'Weight', value: productData.weight },
        { label: 'Dimensions', value: productData.dimensions },
        { label: 'Unit Cost', value: `$${productData.unitCost.toFixed(2)}` },
        { label: 'Current Stock', value: productData.stock },
      ].map((attr, index) => (
        <Grid item xs={12} sm={6} key={index}>
          <Typography variant="subtitle2" className="font-semibold">{attr.label}</Typography>
          <Typography variant="body2">{attr.value}</Typography>
        </Grid>
      ))}
    </Grid>
  );

  const ProductHistory = () => (
    <TableContainer component={Paper}>
      <Table>
        <TableHead>
          <TableRow>
            <TableCell>Date</TableCell>
            <TableCell>Event</TableCell>
            <TableCell>Details</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {productData.history.map((item, index) => (
            <TableRow key={index}>
              <TableCell>{item.date}</TableCell>
              <TableCell>{item.event}</TableCell>
              <TableCell>{item.details}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );

  const RelatedItems = () => (
    <Grid container spacing={2}>
      {productData.relatedItems.map((item) => (
        <Grid item xs={12} sm={6} md={4} key={item.id}>
          <Card className="h-full">
            <CardContent>
              <Typography variant="h6">{item.name}</Typography>
              <Typography variant="body2" color="textSecondary">SKU: {item.sku}</Typography>
            </CardContent>
          </Card>
        </Grid>
      ))}
    </Grid>
  );

  const SupplierInfo = () => (
    <Card>
      <CardContent>
        <Typography variant="h6">{productData.supplier.name}</Typography>
        <Typography variant="body2">Contact: {productData.supplier.contactPerson}</Typography>
        <Typography variant="body2">Email: {productData.supplier.email}</Typography>
        <Typography variant="body2">Phone: {productData.supplier.phone}</Typography>
      </CardContent>
    </Card>
  );

  return (
    <div className="container mx-auto p-4">
      <Card className="mb-4">
        <CardContent>
          <div className="flex justify-between items-center mb-4">
            <Typography variant="h5" component="h1">
              Product Details
            </Typography>
            <Button
              variant="contained"
              color="primary"
              startIcon={<EditIcon />}
              onClick={handleEditOpen}
            >
              Edit Product
            </Button>
          </div>
          <ProductAttributes />
        </CardContent>
      </Card>

      <Tabs value={tabValue} onChange={handleTabChange} className="mb-4">
        <Tab icon={<HistoryIcon />} label="History" />
        <Tab icon={<LinkIcon />} label="Related Items" />
        <Tab icon={<BusinessIcon />} label="Supplier" />
      </Tabs>

      {tabValue === 0 && <ProductHistory />}
      {tabValue === 1 && <RelatedItems />}
      {tabValue === 2 && <SupplierInfo />}
      
      <div className="mt-4">
        <Typography variant="h6" gutterBottom>Product Actions</Typography>
        <div className="space-x-2">
          <Button variant="outlined" color="primary" onClick={() => setStockDialogOpen(true)}>Update Stock</Button>
          <Button variant="outlined" color="secondary" onClick={handleDiscontinueProduct}>Discontinue Product</Button>
          <Button variant="outlined" onClick={handleGenerateReport}>Generate Report</Button>
        </div>
      </div>

      {/* Edit Product Dialog */}
      <Dialog open={editDialogOpen} onClose={handleEditClose}>
        <DialogTitle>Edit Product</DialogTitle>
        <DialogContent>
          <TextField
            margin="dense"
            name="name"
            label="Product Name"
            type="text"
            fullWidth
            value={editedProduct.name || ''}
            onChange={handleInputChange}
          />
          <TextField
            margin="dense"
            name="description"
            label="Description"
            type="text"
            fullWidth
            multiline
            rows={4}
            value={editedProduct.description || ''}
            onChange={handleInputChange}
          />
          <TextField
            margin="dense"
            name="price"
            label="Price"
            type="number"
            fullWidth
            value={editedProduct.price || ''}
            onChange={handleInputChange}
          />
          {/* Add more fields as needed */}
        </DialogContent>
        <DialogActions>
          <Button onClick={handleEditClose}>Cancel</Button>
          <Button onClick={handleEditSave} color="primary">Save</Button>
        </DialogActions>
      </Dialog>

      {/* Update Stock Dialog */}
      <Dialog open={stockDialogOpen} onClose={() => setStockDialogOpen(false)}>
        <DialogTitle>Update Stock</DialogTitle>
        <DialogContent>
          <TextField
            margin="dense"
            label="New Stock Quantity"
            type="number"
            fullWidth
            value={newStockQuantity}
            onChange={(e) => setNewStockQuantity(Number(e.target.value))}
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setStockDialogOpen(false)}>Cancel</Button>
          <Button onClick={handleUpdateStock} color="primary">Update</Button>
        </DialogActions>
      </Dialog>

      {/* Snackbar for notifications */}
      <Snackbar
        open={snackbar.open}
        autoHideDuration={6000}
        onClose={() => setSnackbar({ ...snackbar, open: false })}
      >
        <Alert onClose={() => setSnackbar({ ...snackbar, open: false })} severity={snackbar.severity}>
          {snackbar.message}
        </Alert>
      </Snackbar>
    </div>
  );
};

export default ProductDetails;