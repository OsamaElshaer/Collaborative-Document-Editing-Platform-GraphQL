const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const User = require("../models/userModel");
const { JWT_SECRET } = process.env;

const userResolvers = {
    Query: {
        me: async (_, __, { token }) => {
            if (!token) throw new Error("Not authenticated");
            const decoded = jwt.verify(token, JWT_SECRET);
            return await User.findById(decoded.id);
        },
    },
    Mutation: {
        signUp: async (_, { username, email, password }) => {
            const hashedPassword = await bcrypt.hash(password, 10);
            const user = new User({
                username,
                email,
                password: hashedPassword,
            });
            await user.save();
            return user;
        },
        login: async (_, { email, password }) => {
            const user = await User.findOne({ email });
            if (!user || !(await bcrypt.compare(password, user.password))) {
                throw new Error("Invalid credentials");
            }
            const token = jwt.sign({ id: user._id }, JWT_SECRET, {
                expiresIn: "1h",
            });
            return token;
        },
    },
};

module.exports = userResolvers;
