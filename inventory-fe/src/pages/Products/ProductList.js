import React from 'react';
import { List, ListItem, ListItemText, IconButton } from '@mui/material';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import VisibilityIcon from '@mui/icons-material/Visibility';

const ProductList = ({ products, onEdit, onDelete, onViewDetails }) => {
  return (
    <List>
      {products.map((product) => (
        <ListItem key={product.id} divider>
          <ListItemText primary={`${product.name} - ${product.sku}`} />
          <IconButton edge="end" aria-label="edit" onClick={() => onEdit(product)}>
            <EditIcon />
          </IconButton>
          <IconButton edge="end" aria-label="delete" onClick={() => onDelete(product.id)}>
            <DeleteIcon />
          </IconButton>
          <IconButton edge="end" aria-label="view details" onClick={() => onViewDetails(product)}>
            <VisibilityIcon />
          </IconButton>
        </ListItem>
      ))}
    </List>
  );
};

export default ProductList;
