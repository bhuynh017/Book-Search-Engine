import React, { useState, useEffect } from 'react';
import {
  Jumbotron,
  Container,
  Col,
  Form,
  Button,
  Card,
  CardColumns,
} from 'react-bootstrap';

import { useMutation } from '@apollo/client';
import { SAVE_BOOK } from '../utils/mutations';
import { saveBookIds, getSavedBookIds } from '../utils/localStorage';

import Auth from '../utils/auth';

const SearchBooks = () => {
    const [searchedBooks, setSearchedBooks] = useState([]);
    const [searchInput, setSearchInput] = useState('');
  
    const [savedBookIds, setSavedBookIds] = useState(getSavedBookIds());
  
    const [saveBook, { error }] = useMutation(SAVE_BOOK);
  
    useEffect(() => {
      return () => saveBookIds(savedBookIds);
    });

    onst handleFormSubmit = async (event) => {
        event.preventDefault();
    
        if (!searchInput) {
          return false;
        }
    
        try {
          const response = await fetch(
            `https://www.googleapis.com/books/v1/volumes?q=${searchInput}`
          );
    
          if (!response.ok) {
            throw new Error('There was an error!');
          }
    
          const { items } = await response.json();
    
          const bookData = items.map((book) => ({
            bookId: book.id,
            authors: book.volumeInfo.authors || ['No author is being displayed'],
            title: book.volumeInfo.title,
            description: book.volumeInfo.description,
            image: book.volumeInfo.imageLinks?.thumbnail || '',
          }));
    
          setSearchedBooks(bookData);
          setSearchInput('');
        } catch (err) {
          console.error(err);
        }
      };