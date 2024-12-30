const mongoose = require('mongoose');
const logger = require('./support_functions/logger');

const connectToDatabase = async () => {
    try {
        logger("Attempting to connect to MongoDB", "INFO");

        await mongoose.connect(process.env.DATABASE_URL);
        console.log(`MongoDB running on: ${process.env.DATABASE_URL}`);
        logger(`MongoDB connected successfully to: ${process.env.DATABASE_URL}`, "INFO");

    } catch (error) {
        console.log(`MongoDB failed to connect`);
        logger(`MongoDB connection failed with error: ${error.message}`, "ERROR");
    }
};

module.exports = connectToDatabase;
