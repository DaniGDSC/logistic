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
  Paper
} from '@mui/material';
import { Edit as EditIcon, History as HistoryIcon, Link as LinkIcon, Business as BusinessIcon } from '@mui/icons-material';

// Mock data for demonstration
const productData = {
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
  const [tabValue, setTabValue] = useState(0);

  const handleTabChange = (event, newValue) => {
    setTabValue(newValue);
  };

  const handleEdit = () => {
    // Implement edit functionality
    console.log('Edit product');
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
              onClick={handleEdit}
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
          <Button variant="outlined" color="primary">Update Stock</Button>
          <Button variant="outlined" color="secondary">Discontinue Product</Button>
          <Button variant="outlined">Generate Report</Button>
        </div>
      </div>
    </div>
  );
};

export default ProductDetails;