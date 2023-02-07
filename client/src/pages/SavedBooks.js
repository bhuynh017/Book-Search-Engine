import React from "react";
import {
  Jumbotron,
  Container,
  CardColumns,
  Card,
  Button,
} from "react-bootstrap";

import { useQuery, useMutation } from "@apollo/client";
import { QUERY_ME } from "../utils/queries";
import { REMOVE_BOOK } from "../utils/mutations";
import { removeBookId } from "../utils/localStorage";

import Auth from "../utils/auth";

// implementing SaveBooks 
const SavedBooks = () => {
    // Retrieving data about the currently logged in user and useQuery hook is used to fetch data
    const { loading, data } = useQuery(QUERY_ME);
    const [removeBook, { error }] = useMutation(REMOVE_BOOK);
  
    const userData = data?.me || {};
    // executing a mutation to remove saved books from the users account
    const handleDeleteBook = async (bookId) => {
        // getting a token
      const token = Auth.loggedIn() ? Auth.getToken() : null;
  
      if (!token) {
        return false;
      }
  
      try {
        const { data } = await removeBook({
          variables: { bookId },
        });
  
        removeBookId(bookId);
      } catch (err) {
        console.error(err);
      }
    };
  
    if (loading) {
      return <h2>LOADING...</h2>;
    }