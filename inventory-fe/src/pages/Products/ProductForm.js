import React from 'react';
import { Formik, Field, Form, ErrorMessage } from 'formik';
import * as Yup from 'yup';
import { Button, Typography } from '@mui/material';
import Dropzone from 'material-ui-dropzone';
import axios from 'axios'; // Assuming you're using this for backend communication. You might need to adjust it based on your API setup.

const ProductSchema = Yup.object().shape({
  name: Yup.string()
    .min(2, 'Too Short!')
    .max(50, 'Too Long!')
    .required('Required'),
  description: Yup.string()
    .min(10, 'Must be more than 10 characters')
    .required('Required'),
  price: Yup.number()
    .positive('A positive number is required')
    .required('Required'),
  category: Yup.string().required('Required')
});

const ProductForm = () => {
  const handleSubmit = (values) => {
    axios.post('/api/products', values) // Adjust the endpoint as needed based on your backend setup.
      .then(response => console.log(response.data))
      .catch(error => console.error('Error:', error));
  };

  return (
    <Formik initialValues={{ name: '', description: '', price: '', category: '' }} validationSchema={ProductSchema} onSubmit={handleSubmit}>
      {({ errors, touched }) => (
        <Form>
          <Field type="text" name="name" placeholder="Name" />
          <ErrorMessage name="name" component={Typography} color="error" />
          
          <Field as="textarea" name="description" placeholder="Description" rows="4" />
          <ErrorMessage name="description" component={Typography} color="error" />
          
          <Field type="number" name="price" placeholder="Price" />
          <ErrorMessage name="price" component={Typography} color="error" />
          
          <Field as="select" name="category">
            <option value="">Select a category</option>
            <option value="electronics">Electronics</option>
            <option value="clothing">Clothing</option>
            <option value="home">Home</option>
          </Field>
          <ErrorMessage name="category" component={Typography} color="error" />
          
          <Dropzone 
            acceptedFiles="image/*" 
            multiple={false} 
            onChange={(files) => { 
              // Handle file change for upload logic. You might need to adjust this part based on how you handle files in your app.
              console.log(files);
            }}
          />
          
          <Button type="submit">Submit</Button>
        </Form>
      )}
    </Formik>
  );
};

export default ProductForm;
