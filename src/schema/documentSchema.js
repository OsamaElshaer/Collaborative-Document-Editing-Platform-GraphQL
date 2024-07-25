const { gql } = require("apollo-server");

const documentSchema = gql`
    type Document {
        id: ID!
        title: String!
        content: String!
        author: User!
        sharedWith: [User!]
    }

    type Query {
        documents: [Document!]
        document(id: ID!): Document
    }

    type Mutation {
        createDocument(title: String!, content: String!): Document
        updateDocument(id: ID!, content: String!): Document
        deleteDocument(id: ID!): Boolean
        shareDocument(documentId: ID!, userId: ID!): Document
    }
    
    type Subscription {
        documentUpdated: Document
        documentDeleted: ID
    }
`;

module.exports = documentSchema;
