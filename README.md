# Collaborative Document Editing Platform

A real-time collaborative document editing platform built with Node.js, GraphQL, Apollo Server, WebSockets, and MongoDB.

## Features

- **User Authentication**: Sign up and log in with JWT-based authentication.
- **Document Management**: Create, update, delete, and share documents.
- **Real-time Collaboration**: Real-time updates using GraphQL subscriptions.
- **Secure**: Authentication and authorization for document access.

## Getting Started

### Prerequisites

- Node.js (>= 14.x)
- MongoDB (local or cloud instance)

### Installation

    
    npm install npm@latest -g


**Clone the repository**:

```sh
   git clone https://github.com/yourusername/collaborative-document-editing-platform.git
```


Please set the following environment variables in a `.env` file for configuring your ChatBuddy application:

-   `MONGO_URI`: The mongo db url.
-   `JWT_SECRET`: Your_jwt_secret.
  





**Running the Server**
```
node src/server.js  

```
