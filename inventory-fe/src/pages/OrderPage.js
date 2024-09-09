import React from 'react';
import { TextField, Button } from '@mui/material';
import DatePicker from 'react-datepicker';

class OrderPage extends React.Component {
  constructor() {
    super();
    this.state = {
      purchaseOrders: [],
      salesOrders: [],
      orderDate: null,
    };
  }

  addPurchaseOrder(order) {
    this.setState((prevState) => ({
      purchaseOrders: [...prevState.purchaseOrders, order],
    }));
  }

  addSalesOrder(order) {
    this.setState((prevState) => ({
      salesOrders: [...prevState.salesOrders, order],
    }));
  }

  handleDateChange = (date) => {
    this.setState({ orderDate: date });
  };

  processOrders() {
    console.log('Processing orders:', this.state);
    // Here you would typically call an API or perform other processing logic specific to your application
  }

  render() {
    return (
      <div className="p-4">
        <h1 className="text-2xl font-bold mb-4">Order Management</h1>
        
        <div className="mb-4">
          <h2 className="text-lg font-medium mb-2">Add Purchase Order</h2>
          <TextField label="Supplier Name" variant="outlined" fullWidth />
          <TextField label="Order Details" multiline rows={4} fullWidth />
          <Button onClick={() => this.addPurchaseOrder({})}>Add Purchase Order</Button>
        </div>

        <div className="mb-4">
          <h2 className="text-lg font-medium mb-2">Add Sales Order</h2>
          <TextField label="Customer Name" variant="outlined" fullWidth />
          <TextField label="Order Details" multiline rows={4} fullWidth />
          <Button onClick={() => this.addSalesOrder({})}>Add Sales Order</Button>
        </div>

        <div className="mb-4">
          <h2 className="text-lg font-medium mb-2">Select Order Date</h2>
          <DatePicker value={this.state.orderDate} onChange={this.handleDateChange} />
        </div>

        <Button onClick={() => this.processOrders()} variant="contained" color="primary">Process Orders</Button>
      </div>
    );
  }
}

export default OrderPage;
