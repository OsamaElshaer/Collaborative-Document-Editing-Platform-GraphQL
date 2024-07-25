const { PubSub } = require("graphql-subscriptions");
const pubsub = new PubSub();

const DOCUMENT_UPDATED = "DOCUMENT_UPDATED";
const DOCUMENT_DELETED = "DOCUMENT_DELETED";

const documentSubscriptions = {
    Subscription: {
        documentUpdated: {
            subscribe: () => pubsub.asyncIterator([DOCUMENT_UPDATED]),
        },
        documentDeleted: {
            subscribe: () => pubsub.asyncIterator([DOCUMENT_DELETED]),
        },
    },
};

module.exports = {
    documentSubscriptions,
    pubsub,
    DOCUMENT_UPDATED,
    DOCUMENT_DELETED,
};
