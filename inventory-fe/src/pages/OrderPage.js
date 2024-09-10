import React from 'react';
import { TextField, Button } from '@mui/material'; // Assuming you are using Material-UI for TextField and Button components
import DatePicker from 'react-tailwindcss-datepicker'; // Ensure this is correctly imported
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
        <h1 className="text-2xl font-bold mb-2">Order Management</h1>
        
        <div className="mb-4">
          <h2 className="text-lg font-medium mb-4">Add Purchase Order</h2>
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

        <div className="mb-4" width='1440px'>
          <h2 className="text-lg font-medium mb-2">Select Order Date</h2>
          <DatePicker 
            value={this.state.orderDate} 
            onChange={this.handleDateChange} 
            config={{
              todayButton: true, // Add a button to navigate to the current date
              clearButton: true, // Add a button to clear the selected date
              locale: 'en', // Set the locale (optional)
              minDate: new Date('2020-01-01'), // Set a minimum selectable date
              maxDate: new Date('2030-12-31'), // Set a maximum selectable date
            }}
          />
        </div>

        <Button onClick={() => this.processOrders()} variant="contained" color="primary">Process Orders</Button>
      </div>
    );
  }
}

export default OrderPage;
