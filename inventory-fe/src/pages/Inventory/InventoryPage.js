import React, { useState } from 'react';
import {
  Container,
  Typography,
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
  Grid
} from '@mui/material';
import {
  Add as AddIcon,
  Edit as EditIcon,
  Delete as DeleteIcon,
  Visibility as VisibilityIcon
} from '@mui/icons-material';

// Mock data for demonstration
const mockInventory = [
  { id: 1, name: 'Product A', sku: 'SKU001', quantity: 100, location: 'Warehouse A' },
  { id: 2, name: 'Product B', sku: 'SKU002', quantity: 75, location: 'Warehouse B' },
  { id: 3, name: 'Product C', sku: 'SKU003', quantity: 50, location: 'Warehouse A' },
];

const InventoryList = ({ inventory, onEdit, onDelete, onViewDetails }) => (
  <TableContainer component={Paper} className="mt-4">
    <Table>
      <TableHead>
        <TableRow>
          <TableCell>Name</TableCell>
          <TableCell>SKU</TableCell>
          <TableCell>Quantity</TableCell>
          <TableCell>Location</TableCell>
          <TableCell>Actions</TableCell>
        </TableRow>
      </TableHead>
      <TableBody>
        {inventory.map((item) => (
          <TableRow key={item.id}>
            <TableCell>{item.name}</TableCell>
            <TableCell>{item.sku}</TableCell>
            <TableCell>{item.quantity}</TableCell>
            <TableCell>{item.location}</TableCell>
            <TableCell>
              <IconButton onClick={() => onViewDetails(item)} size="small" className="text-blue-500">
                <VisibilityIcon />
              </IconButton>
              <IconButton onClick={() => onEdit(item)} size="small" className="text-yellow-500">
                <EditIcon />
              </IconButton>
              <IconButton onClick={() => onDelete(item.id)} size="small" className="text-red-500">
                <DeleteIcon />
              </IconButton>
            </TableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>
  </TableContainer>
);

const InventoryDetails = ({ item, open, onClose }) => (
  <Dialog open={open} onClose={onClose}>
    <DialogTitle>Inventory Item Details</DialogTitle>
    <DialogContent>
      {item && (
        <Grid container spacing={2}>
          <Grid item xs={12}>
            <Typography><strong>Name:</strong> {item.name}</Typography>
          </Grid>
          <Grid item xs={12}>
            <Typography><strong>SKU:</strong> {item.sku}</Typography>
          </Grid>
          <Grid item xs={12}>
            <Typography><strong>Quantity:</strong> {item.quantity}</Typography>
          </Grid>
          <Grid item xs={12}>
            <Typography><strong>Location:</strong> {item.location}</Typography>
          </Grid>
        </Grid>
      )}
    </DialogContent>
    <DialogActions>
      <Button onClick={onClose} color="primary">Close</Button>
    </DialogActions>
  </Dialog>
);

const InventoryForm = ({ item, onSubmit, onCancel }) => {
  const [formData, setFormData] = useState(item || { name: '', sku: '', quantity: '', location: '' });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    onSubmit(formData);
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <TextField
        fullWidth
        name="name"
        label="Product Name"
        value={formData.name}
        onChange={handleChange}
        required
        className="mb-4"
      />
      <TextField
        fullWidth
        name="sku"
        label="SKU"
        value={formData.sku}
        onChange={handleChange}
        required
        className="mb-4"
      />
      <TextField
        fullWidth
        name="quantity"
        label="Quantity"
        type="number"
        value={formData.quantity}
        onChange={handleChange}
        required
        className="mb-4"
      />
      <TextField
        fullWidth
        name="location"
        label="Location"
        value={formData.location}
        onChange={handleChange}
        required
        className="mb-4"
      />
      <div className="flex justify-end space-x-2">
        <Button variant="outlined" onClick={onCancel}>Cancel</Button>
        <Button variant="contained" color="primary" type="submit">Save</Button>
      </div>
    </form>
  );
};

const InventoryPage = () => {
  const [inventory, setInventory] = useState(mockInventory);
  const [selectedItem, setSelectedItem] = useState(null);
  const [isEditing, setIsEditing] = useState(false);
  const [openForm, setOpenForm] = useState(false);
  const [openDetails, setOpenDetails] = useState(false);

  const handleAddItem = (newItem) => {
    setInventory([...inventory, { ...newItem, id: Date.now() }]);
    setOpenForm(false);
  };

  const handleEditItem = (updatedItem) => {
    setInventory(inventory.map((item) => (item.id === updatedItem.id ? updatedItem : item)));
    setIsEditing(false);
    setOpenForm(false);
  };

  const handleDeleteItem = (id) => {
    setInventory(inventory.filter((item) => item.id !== id));
  };

  return (
    <Container maxWidth="lg" className="py-8">
      <Typography variant="h4" component="h1" gutterBottom className="text-3xl font-bold">
        Inventory Management
      </Typography>

      <Button
        variant="contained"
        color="primary"
        startIcon={<AddIcon />}
        onClick={() => setOpenForm(true)}
        className="mb-4"
      >
        Add New Item
      </Button>

      <InventoryList
        inventory={inventory}
        onEdit={(item) => { setSelectedItem(item); setIsEditing(true); setOpenForm(true); }}
        onDelete={handleDeleteItem}
        onViewDetails={(item) => { setSelectedItem(item); setOpenDetails(true); }}
      />

      <Dialog open={openForm} onClose={() => { setOpenForm(false); setIsEditing(false); setSelectedItem(null); }}>
        <DialogTitle>{isEditing ? 'Edit Inventory Item' : 'Add New Inventory Item'}</DialogTitle>
        <DialogContent>
          <InventoryForm
            item={isEditing ? selectedItem : null}
            onSubmit={isEditing ? handleEditItem : handleAddItem}
            onCancel={() => { setOpenForm(false); setIsEditing(false); setSelectedItem(null); }}
          />
        </DialogContent>
      </Dialog>

      <InventoryDetails
        item={selectedItem}
        open={openDetails}
        onClose={() => { setOpenDetails(false); setSelectedItem(null); }}
      />
    </Container>
  );
};

export default InventoryPage;