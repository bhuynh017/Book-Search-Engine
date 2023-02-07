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
}  