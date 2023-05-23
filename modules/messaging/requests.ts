import { gql } from "@apollo/client";

// messages
export const GET_ALL_CONVO = gql`
  query GetAllConvo {
    getAllConvo {
      conversationID
    }
  }
`;

export const GET_ALL_USERS = gql`
  query GetAllUsers {
    getAllUsers {
      userID
    }
  }
`;

//add resolver, endpoint
export const GET_ALL_CONVO_BY_USERID = gql`
  query GetAllConvo {
    getAllConvo {
      conversationID
      members
    }
  }
`;

export const GET_CONVO_BY_ID = gql`
  query GetConvoById($conversationID: ID!) {
    getConvoById(conversationID: $conversationID) {
      conversationID
      messages {
        sender
        text
      }
    }
  }
`;
export const GET_CONVO_BY_MEMBERS = gql`
  query GetConvoByMembers($conversationMembers: [String!]!) {
    getConvoByMembers(conversationMembers: $conversationMembers) {
      conversationID
    }
  }
`;

export const ADD_CONVO = gql`
  mutation AddConvo($conversationMembers: [String!]!) {
    addConvo(conversationMembers: $conversationMembers) {
      conversationID
    }
  }
`;

export const FIND_OR_CREATE_CONVO_BY_MEMBERS = gql`
  mutation FindOrCreateConvoByMembers($conversationMembers: [String!]!) {
    findOrCreateConvoByMembers(conversationMembers: $conversationMembers) {
      conversationID
    }
  }
`;
