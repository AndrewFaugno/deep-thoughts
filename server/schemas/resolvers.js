const { User, Thought } = require('../models');

const resolvers = {
    Query: {
        // get all users
        users: async () => {
            return User.find()
                .select('-__v -password')
                .populate('friends')
                .populate('thoughts')
        },

        // get user by username
        user: async (parent, { username }) => {
            return User.findOne({ username }) 
                .select('-__v -password')
                .populate('friends')
                .populate('thoughts')
        },

        // get all thoughts || get all thoughts by one username
        thoughts: async (parent, { username }) => {
            const params = username ? { username } : {};
            return Thought.find(params).sort({ createdAt: -1 });
        },

        // get single thought by id
        thought: async (parent, { _id }) => {
            return Thought.findOne({ _id });
        },
    }
};

module.exports = resolvers;