import { gql } from "@apollo/client";

export const GET_FILES_UPLOADED_BY_USERID = gql`
  query GetFilesUploadedByUserID($userID: ID!) {
    getFilesUploadedByUserID(userID: $userID) {
      uploadID
      userID
      filePaths
    }
  }
`;

export const GET_HEADERS_BY_FILENAME = gql`
  query getHeadersbyFileName($filename: String!) {
    getHeadersbyFileName(filename: $filename)
  }
`;

export const START_DEDUPE_JOB = gql`
  mutation startDedupeJob(
    $userID: ID!
    $filename: String!
    $headerselected: [String!]!
  ) {
    startDedupeJob(
      userID: $userID
      filename: $filename
      headerselected: $headerselected
    ) {
      jobID
    }
  }
`;



// messages
export const GET_ALL_CONVO = gql`
  query GetAllConvo {
    getAllConvo {
      conversationID
    }
  }
`;
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
