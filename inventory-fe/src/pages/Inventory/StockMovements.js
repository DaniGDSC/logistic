import React, { useState, useEffect, useCallback } from 'react';
import { 
  Paper, Table, TableBody, TableCell, TableContainer, TableHead, TableRow,
  TextField, Typography, Grid
} from '@mui/material';
import { DateRangePicker } from '@mui/lab';
import { ResponsiveContainer, LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend } from 'recharts';
import { format } from 'date-fns';

const StockMovements = () => {
    const [movements, setMovements] = useState([]);
    const [dateRange, setDateRange] = useState([null, null]);
    const [filter, setFilter] = useState('');
    const [sortBy, setSortBy] = useState('date');
    const [sortDirection, setSortDirection] = useState('desc');
  
    const fetchStockMovements = useCallback(async () => {
      // This is a placeholder for the actual API call
      const response = await fetch('/api/stock-movements', {
        method: 'POST',
        body: JSON.stringify({ dateRange, filter, sortBy, sortDirection }),
      });
      const data = await response.json();
      setMovements(data);
    }, [dateRange, filter, sortBy, sortDirection]);
  
    useEffect(() => {
      fetchStockMovements();
    }, [fetchStockMovements]);
  
    const handleSort = (column) => {
      setSortBy(column);
      setSortDirection(sortDirection === 'asc' ? 'desc' : 'asc');
    };
  
    const getChartData = () => {
      // Process movements data for the chart
      // This is a simplified example
      return movements.reduce((acc, movement) => {
        const date = format(new Date(movement.date), 'yyyy-MM-dd');
        const existingEntry = acc.find(entry => entry.date === date);
        if (existingEntry) {
          existingEntry.quantity += movement.type === 'incoming' ? movement.quantity : -movement.quantity;
        } else {
          acc.push({ date, quantity: movement.type === 'incoming' ? movement.quantity : -movement.quantity });
        }
        return acc;
      }, []);
    };

  return (
    <div className="p-6">
      <Typography variant="h4" className="mb-4">Stock Movements</Typography>
      
      <Grid container spacing={3} className="mb-6">
        <Grid item xs={12} md={6}>
          <DateRangePicker
            startText="Start Date"
            endText="End Date"
            value={dateRange}
            onChange={(newValue) => setDateRange(newValue)}
            renderInput={(startProps, endProps) => (
              <>
                <TextField {...startProps} />
                <TextField {...endProps} />
              </>
            )}
          />
        </Grid>
        <Grid item xs={12} md={6}>
          <TextField
            label="Filter"
            variant="outlined"
            fullWidth
            value={filter}
            onChange={(e) => setFilter(e.target.value)}
          />
        </Grid>
      </Grid>

      <Paper className="mb-6">
        <TableContainer>
          <Table>
            <TableHead>
              <TableRow>
                <TableCell onClick={() => handleSort('date')}>Date</TableCell>
                <TableCell onClick={() => handleSort('product')}>Product</TableCell>
                <TableCell onClick={() => handleSort('type')}>Type</TableCell>
                <TableCell onClick={() => handleSort('quantity')}>Quantity</TableCell>
                <TableCell>Transaction ID</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {movements.map((movement) => (
                <TableRow key={movement.id}>
                  <TableCell>{format(new Date(movement.date), 'yyyy-MM-dd HH:mm')}</TableCell>
                  <TableCell>{movement.product}</TableCell>
                  <TableCell>{movement.type}</TableCell>
                  <TableCell>{movement.quantity}</TableCell>
                  <TableCell>{movement.transactionId}</TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      </Paper>

      <Typography variant="h5" className="mb-4">Stock Movement Trends</Typography>
      <Paper className="p-4">
        <ResponsiveContainer width="100%" height={300}>
          <LineChart data={getChartData()}>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="date" />
            <YAxis />
            <Tooltip />
            <Legend />
            <Line type="monotone" dataKey="quantity" stroke="#8884d8" />
          </LineChart>
        </ResponsiveContainer>
      </Paper>
    </div>
  );
};

export default StockMovements;