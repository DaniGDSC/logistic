import React, { useState, useEffect } from 'react';
import {
    Table,
    TableBody,
    TableCell,
    TableContainer,
    TableHead,
    TableRow,
    Paper,
    TextField,
    Button,
    Dialog,
    DialogTitle,
    DialogContent,
    DialogActions,
    IconButton,
    Snackbar,
    Alert
} from '@mui/material';
import {
    Edit as EditIcon,
    ArrowUpward as ArrowUpwardIcon,
    ArrowDownward as ArrowDownwardIcon
} from '@mui/icons-material';

// Mock API for fetching stock data
const fetchStockData = () => {
    return new Promise((resolve) => {
        setTimeout(() => {
            resolve([
                { id: 1, sku: 'PROD001', name: 'Widget A', category: 'Electronics', location: 'Warehouse 1', quantity: 100 },
                { id: 2, sku: 'PROD002', name: 'Gadget B', category: 'Electronics', location: 'Warehouse 2', quantity: 75 },
                { id: 3, sku: 'PROD003', name: 'Tool C', category: 'Hardware', location: 'Warehouse 1', quantity: 50 },
                { id: 4, sku: 'PROD004', name: 'Appliance D', category: 'Home', location: 'Warehouse 3', quantity: 30 },
                { id: 5, sku: 'PROD005', name: 'Gizmo E', category: 'Electronics', location: 'Warehouse 2', quantity: 60 },
            ]);
        }, 1000);
    });
};

// Mock API for updating stock quantity
const updateStockQuantity = (id, newQuantity) => {
    return new Promise((resolve) => {
        setTimeout(() => {
            console.log(`Updated stock for product ${id}: new quantity = ${newQuantity}`);
            resolve({ success: true });
        }, 500);
    });
};

const CurrentStock = () => {
    const [stockData, setStockData] = useState([]);
    const [filteredData, setFilteredData] = useState([]);
    const [loading, setLoading] = useState(true);
    const [filterText, setFilterText] = useState('');
    const [sortConfig, setSortConfig] = useState({ key: null, direction: 'ascending' });
    const [editDialogOpen, setEditDialogOpen] = useState(false);
    const [editItem, setEditItem] = useState(null);
    const [newQuantity, setNewQuantity] = useState('');
    const [snackbar, setSnackbar] = useState({ open: false, message: '', severity: 'success' });

    useEffect(() => {
        const fetchData = async () => {
            try {
                setLoading(true);
                const data = await fetchStockData();
                setStockData(data);
                setFilteredData(data);
            } catch (error) {
                console.error('Error fetching stock data:', error);
                setSnackbar({ open: true, message: 'Error fetching stock data', severity: 'error' });
            } finally {
                setLoading(false);
            }
        };

        // Initial data fetch
        fetchData();

        // Set up a periodic refresh (every 5 minutes)
        const refreshInterval = setInterval(fetchData, 300000);

        // Cleanup function to clear the interval when the component unmounts
        return () => clearInterval(refreshInterval);
    }, []); // Empty dependency array means this effect runs once on mount

    useEffect(() => {
        const filtered = stockData.filter(item =>
            Object.values(item).some(value =>
                value.toString().toLowerCase().includes(filterText.toLowerCase())
            )
        );
        setFilteredData(filtered);
    }, [filterText, stockData]);

    const handleSort = (key) => {
        let direction = 'ascending';
        if (sortConfig.key === key && sortConfig.direction === 'ascending') {
            direction = 'descending';
        }
        setSortConfig({ key, direction });

        setFilteredData(prevData => [...prevData].sort((a, b) => {
            if (a[key] < b[key]) return direction === 'ascending' ? -1 : 1;
            if (a[key] > b[key]) return direction === 'ascending' ? 1 : -1;
            return 0;
        }));
    };

    const handleEditClick = (item) => {
        setEditItem(item);
        setNewQuantity(item.quantity.toString());
        setEditDialogOpen(true);
    };

    const handleEditSave = async () => {
        try {
            await updateStockQuantity(editItem.id, parseInt(newQuantity));
            setStockData(prevData =>
                prevData.map(item =>
                    item.id === editItem.id ? { ...item, quantity: parseInt(newQuantity) } : item
                )
            );
            setEditDialogOpen(false);
            setSnackbar({ open: true, message: 'Stock quantity updated successfully', severity: 'success' });
        } catch (error) {
            console.error('Error updating stock quantity:', error);
            setSnackbar({ open: true, message: 'Error updating stock quantity', severity: 'error' });
        }
    };

    const SortIcon = ({ column }) => {
        if (sortConfig.key !== column) return null;
        return sortConfig.direction === 'ascending' ? <ArrowUpwardIcon fontSize="small" /> : <ArrowDownwardIcon fontSize="small" />;
    };

    if (loading) return <div className="flex justify-center items-center h-screen">Loading...</div>;

    return (
        <div className="container mx-auto p-4">
            <h1 className="text-2xl font-bold mb-4">Current Stock</h1>
            <div className="mb-4">
                <TextField
                    label="Filter Stock"
                    variant="outlined"
                    fullWidth
                    value={filterText}
                    onChange={(e) => setFilterText(e.target.value)}
                    className="mb-4"
                />
            </div>
            <TableContainer component={Paper}>
                <Table>
                    <TableHead>
                        <TableRow>
                            <TableCell onClick={() => handleSort('sku')} className="cursor-pointer">
                                SKU <SortIcon column="sku" />
                            </TableCell>
                            <TableCell onClick={() => handleSort('name')} className="cursor-pointer">
                                Name <SortIcon column="name" />
                            </TableCell>
                            <TableCell onClick={() => handleSort('category')} className="cursor-pointer">
                                Category <SortIcon column="category" />
                            </TableCell>
                            <TableCell onClick={() => handleSort('location')} className="cursor-pointer">
                                Location <SortIcon column="location" />
                            </TableCell>
                            <TableCell onClick={() => handleSort('quantity')} className="cursor-pointer">
                                Quantity <SortIcon column="quantity" />
                            </TableCell>
                            <TableCell>Actions</TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {filteredData.map((item) => (
                            <TableRow key={item.id}>
                                <TableCell>{item.sku}</TableCell>
                                <TableCell>{item.name}</TableCell>
                                <TableCell>{item.category}</TableCell>
                                <TableCell>{item.location}</TableCell>
                                <TableCell>{item.quantity}</TableCell>
                                <TableCell>
                                    <IconButton onClick={() => handleEditClick(item)} size="small">
                                        <EditIcon />
                                    </IconButton>
                                </TableCell>
                            </TableRow>
                        ))}
                    </TableBody>
                </Table>
            </TableContainer>

            <Dialog open={editDialogOpen} onClose={() => setEditDialogOpen(false)}>
                <DialogTitle>Edit Stock Quantity</DialogTitle>
                <DialogContent>
                    <TextField
                        autoFocus
                        margin="dense"
                        label="New Quantity"
                        type="number"
                        fullWidth
                        value={newQuantity}
                        onChange={(e) => setNewQuantity(e.target.value)}
                    />
                </DialogContent>
                <DialogActions>
                    <Button onClick={() => setEditDialogOpen(false)}>Cancel</Button>
                    <Button onClick={handleEditSave} variant="contained" color="primary">Save</Button>
                </DialogActions>
            </Dialog>

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

export default CurrentStock;