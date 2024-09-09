import React from 'react';
import { 
  AppBar, 
  Toolbar, 
  Typography, 
  Container, 
  Grid, 
  Paper, 
  Card, 
  CardContent, 
  CardActions,
  Button,
  List,
  ListItem,
  ListItemIcon,
  ListItemText
} from '@mui/material';
import { 
  TrendingUp, 
  ShoppingCart, 
  Inventory, 
  AttachMoney,
  Add,
  ViewList,
  Settings,
  Description
} from '@mui/icons-material';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';

// Mock data for the chart
const salesData = [
  { name: 'Jan', sales: 4000 },
  { name: 'Feb', sales: 3000 },
  { name: 'Mar', sales: 5000 },
  { name: 'Apr', sales: 4500 },
  { name: 'May', sales: 6000 },
  { name: 'Jun', sales: 5500 },
];

const MetricCard = ({ title, value, icon }) => (
  <Card className="h-full">
    <CardContent className="flex items-center justify-between">
      <div>
        <Typography color="textSecondary" gutterBottom>
          {title}
        </Typography>
        <Typography variant="h5" component="h2">
          {value}
        </Typography>
      </div>
      {icon}
    </CardContent>
  </Card>
);

const QuickActionCard = ({ title, description, icon, action }) => (
  <Card className="h-full">
    <CardContent>
      <Typography variant="h6" component="h2" className="flex items-center gap-2 mb-2">
        {icon}
        {title}
      </Typography>
      <Typography color="textSecondary" className="mb-4">
        {description}
      </Typography>
    </CardContent>
    <CardActions>
      <Button size="small" color="primary">
        {action}
      </Button>
    </CardActions>
  </Card>
);

const RecentActivityList = () => (
  <List>
    {['Added new product: Wireless Headphones', 'Updated inventory: Office Chairs', 'New order received: #1234'].map((text, index) => (
      <ListItem key={index}>
        <ListItemIcon>
          {index % 2 === 0 ? <Add /> : <ViewList />}
        </ListItemIcon>
        <ListItemText primary={text} />
      </ListItem>
    ))}
  </List>
);

const Dashboard = () => {
  return (
    <div className="min-h-screen bg-gray-100">
      <AppBar position="static" className="bg-indigo-600">
        <Toolbar>
          <Typography variant="h6">
            Inventory Dashboard
          </Typography>
        </Toolbar>
      </AppBar>
      
      <Container maxWidth="lg" className="mt-8">
        <Grid container spacing={3}>
          {/* Key Metrics */}
          <Grid item xs={12} md={3}>
            <MetricCard title="Total Sales" value="$24,000" icon={<TrendingUp className="text-green-500" />} />
          </Grid>
          <Grid item xs={12} md={3}>
            <MetricCard title="Orders" value="120" icon={<ShoppingCart className="text-blue-500" />} />
          </Grid>
          <Grid item xs={12} md={3}>
            <MetricCard title="Inventory" value="1,500" icon={<Inventory className="text-amber-500" />} />
          </Grid>
          <Grid item xs={12} md={3}>
            <MetricCard title="Revenue" value="$35,000" icon={<AttachMoney className="text-purple-500" />} />
          </Grid>

          {/* Sales Chart */}
          <Grid item xs={12}>
            <Paper className="p-4">
              <Typography variant="h6" className="mb-4">Sales Overview</Typography>
              <ResponsiveContainer width="100%" height={300}>
                <BarChart data={salesData}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="name" />
                  <YAxis />
                  <Tooltip />
                  <Bar dataKey="sales" fill="#8884d8" />
                </BarChart>
              </ResponsiveContainer>
            </Paper>
          </Grid>

          {/* Quick Actions */}
          <Grid item xs={12} md={4}>
            <QuickActionCard 
              title="Add Product" 
              description="Create a new product entry"
              icon={<Add />}
              action="Create"
            />
          </Grid>
          <Grid item xs={12} md={4}>
            <QuickActionCard 
              title="Manage Inventory" 
              description="Update stock levels and locations"
              icon={<Inventory />}
              action="Manage"
            />
          </Grid>
          <Grid item xs={12} md={4}>
            <QuickActionCard 
              title="Generate Report" 
              description="Create custom inventory reports"
              icon={<Description />}
              action="Generate"
            />
          </Grid>

          {/* Recent Activity */}
          <Grid item xs={12} md={6}>
            <Paper className="p-4">
              <Typography variant="h6" className="mb-4">Recent Activity</Typography>
              <RecentActivityList />
            </Paper>
          </Grid>

          {/* Quick Settings */}
          <Grid item xs={12} md={6}>
            <Paper className="p-4">
              <Typography variant="h6" className="mb-4">Quick Settings</Typography>
              <List>
                <ListItem button>
                  <ListItemIcon><Settings /></ListItemIcon>
                  <ListItemText primary="Notification Preferences" />
                </ListItem>
                <ListItem button>
                  <ListItemIcon><Settings /></ListItemIcon>
                  <ListItemText primary="User Permissions" />
                </ListItem>
                <ListItem button>
                  <ListItemIcon><Settings /></ListItemIcon>
                  <ListItemText primary="System Configuration" />
                </ListItem>
              </List>
            </Paper>
          </Grid>
        </Grid>
      </Container>
    </div>
  );
};

export default Dashboard;