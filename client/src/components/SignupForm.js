import React, { useState, useEffect } from 'react';
import { Form, Button, Alert } from 'react-bootstrap';

import { useMutation } from '@apollo/client';
import { ADD_USER } from '../utils/mutations';

import Auth from '../utils/auth';

const SignupForm = () => {
    
    const [userFormData, setUserFormData] = useState({
      username: '',
      email: '',
      password: '',
    });
    
    const [validated] = useState(false);
    
    const [showAlert, setShowAlert] = useState(false);
  
    const [addUser, { error }] = useMutation(ADD_USER);
  
    useEffect(() => {
      if (error) {
        setShowAlert(true);
      } else {
        setShowAlert(false);
      }
    }, [error]);
}