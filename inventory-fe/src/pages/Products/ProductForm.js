import React, { useState } from 'react';
import { Formik, Field, Form, ErrorMessage } from 'formik';
import * as Yup from 'yup';
import { Button, Typography } from '@material-ui/core';
import { DropzoneArea } from 'react-mui-dropzone';
import axios from 'axios';

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
  category: Yup.string().required('Required'),
  image: Yup.mixed().required('An image is required')
});

const ProductForm = () => {
  const [image, setImage] = useState(null);

  const handleSubmit = async (values, { setSubmitting }) => {
    try {
      const formData = new FormData();
      formData.append('name', values.name);
      formData.append('description', values.description);
      formData.append('price', values.price);
      formData.append('category', values.category);
      formData.append('image', image);

      const response = await axios.post('/api/products', formData, {
        headers: { 'Content-Type': 'multipart/form-data' }
      });
      console.log('Product created:', response.data);
      // Handle success (e.g., show a success message, reset form, etc.)
    } catch (error) {
      console.error('Error creating product:', error);
      // Handle error (e.g., show error message to user)
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <Formik
      initialValues={{ name: '', description: '', price: '', category: '', image: null }}
      validationSchema={ProductSchema}
      onSubmit={handleSubmit}
    >
      {({ errors, touched, setFieldValue }) => (
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
          
          <DropzoneArea
            acceptedFiles={['image/*']}
            dropzoneText="Drag and drop an image here or click"
            onChange={(files) => {
              if (files[0]) {
                setImage(files[0]);
                setFieldValue('image', files[0]);
              }
            }}
            showFileNames
            maxFileSize={5000000}
            filesLimit={1}
          />
          <ErrorMessage name="image" component={Typography} color="error" />
          
          <Button type="submit">Submit</Button>
        </Form>
      )}
    </Formik>
  );
};

export default ProductForm;