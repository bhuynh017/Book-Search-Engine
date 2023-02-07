// fetching information about the current user.
import { gql } from "@apollo/client";

// query is requesting the following information below.
// for savedBooks, each saved book has the following properties below it.
export const QUERY_ME = gql`
  {
    me {
      _id
      username
      email
      savedBooks {
        bookId
        authors
        image
        description
        title
        link
      }
    }
  }
`;
