import React, { useState, useEffect } from 'react';
import { PlusCircle, Edit, Trash2, ChevronRight } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';

// Mock data for demonstration
const mockInventory = [
  { id: 1, productId: 1, sku: 'SKU001', name: 'Product A', quantity: 100, location: 'Warehouse A' },
  { id: 2, productId: 2, sku: 'SKU002', name: 'Product B', quantity: 75, location: 'Warehouse B' },
  { id: 3, productId: 3, sku: 'SKU003', name: 'Product C', quantity: 50, location: 'Warehouse C' },
];

const InventoryList = ({ inventory, onEdit, onDelete, onViewDetails }) => (
  <Card>
    <CardHeader>
      <CardTitle>Inventory</CardTitle>
    </CardHeader>
    <CardContent>
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>Product</TableHead>
            <TableHead>SKU</TableHead>
            <TableHead>Quantity</TableHead>
            <TableHead>Location</TableHead>
            <TableHead>Actions</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {inventory.map((item) => (
            <TableRow key={item.id}>
              <TableCell>{item.name}</TableCell>
              <TableCell>{item.sku}</TableCell>
              <TableCell>{item.quantity}</TableCell>
              <TableCell>{item.location}</TableCell>
              <TableCell>
                <div className="flex space-x-2">
                  <Button variant="ghost" size="icon" onClick={() => onViewDetails(item)}>
                    <ChevronRight className="h-4 w-4" />
                  </Button>
                  <Button variant="ghost" size="icon" onClick={() => onEdit(item)}>
                    <Edit className="h-4 w-4" />
                  </Button>
                  <Button variant="ghost" size="icon" onClick={() => onDelete(item.id)}>
                    <Trash2 className="h-4 w-4" />
                  </Button>
                </div>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </CardContent>
  </Card>
);

const InventoryDetails = ({ item, onClose }) => (
  <Dialog open={!!item} onOpenChange={onClose}>
    <DialogContent>
      <DialogHeader>
        <DialogTitle>Inventory Details</DialogTitle>
      </DialogHeader>
      {item && (
        <div className="space-y-4">
          <p><strong>Product:</strong> {item.name}</p>
          <p><strong>SKU:</strong> {item.sku}</p>
          <p><strong>Quantity:</strong> {item.quantity}</p>
          <p><strong>Location:</strong> {item.location}</p>
        </div>
      )}
    </DialogContent>
  </Dialog>
);

const InventoryForm = ({ item, onSubmit, onCancel }) => {
  const [formData, setFormData] = useState(item || { productId: '', sku: '', quantity: '', location: '' });

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
      <Input name="productId" value={formData.productId} onChange={handleChange} placeholder="Product ID" required />
      <Input name="sku" value={formData.sku} onChange={handleChange} placeholder="SKU" required />
      <Input name="quantity" type="number" value={formData.quantity} onChange={handleChange} placeholder="Quantity" required />
      <Input name="location" value={formData.location} onChange={handleChange} placeholder="Location" required />
      <div className="flex justify-end space-x-2">
        <Button type="button" variant="outline" onClick={onCancel}>Cancel</Button>
        <Button type="submit">Save</Button>
      </div>
    </form>
  );
};

const InventoryPage = () => {
  const [inventory, setInventory] = useState(mockInventory);
  const [selectedItem, setSelectedItem] = useState(null);
  const [isEditing, setIsEditing] = useState(false);
  const [showForm, setShowForm] = useState(false);

  const handleAddItem = (newItem) => {
    setInventory([...inventory, { ...newItem, id: Date.now() }]);
    setShowForm(false);
  };

  const handleEditItem = (updatedItem) => {
    setInventory(inventory.map((i) => (i.id === updatedItem.id ? updatedItem : i)));
    setIsEditing(false);
    setSelectedItem(null);
  };

  const handleDeleteItem = (id) => {
    setInventory(inventory.filter((i) => i.id !== id));
  };

  return (
    <div className="container mx-auto p-4 space-y-6">
      <h1 className="text-2xl font-bold mb-4">Inventory Management</h1>

      <Button onClick={() => setShowForm(true)}>
        <PlusCircle className="mr-2 h-4 w-4" /> Add New Inventory Item
      </Button>

      <InventoryList
        inventory={inventory}
        onEdit={(item) => { setSelectedItem(item); setIsEditing(true); }}
        onDelete={handleDeleteItem}
        onViewDetails={setSelectedItem}
      />

      <InventoryDetails item={selectedItem} onClose={() => setSelectedItem(null)} />

      <Dialog open={showForm || isEditing} onOpenChange={(open) => {
        if (!open) {
          setShowForm(false);
          setIsEditing(false);
          setSelectedItem(null);
        }
      }}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>{isEditing ? 'Edit Inventory Item' : 'Add New Inventory Item'}</DialogTitle>
          </DialogHeader>
          <InventoryForm
            item={isEditing ? selectedItem : null}
            onSubmit={isEditing ? handleEditItem : handleAddItem}
            onCancel={() => {
              setShowForm(false);
              setIsEditing(false);
              setSelectedItem(null);
            }}
          />
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default InventoryPage;