const Document = require("../models/documentModel");
const User = require("../models/userModel");

const documentResolvers = {
    Query: {
        documents: async () => {
            return await Document.find()
                .populate("author")
                .populate("sharedWith");
        },
        document: async (_, { id }) => {
            return await Document.findById(id)
                .populate("author")
                .populate("sharedWith");
        },
    },
    Mutation: {
        createDocument: async (_, { title, content }, { token }) => {
            // Verify token and create document
            if (!token) throw new Error("Not authenticated");
            const decoded = jwt.verify(token, process.env.JWT_SECRET);
            const document = new Document({
                title,
                content,
                author: decoded.id,
            });
            await document.save();
            return document;
        },
        updateDocument: async (_, { id, content }, { token }) => {
            // Verify token and update document
            if (!token) throw new Error("Not authenticated");
            const decoded = jwt.verify(token, process.env.JWT_SECRET);
            const document = await Document.findById(id);
            if (document.author.toString() !== decoded.id.toString()) {
                throw new Error("Not authorized");
            }
            document.content = content;
            await document.save();
            return document;
        },
        deleteDocument: async (_, { id }, { token }) => {
            // Verify token and delete document
            if (!token) throw new Error("Not authenticated");
            const decoded = jwt.verify(token, process.env.JWT_SECRET);
            const document = await Document.findById(id);
            if (document.author.toString() !== decoded.id.toString()) {
                throw new Error("Not authorized");
            }
            await Document.findByIdAndDelete(id);
            return true;
        },
        shareDocument: async (_, { documentId, userId }, { token }) => {
            // Verify token and share document
            if (!token) throw new Error("Not authenticated");
            const decoded = jwt.verify(token, process.env.JWT_SECRET);
            const document = await Document.findById(documentId);
            if (document.author.toString() !== decoded.id.toString()) {
                throw new Error("Not authorized");
            }
            const user = await User.findById(userId);
            if (!user) throw new Error("User not found");
            document.sharedWith.push(userId);
            await document.save();
            return document.populate("author").populate("sharedWith");
        },
    },
};

module.exports = documentResolvers;
