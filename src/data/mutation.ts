import { gql } from "@/__generated__/gql";

gql(/* GraphQL */ `
  mutation createUser($address: String!) {
    createUser(createUserInput: { address: $address }) {
      id
      name
      address
      signature
      avatar
      createdAt
      updatedAt
    }
  }
`);
