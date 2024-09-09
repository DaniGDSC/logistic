import React, { useState, useEffect } from 'react';
import { PlusCircle, Edit, Trash2, ChevronRight } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';

// Mock data for demonstration
const mockProducts = [
  { id: 1, name: 'Product A', sku: 'SKU001', price: 19.99, stock: 100 },
  { id: 2, name: 'Product B', sku: 'SKU002', price: 29.99, stock: 75 },
  { id: 3, name: 'Product C', sku: 'SKU003', price: 39.99, stock: 50 },
];

const ProductList = ({ products, onEdit, onDelete, onViewDetails }) => (
  <Card>
    <CardHeader>
      <CardTitle>Product List</CardTitle>
    </CardHeader>
    <CardContent>
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>Name</TableHead>
            <TableHead>SKU</TableHead>
            <TableHead>Price</TableHead>
            <TableHead>Stock</TableHead>
            <TableHead>Actions</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {products.map((product) => (
            <TableRow key={product.id}>
              <TableCell>{product.name}</TableCell>
              <TableCell>{product.sku}</TableCell>
              <TableCell>${product.price.toFixed(2)}</TableCell>
              <TableCell>{product.stock}</TableCell>
              <TableCell>
                <div className="flex space-x-2">
                  <Button variant="ghost" size="icon" onClick={() => onViewDetails(product)}>
                    <ChevronRight className="h-4 w-4" />
                  </Button>
                  <Button variant="ghost" size="icon" onClick={() => onEdit(product)}>
                    <Edit className="h-4 w-4" />
                  </Button>
                  <Button variant="ghost" size="icon" onClick={() => onDelete(product.id)}>
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

const ProductDetails = ({ product, onClose }) => (
  <Dialog open={!!product} onOpenChange={onClose}>
    <DialogContent>
      <DialogHeader>
        <DialogTitle>Product Details</DialogTitle>
      </DialogHeader>
      {product && (
        <div className="space-y-4">
          <p><strong>Name:</strong> {product.name}</p>
          <p><strong>SKU:</strong> {product.sku}</p>
          <p><strong>Price:</strong> ${product.price.toFixed(2)}</p>
          <p><strong>Stock:</strong> {product.stock}</p>
        </div>
      )}
    </DialogContent>
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
    <form onSubmit={handleSubmit} className="space-y-4">
      <Input name="name" value={formData.name} onChange={handleChange} placeholder="Product Name" required />
      <Input name="sku" value={formData.sku} onChange={handleChange} placeholder="SKU" required />
      <Input name="price" type="number" value={formData.price} onChange={handleChange} placeholder="Price" required />
      <Input name="stock" type="number" value={formData.stock} onChange={handleChange} placeholder="Stock" required />
      <div className="flex justify-end space-x-2">
        <Button type="button" variant="outline" onClick={onCancel}>Cancel</Button>
        <Button type="submit">Save</Button>
      </div>
    </form>
  );
};

const ProductPage = () => {
  const [products, setProducts] = useState(mockProducts);
  const [selectedProduct, setSelectedProduct] = useState(null);
  const [isEditing, setIsEditing] = useState(false);
  const [showForm, setShowForm] = useState(false);

  const handleAddProduct = (newProduct) => {
    setProducts([...products, { ...newProduct, id: Date.now() }]);
    setShowForm(false);
  };

  const handleEditProduct = (updatedProduct) => {
    setProducts(products.map((p) => (p.id === updatedProduct.id ? updatedProduct : p)));
    setIsEditing(false);
    setSelectedProduct(null);
  };

  const handleDeleteProduct = (id) => {
    setProducts(products.filter((p) => p.id !== id));
  };

  return (
    <div className="container mx-auto p-4 space-y-6">
      <h1 className="text-2xl font-bold mb-4">Product Management</h1>

      <Button onClick={() => setShowForm(true)}>
        <PlusCircle className="mr-2 h-4 w-4" /> Add New Product
      </Button>

      <ProductList
        products={products}
        onEdit={(product) => { setSelectedProduct(product); setIsEditing(true); }}
        onDelete={handleDeleteProduct}
        onViewDetails={setSelectedProduct}
      />

      <ProductDetails product={selectedProduct} onClose={() => setSelectedProduct(null)} />

      <Dialog open={showForm || isEditing} onOpenChange={(open) => {
        if (!open) {
          setShowForm(false);
          setIsEditing(false);
          setSelectedProduct(null);
        }
      }}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>{isEditing ? 'Edit Product' : 'Add New Product'}</DialogTitle>
          </DialogHeader>
          <ProductForm
            product={isEditing ? selectedProduct : null}
            onSubmit={isEditing ? handleEditProduct : handleAddProduct}
            onCancel={() => {
              setShowForm(false);
              setIsEditing(false);
              setSelectedProduct(null);
            }}
          />
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default ProductPage;