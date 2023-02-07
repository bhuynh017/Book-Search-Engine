// importing react, auth, apollo, login_user and react bootstrap
import React, { useState, useEffect } from 'react';
import { Form, Button, Alert } from 'react-bootstrap';

import { useMutation } from '@apollo/client';
import { LOGIN_USER } from '../utils/mutations';

import Auth from '../utils/auth';

// defining reaact component. implementing a form for the user to login.
const LoginForm = () => {
    const [userFormData, setUserFormData] = useState({ email: '', password: '' });
    // using hook to manage the form data and validate where or not to show an error alert.
    const [validated] = useState(false);
    const [showAlert, setShowAlert] = useState(false);
  
    const [login, { error }] = useMutation(LOGIN_USER);
  
    useEffect(() => {
      if (error) {
        setShowAlert(true);
      } else {
        setShowAlert(false);
      }
    }, [error]);
  
    // updating ofrm data when user inputs into field.
    const handleInputChange = (event) => {
      const { name, value } = event.target;
      setUserFormData({ ...userFormData, [name]: value });
    };
  
    // defining a handleFormSubmit function when the form is submitted.
    const handleFormSubmit = async (event) => {
      event.preventDefault();
  
      const form = event.currentTarget;
      if (form.checkValidity() === false) {
        event.preventDefault();
        event.stopPropagation();
      }
  
      try {
        const { data } = await login({
          variables: { ...userFormData },
        });
  
        console.log(data);
        Auth.login(data.login.token);
      } catch (e) {
        console.error(e);
      }
      // clearing the form values.
      setUserFormData({
        email: '',
        password: '',
      });
    };