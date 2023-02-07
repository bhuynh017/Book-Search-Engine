const { AuthenticationError } = require('apollo-server-express');
const { User } = require('../models');
const { signToken } = require('../utils/auth');

// creating resolver const for Query type in GraphQL.
const resolvers = {
    Query: {
        // fetching users information
      me: async (parent, args, context) => {
        if (context.user) {
          const userData = await User.findOne({ _id: context.user._id }).select('-__v -password');
  
          return userData;
        }
  
        // if user is not present then the user is not logged in.
        throw new AuthenticationError('You are not logged in!');
      },
    },

    // creating mutation
    Mutation: {
        // creating a new user in the db. 
        addUser: async (parent, args) => {
          const user = await User.create(args);
          // generating JSON web token using the signToken
          const token = signToken(user);
    
          return { token, user };
        },
        // logging an existing user by finding the email and checking if password is correct.
        login: async (parent, { email, password }) => {
          const user = await User.findOne({ email });
    
          if (!user) {
            // throws error if it is incorrect
            throw new AuthenticationError('Invalid credentials!');
          }
    
          const correctPw = await user.isCorrectPassword(password);
    
          if (!correctPw) {
            throw new AuthenticationError('Invalid credentials!');
          }
    
          const token = signToken(user);
          return { token, user };
        },
        // saving the book for hte user
        saveBook: async (parent, { bookData }, context) => {
            // checking to see if the user is logged in
          if (context.user) {
            const updatedUser = await User.findByIdAndUpdate(
              { _id: context.user._id },
              { $push: { savedBooks: bookData } },
              { new: true }
            );
    
            return updatedUser;
          }
    
          throw new AuthenticationError('Logging in is required!');
        },