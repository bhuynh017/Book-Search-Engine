const { Schema, model } = require('mongoose');
const bcrypt = require('bcrypt');

// importing schema from book.js
const bookSchema = require('./Book');

// defining mongoose schema for userSchema.
const userSchema = new Schema(
    {
      username: {
        type: String,
        required: true,
        unique: true,
      },
      email: {
        type: String,
        required: true,
        unique: true,
        match: [/.+@.+\..+/, 'Must use a valid email address'],
      },
      // adding bcrypt
      password: {
        type: String,
        required: true,
      },
   
      savedBooks: [bookSchema],
    },
)